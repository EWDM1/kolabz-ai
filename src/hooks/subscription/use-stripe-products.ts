
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionPlan } from './types';

export const useStripeProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check Stripe connection status
  const checkStripeStatus = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await supabase.functions.invoke('check-stripe-status');
      
      if (response.error) {
        throw new Error(response.error.message || 'Failed to check Stripe status');
      }

      const { success, message, mode } = response.data;
      
      if (success) {
        // Update the localStorage with the current mode for UI consistency
        localStorage.setItem('stripe_test_mode', mode === 'test' ? 'true' : 'false');
        return true;
      } else {
        setError(message || 'Stripe is not properly configured');
        return false;
      }
    } catch (error) {
      console.error('Error checking Stripe status:', error);
      setError(error.message || 'Failed to connect to Stripe');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Sync plan with Stripe
  const syncWithStripe = async (planId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await supabase.functions.invoke('sync-plan-with-stripe', {
        body: { planId }
      });
      
      if (response.error) {
        throw new Error(response.error.message || 'Failed to sync plan with Stripe');
      }

      toast({
        title: 'Plan synced with Stripe',
        description: 'The plan was successfully synced with Stripe.',
      });
      
      return true;
    } catch (error) {
      console.error('Error syncing with Stripe:', error);
      setError(error.message || 'Failed to sync plan with Stripe');
      
      toast({
        variant: 'destructive',
        title: 'Sync failed',
        description: error.message || 'There was an error syncing the plan with Stripe.',
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    checkStripeStatus,
    syncWithStripe
  };
};
