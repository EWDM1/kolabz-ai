
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const stripeWebhookHandler = async (req: Request, env: any) => {
  // Initialize Stripe with the secret key
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia', // Updated to match the expected version
  });
  
  // Initialize Supabase client
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Get the signature from the request header
  const sig = req.headers.get('stripe-signature');
  
  if (!sig) {
    return new Response('Missing Stripe signature', { status: 400 });
  }
  
  try {
    // Get the raw body as text
    const body = await req.text();
    
    // Verify the webhook came from Stripe
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );
    
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // Handle successful payment
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        // Handle failed payment
        console.log(`Payment failed: ${failedPayment.id}`);
        break;
        
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        // Handle completed checkout
        console.log(`Checkout completed: ${checkoutSession.id}`);
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        // Handle subscription updates
        console.log(`Subscription updated: ${subscription.id}`);
        break;
        
      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object as Stripe.Subscription;
        // Handle subscription cancellation
        console.log(`Subscription canceled: ${canceledSubscription.id}`);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Return a success response
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }
};
