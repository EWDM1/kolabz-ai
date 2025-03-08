
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  price_monthly: number;
  price_annual: number;
  currency: string;
  trial_days: number;
  features: PlanFeature[];
  active: boolean;
  stripe_price_id_monthly: string | null;
  stripe_price_id_annual: string | null;
  created_at: string;
  updated_at: string;
}

export const useSubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Fetch all subscription plans
  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price_monthly', { ascending: true });
      
      if (error) throw error;
      
      setPlans(data || []);
    } catch (err: any) {
      console.error('Error fetching subscription plans:', err);
      setError(err.message || 'Failed to fetch subscription plans');
      toast({
        variant: "destructive",
        title: "Error loading plans",
        description: err.message || 'Failed to fetch subscription plans',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Create or update a subscription plan
  const savePlan = async (plan: Partial<SubscriptionPlan> & { id?: string }) => {
    try {
      setLoading(true);
      
      let result;
      
      if (plan.id) {
        // Update existing plan
        result = await supabase
          .from('subscription_plans')
          .update({
            ...plan,
            updated_at: new Date().toISOString()
          })
          .eq('id', plan.id)
          .select()
          .single();
      } else {
        // Create new plan
        result = await supabase
          .from('subscription_plans')
          .insert({
            ...plan,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Success",
        description: `Plan ${plan.id ? 'updated' : 'created'} successfully`,
      });
      
      // Refresh plans
      fetchPlans();
      
      return result.data;
    } catch (err: any) {
      console.error('Error saving subscription plan:', err);
      toast({
        variant: "destructive",
        title: "Error saving plan",
        description: err.message || 'Failed to save subscription plan',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle plan active status
  const togglePlanStatus = async (planId: string, active: boolean) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('subscription_plans')
        .update({ 
          active,
          updated_at: new Date().toISOString()
        })
        .eq('id', planId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Plan ${active ? 'activated' : 'deactivated'} successfully`,
      });
      
      // Refresh plans
      fetchPlans();
    } catch (err: any) {
      console.error('Error toggling plan status:', err);
      toast({
        variant: "destructive",
        title: "Error updating plan",
        description: err.message || 'Failed to update plan status',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a subscription plan
  const deletePlan = async (planId: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('subscription_plans')
        .delete()
        .eq('id', planId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Plan deleted successfully",
      });
      
      // Refresh plans
      fetchPlans();
    } catch (err: any) {
      console.error('Error deleting subscription plan:', err);
      toast({
        variant: "destructive",
        title: "Error deleting plan",
        description: err.message || 'Failed to delete subscription plan',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);
  
  return {
    plans,
    loading,
    error,
    fetchPlans,
    savePlan,
    togglePlanStatus,
    deletePlan
  };
};
