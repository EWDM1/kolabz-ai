
import { Json } from "@/integrations/supabase/types";

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

export interface DbPlan {
  id: string;
  name: string;
  description: string | null;
  price_monthly: number;
  price_annual: number;
  currency: string;
  trial_days: number;
  features: Json;
  active: boolean;
  stripe_price_id_monthly: string | null;
  stripe_price_id_annual: string | null;
  created_at: string;
  updated_at: string;
}
