
// Stripe configuration with persistent settings from Supabase
import { supabase } from "@/integrations/supabase/client";
import { StripeConfig, STRIPE_SETTINGS } from "./types";
import { 
  defaultConfig, 
  cachedConfig, 
  isCacheValid, 
  setCachedConfig, 
  invalidateCache 
} from "./cache";
import { 
  initStripeConfig, 
  getTestModeFromStorage, 
  setTestModeInStorage 
} from "./localStorage";

// Get the current Stripe publishable key synchronously (for immediate use)
export const getPublishableKeySync = (): string => {
  // If we have a cached config, use it
  if (cachedConfig && cachedConfig.publishableKey) {
    return cachedConfig.publishableKey;
  }
  
  // Fallback value for when config isn't cached yet
  // Will allow Stripe to initialize but will display an error if needed
  return '';
};

// Fetch Stripe configuration from Supabase
export const fetchStripeConfig = async (): Promise<StripeConfig> => {
  // Return cached configuration if it's still valid
  if (isCacheValid()) {
    return cachedConfig!;
  }
  
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('key, value')
      .in('key', [
        STRIPE_SETTINGS.PUBLISHABLE_KEY,
        STRIPE_SETTINGS.SECRET_KEY,
        STRIPE_SETTINGS.WEBHOOK_SECRET,
        STRIPE_SETTINGS.MODE
      ]);
    
    if (error) {
      console.error('Error fetching Stripe configuration:', error);
      return defaultConfig;
    }
    
    // Convert the array of key-value pairs to an object
    const settings: Record<string, string | null> = {};
    data.forEach(item => {
      settings[item.key] = item.value;
    });
    
    const config: StripeConfig = {
      publishableKey: settings[STRIPE_SETTINGS.PUBLISHABLE_KEY] || null,
      secretKey: settings[STRIPE_SETTINGS.SECRET_KEY] || null,
      webhookSecret: settings[STRIPE_SETTINGS.WEBHOOK_SECRET] || null,
      isTestMode: settings[STRIPE_SETTINGS.MODE] !== 'live'
    };
    
    // Update the cache
    setCachedConfig(config);
    
    return config;
  } catch (error) {
    console.error('Error in fetchStripeConfig:', error);
    return defaultConfig;
  }
};

// Re-export functions from other modules to maintain API compatibility
export { STRIPE_SETTINGS } from "./types";
export { defaultConfig } from "./cache";

// Save Stripe configuration to Supabase
export const saveStripeConfig = async (
  key: string,
  value: string | null
): Promise<boolean> => {
  try {
    // Check if the setting exists
    const { data, error: checkError } = await supabase
      .from('app_settings')
      .select('id')
      .eq('key', key)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking if setting exists:', checkError);
      return false;
    }
    
    let result;
    
    if (data) {
      // Update existing setting
      result = await supabase
        .from('app_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);
    } else {
      // Insert new setting
      result = await supabase
        .from('app_settings')
        .insert({ 
          key, 
          value, 
          description: `Stripe ${key} configuration`,
          updated_at: new Date().toISOString() 
        });
    }
    
    if (result.error) {
      console.error('Error saving Stripe configuration:', result.error);
      return false;
    }
    
    // Invalidate cache
    invalidateCache();
    
    // If updating mode, also reset the Stripe instance
    if (key === STRIPE_SETTINGS.MODE) {
      // Reset the Stripe instance to force re-initialization with the new keys
      const { resetStripe } = await import('./stripeService');
      resetStripe();
    }
    
    return true;
  } catch (error) {
    console.error('Error in saveStripeConfig:', error);
    return false;
  }
};

// Toggle between test and live modes
export const toggleStripeTestMode = async (isTestMode: boolean): Promise<boolean> => {
  const result = await saveStripeConfig(
    STRIPE_SETTINGS.MODE,
    isTestMode ? 'test' : 'live'
  );
  
  if (result) {
    // Also update localStorage for UI consistency before page refresh
    setTestModeInStorage(isTestMode);
  }
  
  return result;
};

// Get the current Stripe publishable key
export const getPublishableKey = async (): Promise<string | null> => {
  const config = await fetchStripeConfig();
  return config.publishableKey;
};

// Check if Stripe is properly configured
export const isStripeConfigured = async (): Promise<boolean> => {
  const config = await fetchStripeConfig();
  return !!(config.publishableKey && config.secretKey);
};

// Get test mode status
export const isTestMode = (): boolean => {
  return getTestModeFromStorage();
};

// Call init on import
initStripeConfig();
