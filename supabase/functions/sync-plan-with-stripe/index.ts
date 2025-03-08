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
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get the request body
    const { planId } = await req.json()

    if (!planId) {
      return new Response(
        JSON.stringify({ error: 'Plan ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get the subscription plan
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single()

    if (planError) {
      return new Response(
        JSON.stringify({ error: `Error fetching plan: ${planError.message}` }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if Stripe API key is available
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: 'Stripe API key is not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Dynamically import Stripe
    const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    })

    // Create or update the product in Stripe
    let product
    try {
      // Check if we already have a product for this plan
      const productList = await stripe.products.list({
        active: true,
      })

      const existingProduct = productList.data.find(
        p => p.metadata.plan_id === planId
      )

      if (existingProduct) {
        // Update existing product
        product = await stripe.products.update(existingProduct.id, {
          name: plan.name,
          description: plan.description || undefined,
          active: plan.active,
          metadata: {
            plan_id: planId,
          },
        })
      } else {
        // Create new product
        product = await stripe.products.create({
          name: plan.name,
          description: plan.description || undefined,
          active: plan.active,
          metadata: {
            plan_id: planId,
          },
        })
      }

      // Handle prices for monthly billing
      let priceMonthly
      if (plan.stripe_price_id_monthly) {
        // Update existing price (Note: Stripe doesn't allow updating the amount of existing prices)
        // So we get the existing price info
        const existingPrice = await stripe.prices.retrieve(plan.stripe_price_id_monthly)
        
        // If amount or currency changed, we need to create a new price
        if (
          existingPrice.unit_amount !== plan.price_monthly || 
          existingPrice.currency !== plan.currency
        ) {
          priceMonthly = await stripe.prices.create({
            product: product.id,
            unit_amount: plan.price_monthly,
            currency: plan.currency,
            recurring: {
              interval: 'month',
              trial_period_days: plan.trial_days,
            },
            active: plan.active,
            metadata: {
              plan_id: planId,
              billing_type: 'monthly',
            },
          })
        } else {
          // Otherwise keep using the existing price
          priceMonthly = existingPrice
        }
      } else {
        // Create new price
        priceMonthly = await stripe.prices.create({
          product: product.id,
          unit_amount: plan.price_monthly,
          currency: plan.currency,
          recurring: {
            interval: 'month',
            trial_period_days: plan.trial_days,
          },
          active: plan.active,
          metadata: {
            plan_id: planId,
            billing_type: 'monthly',
          },
        })
      }

      // Handle prices for annual billing
      let priceAnnual
      if (plan.stripe_price_id_annual) {
        // Update existing price (Note: Stripe doesn't allow updating the amount of existing prices)
        // So we get the existing price info
        const existingPrice = await stripe.prices.retrieve(plan.stripe_price_id_annual)
        
        // If amount or currency changed, we need to create a new price
        if (
          existingPrice.unit_amount !== plan.price_annual || 
          existingPrice.currency !== plan.currency
        ) {
          priceAnnual = await stripe.prices.create({
            product: product.id,
            unit_amount: plan.price_annual,
            currency: plan.currency,
            recurring: {
              interval: 'year',
              trial_period_days: plan.trial_days,
            },
            active: plan.active,
            metadata: {
              plan_id: planId,
              billing_type: 'annual',
            },
          })
        } else {
          // Otherwise keep using the existing price
          priceAnnual = existingPrice
        }
      } else {
        // Create new price
        priceAnnual = await stripe.prices.create({
          product: product.id,
          unit_amount: plan.price_annual,
          currency: plan.currency,
          recurring: {
            interval: 'year',
            trial_period_days: plan.trial_days,
          },
          active: plan.active,
          metadata: {
            plan_id: planId,
            billing_type: 'annual',
          },
        })
      }

      // Update the plan with Stripe IDs
      const { error: updateError } = await supabase
        .from('subscription_plans')
        .update({
          stripe_price_id_monthly: priceMonthly.id,
          stripe_price_id_annual: priceAnnual.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', planId)

      if (updateError) {
        throw new Error(`Error updating plan with Stripe IDs: ${updateError.message}`)
      }

      return new Response(
        JSON.stringify({
          success: true,
          product: product.id,
          priceMonthly: priceMonthly.id,
          priceAnnual: priceAnnual.id,
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } catch (stripeError: any) {
      console.error('Stripe error:', stripeError)
      return new Response(
        JSON.stringify({ error: `Stripe error: ${stripeError.message}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
  } catch (error: any) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
