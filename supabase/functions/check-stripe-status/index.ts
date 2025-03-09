
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

// Get environment variables
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') as string

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Dynamically import Stripe
    const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
    
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ success: false, message: 'Stripe secret key is not configured' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    })

    // Simple test to check if Stripe API is working by retrieving account info
    const account = await stripe.account.retrieve()
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Stripe is properly configured',
        mode: account.settings?.dashboard?.display_name?.includes('Test') ? 'test' : 'live'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error checking Stripe status:', error)
    
    // Return helpful error message
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || 'Failed to connect to Stripe'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
