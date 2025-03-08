
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') as string

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header is missing' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { 
        global: { headers: { Authorization: authHeader } },
        auth: { persistSession: false }
      }
    )

    // Get current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    const { planId, isAnnual } = await req.json()
    
    // Validate request data
    if (!planId) {
      return new Response(
        JSON.stringify({ error: 'Plan ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Load Stripe
    const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    })

    // Get customer ID from subscriptions table
    const { data: subscriptionData, error: subscriptionError } = await supabaseClient
      .from('subscriptions')
      .select('customer_id, subscription_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()

    if (subscriptionError) {
      throw subscriptionError
    }

    let customerId = subscriptionData?.customer_id

    // If no customer exists, create one
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id
        }
      })
      customerId = customer.id
    }

    let result
    
    // If there's an existing subscription, update it
    if (subscriptionData?.subscription_id) {
      // Get the price ID based on the plan and interval
      const { data: priceData, error: priceError } = await supabaseClient
        .from('prices')
        .select('id, stripe_price_id')
        .eq('product_id', planId)
        .eq('interval', isAnnual ? 'year' : 'month')
        .single()

      if (priceError || !priceData) {
        throw new Error('Price not found for the selected plan and interval')
      }

      // Update the subscription
      const subscription = await stripe.subscriptions.update(
        subscriptionData.subscription_id,
        {
          items: [{
            price: priceData.stripe_price_id,
          }],
          proration_behavior: 'create_prorations'
        }
      )

      result = { 
        subscription_id: subscription.id,
        customer_id: customerId,
        message: 'Subscription updated successfully' 
      }
    } else {
      // Get the price ID based on the plan and interval
      const { data: priceData, error: priceError } = await supabaseClient
        .from('prices')
        .select('id, stripe_price_id')
        .eq('product_id', planId)
        .eq('interval', isAnnual ? 'year' : 'month')
        .single()

      if (priceError || !priceData) {
        throw new Error('Price not found for the selected plan and interval')
      }

      // Create a new subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          { price: priceData.stripe_price_id },
        ],
        metadata: {
          user_id: user.id
        },
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription'
        },
        expand: ['latest_invoice.payment_intent']
      })

      result = { 
        subscription_id: subscription.id,
        customer_id: customerId,
        client_secret: subscription.latest_invoice?.payment_intent?.client_secret,
        message: 'Subscription created successfully'
      }
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error changing subscription plan:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to change subscription plan' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
