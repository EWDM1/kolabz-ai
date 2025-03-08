
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionPlan } from "./types";
import { convertDbPlanToLocal, convertLocalPlanToDb } from "./plan-utils";

// Fetch all subscription plans
export const fetchPlansService = async () => {
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('*')
    .order('price_monthly', { ascending: true });
  
  if (error) throw error;
  
  // Convert the data to our interface format
  return data?.map(convertDbPlanToLocal) || [];
};

// Save (create or update) a subscription plan
export const savePlanService = async (plan: Partial<SubscriptionPlan> & { id?: string }) => {
  let result;
  
  // Convert the plan to database format
  const dbPlan = convertLocalPlanToDb(plan);
  
  if (plan.id) {
    // Update existing plan
    result = await supabase
      .from('subscription_plans')
      .update({
        name: dbPlan.name || '',
        description: dbPlan.description,
        price_monthly: dbPlan.price_monthly || 0,
        price_annual: dbPlan.price_annual || 0,
        currency: dbPlan.currency,
        trial_days: dbPlan.trial_days,
        features: dbPlan.features,
        active: dbPlan.active,
        stripe_price_id_monthly: dbPlan.stripe_price_id_monthly,
        stripe_price_id_annual: dbPlan.stripe_price_id_annual,
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
        name: dbPlan.name || '',
        description: dbPlan.description,
        price_monthly: dbPlan.price_monthly || 0,
        price_annual: dbPlan.price_annual || 0,
        currency: dbPlan.currency || 'usd',
        trial_days: dbPlan.trial_days || 7,
        features: dbPlan.features,
        active: dbPlan.active !== undefined ? dbPlan.active : true,
        stripe_price_id_monthly: dbPlan.stripe_price_id_monthly,
        stripe_price_id_annual: dbPlan.stripe_price_id_annual,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
  }
  
  if (result.error) throw result.error;
  
  return convertDbPlanToLocal(result.data);
};

// Toggle plan active status
export const togglePlanStatusService = async (planId: string, active: boolean) => {
  const { error } = await supabase
    .from('subscription_plans')
    .update({ 
      active,
      updated_at: new Date().toISOString()
    })
    .eq('id', planId);
  
  if (error) throw error;
};

// Delete a subscription plan
export const deletePlanService = async (planId: string) => {
  const { error } = await supabase
    .from('subscription_plans')
    .delete()
    .eq('id', planId);
  
  if (error) throw error;
};
