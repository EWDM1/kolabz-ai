
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Get environment variables
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

    // Get subscription data from database
    const { data: subscriptionData, error: subscriptionError } = await supabaseClient
      .from('subscriptions')
      .select('stripe_subscription_id, stripe_customer_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()

    if (subscriptionError) {
      throw subscriptionError
    }

    // Get subscription plan details
    const { data: planData, error: planError } = await supabaseClient
      .from('subscription_plans')
      .select(`
        id, 
        name, 
        ${isAnnual ? 'stripe_price_id_annual' : 'stripe_price_id_monthly'} as price_id,
        ${isAnnual ? 'price_annual' : 'price_monthly'} as price
      `)
      .eq('id', planId)
      .single()

    if (planError || !planData) {
      throw planError || new Error('Plan not found')
    }

    // If no price ID in Stripe is set, throw error
    if (!planData.price_id) {
      throw new Error('This plan is not yet configured in Stripe')
    }

    // If user has no subscription, create one
    if (!subscriptionData?.stripe_subscription_id) {
      // Handle new subscription (redirect to checkout)
      return new Response(
        JSON.stringify({ 
          redirect_to_checkout: true,
          message: 'User has no active subscription. Please use the checkout flow to subscribe.',
          plan_id: planId,
          is_annual: isAnnual
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update existing subscription
    console.log(`Updating subscription ${subscriptionData.stripe_subscription_id} to plan ${planData.price_id}`)
    
    const subscription = await stripe.subscriptions.retrieve(subscriptionData.stripe_subscription_id)
    
    // Get the first subscription item (assuming one item per subscription)
    const subscriptionItemId = subscription.items.data[0].id
    
    // Update the subscription with new price
    const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
      items: [
        {
          id: subscriptionItemId,
          price: planData.price_id,
        },
      ],
      // Prorate by default
      proration_behavior: 'create_prorations',
    })

    // Update subscription information in database
    const { error: updateError } = await supabaseClient
      .from('subscriptions')
      .update({
        plan_id: planId,
        is_annual: isAnnual,
        price: planData.price,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('stripe_subscription_id', subscriptionData.stripe_subscription_id)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully changed to ${planData.name} plan`, 
        subscription: {
          id: updatedSubscription.id,
          current_period_end: new Date(updatedSubscription.current_period_end * 1000).toISOString(),
          plan_id: planId,
          is_annual: isAnnual
        }
      }),
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
