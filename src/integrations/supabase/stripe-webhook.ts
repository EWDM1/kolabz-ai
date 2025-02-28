
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const stripeWebhookHandler = async (req: Request, env: any) => {
  // Initialize Stripe with the secret key
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  
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
        // Store payment data in Supabase
        await supabase.from('payments').insert({
          stripe_payment_id: paymentIntent.id,
          amount: paymentIntent.amount / 100, // Convert from cents to dollars
          status: 'succeeded',
          metadata: paymentIntent.metadata
        });
        break;
        
      case 'payment_intent.failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        // Update the payment status in Supabase
        await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('stripe_payment_id', failedPayment.id);
        break;
        
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        // Handle completed checkout sessions
        await supabase.from('checkout_sessions').insert({
          session_id: checkoutSession.id,
          customer_id: checkoutSession.customer,
          amount_total: checkoutSession.amount_total ? checkoutSession.amount_total / 100 : 0,
          status: checkoutSession.status,
          metadata: checkoutSession.metadata
        });
        
        // If this is a subscription checkout, handle it
        if (checkoutSession.mode === 'subscription' && checkoutSession.subscription) {
          // Retrieve the subscription to get full details
          const subscription = await stripe.subscriptions.retrieve(
            checkoutSession.subscription as string
          );
          
          // Store subscription data
          await supabase.from('subscriptions').insert({
            subscription_id: subscription.id,
            customer_id: subscription.customer,
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            metadata: subscription.metadata
          });
        }
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        
        // Upsert the subscription (insert if not exists, update if exists)
        await supabase
          .from('subscriptions')
          .upsert({
            subscription_id: subscription.id,
            customer_id: subscription.customer,
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            metadata: subscription.metadata
          }, { onConflict: 'subscription_id' });
        break;
        
      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object as Stripe.Subscription;
        
        // Update the subscription status to canceled
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('subscription_id', canceledSubscription.id);
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
