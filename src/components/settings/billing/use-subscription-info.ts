
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const useSubscriptionInfo = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;
      
      try {
        setLoadingSubscription(true);
        
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();
        
        if (error) throw error;
        
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoadingSubscription(false);
      }
    };
    
    fetchSubscription();
  }, [user]);

  // Check if subscription is in trial period
  const isInTrialPeriod = () => {
    if (!subscription || !subscription.trial_end_date) return false;
    
    const trialEndDate = new Date(subscription.trial_end_date);
    const now = new Date();
    
    return now < trialEndDate;
  };
  
  // Calculate days remaining in trial
  const getDaysRemainingInTrial = () => {
    if (!subscription || !subscription.trial_end_date) return 0;
    
    const trialEndDate = new Date(subscription.trial_end_date);
    const now = new Date();
    
    // Return 0 if trial has ended
    if (now > trialEndDate) return 0;
    
    const diffTime = Math.abs(trialEndDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return {
    subscription,
    loadingSubscription,
    isInTrialPeriod,
    getDaysRemainingInTrial
  };
};
