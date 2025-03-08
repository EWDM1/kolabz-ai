
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useStripeProducts = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Sync plans with Stripe
  const syncWithStripe = async (planId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('sync-plan-with-stripe', {
        body: { planId }
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Plan synced with Stripe successfully",
      });
      
      return data;
    } catch (err: any) {
      console.error('Error syncing with Stripe:', err);
      toast({
        variant: "destructive",
        title: "Error syncing with Stripe",
        description: err.message || 'Failed to sync plan with Stripe',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Check Stripe connection status
  const checkStripeStatus = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('check-stripe-status');
      
      if (error) throw error;
      
      return data.connected;
    } catch (err: any) {
      console.error('Error checking Stripe status:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    syncWithStripe,
    checkStripeStatus
  };
};
