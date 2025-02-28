
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const createPaymentIntent = async (req: Request, env: any) => {
  try {
    // Parse the JSON body
    const { amount, customerId, metadata = {} } = await req.json();
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    
    // Initialize Supabase client
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Validate input
    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and ensure it's an integer
      currency: 'usd',
      customer: customerId || undefined,
      metadata: metadata
    });
    
    // Log the payment intent creation in Supabase (optional)
    await supabase.from('payment_intents').insert({
      intent_id: paymentIntent.id,
      amount: amount,
      customer_id: customerId || null,
      status: paymentIntent.status,
      metadata: metadata
    });
    
    // Return the client secret
    return new Response(JSON.stringify({ 
      clientSecret: paymentIntent.client_secret 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create payment intent' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
