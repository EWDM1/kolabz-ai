
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from "@/integrations/supabase/client";
import { getPublishableKey } from './stripeConfig';

// Get Stripe instance 
let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    // Get the publishable key synchronously to avoid type issues
    const key = getPublishableKeySync();
    if (key) {
      stripePromise = loadStripe(key);
    }
  }
  return stripePromise;
};

// Format card details for display
export const formatCardDetails = (paymentMethod: any) => {
  if (!paymentMethod || !paymentMethod.card) {
    return {
      last4: '••••',
      expiry: '••/••',
      brand: 'card'
    };
  }
  
  return {
    last4: paymentMethod.card.last4,
    expiry: `${String(paymentMethod.card.exp_month).padStart(2, '0')}/${String(paymentMethod.card.exp_year).slice(-2)}`,
    brand: paymentMethod.card.brand
  };
};

// Change subscription plan
export const changeSubscriptionPlan = async (
  planId: string, 
  isAnnual: boolean
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    // Call the change plan function
    const { data, error } = await supabase.functions.invoke(
      'change-subscription-plan',
      {
        body: { 
          planId, 
          isAnnual 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      }
    );
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      message: data.message || 'Subscription plan changed successfully'
    };
  } catch (error) {
    console.error('Error changing subscription plan:', error);
    return {
      success: false,
      message: error.message || 'Failed to change subscription plan'
    };
  }
};

// Cancel subscription
export const cancelSubscription = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    // Call the cancel subscription function
    const { data, error } = await supabase.functions.invoke(
      'cancel-subscription',
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      }
    );
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      message: data.message || 'Subscription cancelled successfully'
    };
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return {
      success: false,
      message: error.message || 'Failed to cancel subscription'
    };
  }
};

// Check if subscription is active
export const hasActiveSubscription = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }
    
    const { data, error } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();
    
    if (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking active subscription:', error);
    return false;
  }
};

// Create a Stripe checkout session
export const createCheckoutSession = async (
  priceId: string
): Promise<{ url: string } | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    const { data, error } = await supabase.functions.invoke(
      'create-checkout-session',
      {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      }
    );
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
};

// Create a customer portal session
export const createCustomerPortalSession = async (): Promise<{ url: string } | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    const { data, error } = await supabase.functions.invoke(
      'create-customer-portal-session',
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      }
    );
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return null;
  }
};

// Create or update payment method
export const updatePaymentMethod = async (
  paymentMethodId: string
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    const { data, error } = await supabase.functions.invoke(
      'update-payment-method',
      {
        body: { paymentMethodId },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      }
    );
    
    if (error) throw error;
    
    return {
      success: true,
      message: data.message || 'Payment method updated successfully'
    };
  } catch (error) {
    console.error('Error updating payment method:', error);
    return {
      success: false,
      message: error.message || 'Failed to update payment method'
    };
  }
};
