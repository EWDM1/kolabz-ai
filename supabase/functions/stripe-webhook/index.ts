
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
async function handlePaymentIntentSucceeded(paymentIntent: any) {
  console.log(`PaymentIntent was successful: ${paymentIntent.id}`)
  
  // Here you would typically:
  // 1. Log the successful payment
  // 2. Update your database with order status
  // 3. Possibly send email confirmation
  
  const { data, error } = await supabase
    .from('app_settings')
    .select('*')
    .eq('key', 'last_payment_intent')
    .single()
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error checking payment record:', error)
  }
  
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
}

// Handler for completed checkout sessions
async function handleCheckoutSessionCompleted(session: any) {
  console.log(`Checkout session completed: ${session.id}`)
  
  if (session.customer && session.subscription) {
    console.log(`Customer ${session.customer} subscribed with subscription ${session.subscription}`)
    // Here you would typically:
    // 1. Associate the subscription with the user
    // 2. Update user access/permissions
    // 3. Send welcome email
  }
}

// Handler for subscription events
async function handleSubscriptionEvent(subscription: any, eventType: string) {
  console.log(`Subscription event ${eventType}: ${subscription.id}`)
  
  // Here you would typically:
  // 1. Update user subscription status
  // 2. Handle upgrades, downgrades, cancellations
  // 3. Send relevant emails
}
