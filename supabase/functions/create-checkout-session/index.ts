
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Get environment variables
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') as string
const appUrl = Deno.env.get('APP_URL') || 'http://localhost:5173'

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
    const { priceId, planId, isAnnual } = await req.json()
    
    // Validate request data - check for either priceId directly or planId with isAnnual
    if (!priceId && (!planId || isAnnual === undefined)) {
      return new Response(
        JSON.stringify({ error: 'Either Price ID or Plan ID with isAnnual flag is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Load Stripe
    const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    })

    // Get user data
    const { data: userData, error: userDataError } = await supabaseClient
      .from('users')
      .select('email, name')
      .eq('id', user.id)
      .single()
      
    if (userDataError) {
      throw userDataError
    }

    // If planId is provided, look up the price_id
    let finalPriceId = priceId
    let finalPlanId = planId
    
    if (!finalPriceId && finalPlanId) {
      const { data: planData, error: planError } = await supabaseClient
        .from('subscription_plans')
        .select(`
          id, 
          ${isAnnual ? 'stripe_price_id_annual' : 'stripe_price_id_monthly'} as price_id
        `)
        .eq('id', finalPlanId)
        .single()

      if (planError || !planData) {
        throw planError || new Error('Plan not found')
      }

      if (!planData.price_id) {
        throw new Error('This plan is not yet configured in Stripe')
      }

      finalPriceId = planData.price_id
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: finalPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/subscribe/cancel`,
      customer_email: userData.email,
      metadata: {
        user_id: user.id,
        plan_id: finalPlanId,
        is_annual: isAnnual !== undefined ? isAnnual.toString() : undefined
      },
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to create checkout session' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
