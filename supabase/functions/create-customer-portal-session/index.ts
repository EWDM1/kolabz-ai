
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
    const body = await req.json().catch(() => ({}))
    const returnUrl = body.returnUrl || `${appUrl}/manage-subscription`

    // Load Stripe
    const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    })

    // Get customer ID from database
    const { data: subscriptionData, error: subscriptionError } = await supabaseClient
      .from('subscriptions')
      .select('customer_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()

    if (subscriptionError) {
      throw subscriptionError
    }

    if (!subscriptionData?.customer_id) {
      throw new Error('No active subscription found')
    }

    // Create customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: subscriptionData.customer_id,
      return_url: returnUrl,
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to create customer portal session' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
