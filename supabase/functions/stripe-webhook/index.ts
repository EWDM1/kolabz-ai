
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Get environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') as string
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string

// Create a Supabase client with the admin key
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get the stripe signature from headers
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return new Response(JSON.stringify({ error: 'No signature provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get the raw request body
    const body = await req.text()

    // Dynamically import Stripe
    const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
    
    if (!stripeSecretKey) {
      console.error('Missing STRIPE_SECRET_KEY')
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (!stripeWebhookSecret) {
      console.error('Missing STRIPE_WEBHOOK_SECRET')
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    })

    // Verify the webhook signature
    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret)
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed: ${err.message}`)
      return new Response(JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Process the event based on type
    console.log(`🔔 Webhook received: ${event.type}`)

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionEvent(event.data.object, event.type)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error(`Webhook error: ${error.message}`)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

// Handler for successful payment intents
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log(`PaymentIntent was successful: ${paymentIntent.id}`)
  
  // Here you would typically:
  // 1. Log the successful payment
  // 2. Update your database with order status
  // 3. Possibly send email confirmation
  
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .eq('key', 'last_payment_intent')
      .single()
    
    // Store or update the last payment intent (just as an example)
    const upsertResult = await supabase
      .from('app_settings')
      .upsert({
        key: 'last_payment_intent',
        value: paymentIntent.id,
        description: 'Latest successful payment intent',
        updated_at: new Date().toISOString()
      })
    
    if (upsertResult.error) {
      console.error('Error storing payment record:', upsertResult.error)
    }
  } catch (error) {
    console.error('Error handling payment intent:', error)
  }
}

// Handler for completed checkout sessions
async function handleCheckoutSessionCompleted(session) {
  console.log(`Checkout session completed: ${session.id}`)
  
  if (session.customer && session.subscription) {
    console.log(`Customer ${session.customer} subscribed with subscription ${session.subscription}`)
    
    try {
      // Check if this is a new customer or an existing one
      const { data: existingSubscription, error: findError } = await supabase
        .from('subscriptions')
        .select('id, user_id')
        .eq('stripe_customer_id', session.customer)
        .maybeSingle()
      
      // Get the plan information from metadata if available
      let planId = session.metadata?.plan_id
      let isAnnual = session.metadata?.is_annual === 'true'
      
      // If plan info is not in metadata, try to get it from the subscription directly
      if (!planId) {
        const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
        const stripe = new Stripe(stripeSecretKey, {
          apiVersion: '2022-11-15',
        })
        
        const subscription = await stripe.subscriptions.retrieve(session.subscription)
        const priceId = subscription.items.data[0]?.price.id
        
        if (priceId) {
          // Look up the plan by price ID
          const { data: planData } = await supabase
            .from('subscription_plans')
            .select('id')
            .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_annual.eq.${priceId}`)
            .maybeSingle()
          
          if (planData) {
            planId = planData.id
            // Check if this is an annual price
            isAnnual = subscription.items.data[0]?.price.recurring.interval === 'year'
          }
        }
      }
      
      if (existingSubscription) {
        // Update existing subscription
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            stripe_subscription_id: session.subscription,
            plan_id: planId || null,
            is_annual: isAnnual,
            current_period_start: new Date().toISOString(),
            current_period_end: null, // Will be updated by the subscription event handler
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSubscription.id)
        
        if (updateError) {
          console.error('Error updating subscription:', updateError)
        }
      } else {
        // Extract user ID from session metadata
        const userId = session.metadata?.user_id || session.client_reference_id
        
        if (!userId) {
          console.error('No user ID found in session metadata')
          return
        }
        
        // Create new subscription record
        const { error: insertError } = await supabase
          .from('subscriptions')
          .insert({
            user_id: userId,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            status: 'active',
            plan_id: planId || null,
            is_annual: isAnnual,
            current_period_start: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        
        if (insertError) {
          console.error('Error creating subscription:', insertError)
        }
      }
    } catch (error) {
      console.error('Error handling checkout session:', error)
    }
  }
}

// Handler for subscription events
async function handleSubscriptionEvent(subscription, eventType) {
  console.log(`Subscription event ${eventType}: ${subscription.id}`)
  
  try {
    // Find the subscription in our database
    const { data: subscriptionData, error: findError } = await supabase
      .from('subscriptions')
      .select('id, user_id')
      .eq('stripe_subscription_id', subscription.id)
      .maybeSingle()
    
    if (findError) {
      console.error('Error finding subscription:', findError)
      return
    }
    
    if (!subscriptionData) {
      console.log(`No subscription found with ID ${subscription.id}, might be a new subscription`)
      return
    }
    
    // Update status based on event type
    let status
    switch (eventType) {
      case 'customer.subscription.created':
        status = 'active'
        break
      case 'customer.subscription.updated':
        status = subscription.status
        break
      case 'customer.subscription.deleted':
        status = 'canceled'
        break
      default:
        status = subscription.status
    }
    
    // Get the price ID from the first item
    const priceId = subscription.items?.data[0]?.price?.id
    
    // Look up the plan by price ID if it's available
    let planId = null
    let isAnnual = false
    
    if (priceId) {
      const { data: planData } = await supabase
        .from('subscription_plans')
        .select('id')
        .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_annual.eq.${priceId}`)
        .maybeSingle()
      
      if (planData) {
        planId = planData.id
        // Check if this is an annual price
        isAnnual = subscription.items.data[0]?.price.recurring.interval === 'year'
      }
    }
    
    // Update the subscription status
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        status: status,
        plan_id: planId || subscriptionData.plan_id,
        is_annual: isAnnual,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriptionData.id)
    
    if (updateError) {
      console.error('Error updating subscription status:', updateError)
    }
  } catch (error) {
    console.error('Error handling subscription event:', error)
  }
}
