
import { loadStripe } from '@stripe/stripe-js';
import { getPublishableKeySync, isTestMode } from './stripeConfig';

// Initialize Stripe
let stripePromise: Promise<any> | null = null;

// Get Stripe instance with current publishable key
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(getPublishableKeySync());
  }
  return stripePromise;
};

// Function to update a payment method
export const updatePaymentMethod = async () => {
  const stripe = await getStripe();
  
  // Create a payment method collection session
  // In a real implementation, this would call your backend
  const { error, paymentMethod } = await stripe.collectBankAccountForPayment({
    params: {
      payment_method_type: 'card',
    },
  });
  
  if (error) {
    console.error('Error updating payment method:', error);
    throw error;
  }
  
  return paymentMethod;
};

// Function to change subscription plan
export const changeSubscriptionPlan = async (planId: string, isAnnual: boolean) => {
  // In a real implementation, this would call your backend
  // For demo purposes, we're just simulating a successful response
  console.log(`Changing to plan ${planId} with annual billing: ${isAnnual} (Test mode: ${isTestMode()})`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    planId,
    isAnnual,
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    testMode: isTestMode()
  };
};

// Function to cancel subscription
export const cancelSubscription = async () => {
  // In a real implementation, this would call your backend
  console.log(`Cancelling subscription (Test mode: ${isTestMode()})`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: 'Subscription cancelled successfully',
    testMode: isTestMode()
  };
};

// Utility to format card details
export const formatCardDetails = (last4: string, expMonth: number, expYear: number) => {
  return {
    last4,
    expiry: `${expMonth.toString().padStart(2, '0')}/${expYear.toString().slice(-2)}`
  };
};
