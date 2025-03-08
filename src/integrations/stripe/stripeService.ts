
import { loadStripe } from '@stripe/stripe-js';
import { getPublishableKeySync } from './stripeConfig';
import { supabase } from "@/integrations/supabase/client";

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
      // Instead of error, just log a warning - this allows the app to continue loading
      console.warn('Stripe publishable key is not available. Stripe functionality will be limited.');
      // Return null instead of an empty key instance, which will be handled gracefully by the app
      return null;
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

/**
 * Cancel a user's subscription through the Supabase Edge Function
 */
export const cancelSubscription = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const { data: sessionToken, error } = await supabase.auth.getSession();
    
    if (error || !sessionToken.session) {
      throw new Error("Failed to get authentication token");
    }

    const response = await supabase.functions.invoke('cancel-subscription', {
      headers: {
        Authorization: `Bearer ${sessionToken.session.access_token}`
      }
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to cancel subscription");
    }

    return {
      success: true,
      message: "Subscription cancelled successfully"
    };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return {
      success: false,
      message: error.message || "An error occurred while cancelling your subscription"
    };
  }
};

/**
 * Change a user's subscription plan through the Supabase Edge Function
 */
export const changeSubscriptionPlan = async (
  planId: string,
  isAnnual: boolean
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data: sessionToken, error } = await supabase.auth.getSession();
    
    if (error || !sessionToken.session) {
      throw new Error("Failed to get authentication token");
    }

    const response = await supabase.functions.invoke('change-subscription-plan', {
      body: { 
        planId,
        isAnnual
      },
      headers: {
        Authorization: `Bearer ${sessionToken.session.access_token}`
      }
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to change subscription plan");
    }

    return {
      success: true,
      message: "Plan updated successfully"
    };
  } catch (error) {
    console.error("Error changing subscription plan:", error);
    return {
      success: false,
      message: error.message || "An error occurred while changing your subscription plan"
    };
  }
};

/**
 * Format card details for display
 */
export const formatCardDetails = (paymentMethod: any): { last4: string; expiry: string } => {
  if (!paymentMethod || !paymentMethod.card) {
    return {
      last4: '••••',
      expiry: '••/••'
    };
  }

  return {
    last4: paymentMethod.card.last4,
    expiry: `${paymentMethod.card.exp_month.toString().padStart(2, '0')}/${paymentMethod.card.exp_year.toString().slice(-2)}`
  };
};
