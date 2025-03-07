
import { Database } from "@/integrations/supabase/types";

// Define user role type to match the expected enum values in the database
export type UserRole = Database["public"]["Enums"]["user_role"];

export type Feature = {
  id: string;
  name: string;
  key: string;
  description: string | null;
  category: string;
};

export type RoleFeature = {
  id: string;
  feature_id: string;
  role: string;
  enabled: boolean;
};

export type FeatureCategory = {
  name: string;
  value: string;
  color: string;
};

// Feature category definitions with associated colors
export const featureCategories: Record<string, FeatureCategory> = {
  content: { name: "Content", value: "content", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  users: { name: "Users", value: "users", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  analytics: { name: "Analytics", value: "analytics", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  settings: { name: "Settings", value: "settings", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  billing: { name: "Billing", value: "billing", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
};
