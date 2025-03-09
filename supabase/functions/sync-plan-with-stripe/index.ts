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
    // Parse request body
    const { planId } = await req.json()
    
    // Validate request data
    if (!planId) {
      return new Response(
        JSON.stringify({ error: 'Plan ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Load Stripe
    const { Stripe } = await import('https://esm.sh/stripe@12.0.0?target=deno')
    
    if (!stripeSecretKey) {
      console.error('Missing STRIPE_SECRET_KEY')
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    })

    // Get plan data from database
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single()

    if (planError || !plan) {
      throw planError || new Error('Plan not found')
    }

    // Create or update products and prices in Stripe
    const product = await createOrUpdateProduct(stripe, plan)
    const monthlyPrice = await createOrUpdatePrice(stripe, product.id, plan, false)
    const annualPrice = await createOrUpdatePrice(stripe, product.id, plan, true)

    // Update plan with Stripe IDs
    const { error: updateError } = await supabase
      .from('subscription_plans')
      .update({
        stripe_product_id: product.id,
        stripe_price_id_monthly: monthlyPrice.id,
        stripe_price_id_annual: annualPrice.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', planId)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        product: product,
        prices: {
          monthly: monthlyPrice,
          annual: annualPrice
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error syncing plan with Stripe:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to sync plan with Stripe' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Helper to create or update a product in Stripe
async function createOrUpdateProduct(stripe: any, plan: any) {
  const productData = {
    name: plan.name,
    description: plan.description || undefined,
    active: plan.active,
    metadata: {
      plan_id: plan.id
    }
  }

  // If the plan already has a Stripe product ID, update it
  if (plan.stripe_product_id) {
    return await stripe.products.update(plan.stripe_product_id, productData)
  }

  // Otherwise create a new product
  return await stripe.products.create(productData)
}

// Helper to create or update a price in Stripe
async function createOrUpdatePrice(stripe: any, productId: string, plan: any, isAnnual: boolean) {
  const priceData = {
    product: productId,
    currency: 'usd',
    unit_amount: isAnnual ? plan.price_annual : plan.price_monthly,
    recurring: {
      interval: isAnnual ? 'year' : 'month',
    },
    active: plan.active,
    metadata: {
      plan_id: plan.id,
      is_annual: isAnnual.toString()
    }
  }

  const existingPriceId = isAnnual ? plan.stripe_price_id_annual : plan.stripe_price_id_monthly

  // If price already exists in Stripe, we can't update the amount
  // Instead, we'll deactivate the old one and create a new one
  if (existingPriceId) {
    try {
      // First, deactivate the old price
      await stripe.prices.update(existingPriceId, { active: false })
    } catch (error) {
      // If the price doesn't exist in Stripe, we can ignore this error
      console.warn(`Could not deactivate price ${existingPriceId}:`, error.message)
    }
  }

  // Create a new price
  return await stripe.prices.create(priceData)
}
