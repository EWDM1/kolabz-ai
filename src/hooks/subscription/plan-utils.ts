
import { PlanFeature, SubscriptionPlan, DbPlan } from "./types";
import { Json } from "@/integrations/supabase/types";

// Convert database plan to local SubscriptionPlan format
export const convertDbPlanToLocal = (dbPlan: DbPlan): SubscriptionPlan => {
  let featuresArray: PlanFeature[] = [];
  
  // Handle features conversion from JSON to PlanFeature[]
  if (dbPlan.features) {
    try {
      if (typeof dbPlan.features === 'string') {
        featuresArray = JSON.parse(dbPlan.features);
      } else if (Array.isArray(dbPlan.features)) {
        featuresArray = dbPlan.features as PlanFeature[];
      } else if (typeof dbPlan.features === 'object') {
        featuresArray = JSON.parse(JSON.stringify(dbPlan.features));
      }
    } catch (e) {
      console.error('Error parsing plan features:', e);
      featuresArray = [];
    }
  }
  
  return {
    id: dbPlan.id,
    name: dbPlan.name || '',
    description: dbPlan.description,
    price_monthly: dbPlan.price_monthly,
    price_annual: dbPlan.price_annual,
    currency: dbPlan.currency,
    trial_days: dbPlan.trial_days,
    features: featuresArray,
    active: dbPlan.active,
    stripe_price_id_monthly: dbPlan.stripe_price_id_monthly,
    stripe_price_id_annual: dbPlan.stripe_price_id_annual,
    created_at: dbPlan.created_at,
    updated_at: dbPlan.updated_at
  };
};

// Convert local plan format to database format for storage
export const convertLocalPlanToDb = (plan: Partial<SubscriptionPlan>): Record<string, any> => {
  const featuresJson = plan.features ? JSON.stringify(plan.features) : "[]";
  
  return {
    ...plan,
    features: featuresJson
  };
};
