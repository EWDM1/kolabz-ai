
import { loadStripe } from '@stripe/stripe-js';
import { getPublishableKeySync } from './stripeConfig';

// Singleton pattern to ensure we only create one instance of Stripe
let stripePromise: ReturnType<typeof loadStripe> | null = null;

/**
 * Returns a Stripe promise instance
 */
export const getStripe = () => {
  if (!stripePromise) {
    // Use the synchronous version to avoid type mismatch with Promise<string>
    const key = getPublishableKeySync();
    
    if (!key) {
      console.error('Stripe publishable key is not available');
      // Still return a Stripe instance with empty key to avoid breaking the app
      // It will show an error in the UI later
      stripePromise = loadStripe('');
    } else {
      stripePromise = loadStripe(key);
    }
  }
  
  return stripePromise;
};

/**
 * Resets the Stripe instance, useful when switching between test/live modes
 */
export const resetStripe = () => {
  stripePromise = null;
};
