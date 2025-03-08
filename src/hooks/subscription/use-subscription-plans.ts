
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { SubscriptionPlan } from "./types";
import { 
  fetchPlansService, 
  savePlanService, 
  togglePlanStatusService,
  deletePlanService
} from "./plan-service";

export type { PlanFeature, SubscriptionPlan } from "./types";

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
      
      const formattedPlans = await fetchPlansService();
      setPlans(formattedPlans);
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
      
      const savedPlan = await savePlanService(plan);
      
      toast({
        title: "Success",
        description: `Plan ${plan.id ? 'updated' : 'created'} successfully`,
      });
      
      // Refresh plans
      fetchPlans();
      
      return savedPlan;
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
      
      await togglePlanStatusService(planId, active);
      
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
      
      await deletePlanService(planId);
      
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
