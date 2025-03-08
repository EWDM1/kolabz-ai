
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
    // Check if Stripe API key is available
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ connected: false, message: 'Stripe API key is not configured' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Dynamically import Stripe
    const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
    
    try {
      // Test the connection by making a simple API call
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2022-11-15',
      })
      
      await stripe.balance.retrieve()
      
      return new Response(
        JSON.stringify({ connected: true, message: 'Successfully connected to Stripe' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } catch (stripeError) {
      console.error('Stripe connection error:', stripeError)
      return new Response(
        JSON.stringify({ 
          connected: false, 
          message: `Stripe connection error: ${stripeError.message || 'Unknown error'}` 
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
  } catch (error) {
    console.error('Error checking Stripe status:', error)
    return new Response(
      JSON.stringify({ 
        connected: false, 
        message: error.message || 'Unknown error occurred'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
