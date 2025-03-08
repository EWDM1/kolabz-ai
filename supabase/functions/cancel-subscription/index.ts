
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Get environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') as string

// Create a Supabase client with the admin key
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get JWT token from the authorization header (Bearer token)
    const token = authHeader.replace('Bearer ', '')
    
    // Verify the JWT token and get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token or user not found' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get subscription data from the database
    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()
    
    if (subscriptionError || !subscriptionData) {
      return new Response(
        JSON.stringify({ error: 'No active subscription found for this user' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // If there's a Stripe subscription ID, cancel it in Stripe
    if (subscriptionData.stripe_subscription_id) {
      // Dynamically import Stripe
      const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2022-11-15',
      })
      
      try {
        // Cancel at period end rather than immediately canceling
        await stripe.subscriptions.update(subscriptionData.stripe_subscription_id, {
          cancel_at_period_end: true
        })
      } catch (stripeError) {
        console.error('Stripe cancellation error:', stripeError)
        // Continue with local cancellation even if Stripe fails
      }
    }

    // Update subscription status in the database
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('status', 'active')
    
    if (updateError) {
      return new Response(
        JSON.stringify({ error: 'Failed to update subscription status' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Subscription has been cancelled. You will have access until the end of your current billing period.' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error cancelling subscription:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
