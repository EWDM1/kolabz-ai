
import { supabase } from "@/integrations/supabase/client";

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
