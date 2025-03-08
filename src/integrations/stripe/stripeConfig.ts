
// Stripe configuration with persistent settings from Supabase
import { supabase } from "@/integrations/supabase/client";

// Settings keys
export const STRIPE_SETTINGS = {
  PUBLISHABLE_KEY: 'stripe_publishable_key',
  SECRET_KEY: 'stripe_secret_key',
  WEBHOOK_SECRET: 'stripe_webhook_secret',
  MODE: 'stripe_mode'
};

// Interface for Stripe configuration
export interface StripeConfig {
  publishableKey: string | null;
  secretKey: string | null;
  webhookSecret: string | null;
  isTestMode: boolean;
}

// Default to empty values and test mode
const defaultConfig: StripeConfig = {
  publishableKey: null,
  secretKey: null,
  webhookSecret: null,
  isTestMode: true
};

// Cache the config to avoid frequent database calls
let cachedConfig: StripeConfig | null = null;
let lastFetchTimestamp = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

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
  const currentTime = Date.now();
  
  // Return cached configuration if it's still valid
  if (cachedConfig && (currentTime - lastFetchTimestamp < CACHE_DURATION)) {
    return cachedConfig;
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
    cachedConfig = config;
    lastFetchTimestamp = currentTime;
    
    return config;
  } catch (error) {
    console.error('Error in fetchStripeConfig:', error);
    return defaultConfig;
  }
};

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
    cachedConfig = null;
    lastFetchTimestamp = 0;
    
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
    localStorage.setItem('stripe_test_mode', isTestMode.toString());
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
  // First check localStorage for UI consistency
  const savedTestMode = localStorage.getItem('stripe_test_mode');
  if (savedTestMode !== null) {
    return savedTestMode === 'true';
  }
  
  // Default to test mode for safety
  return true;
};

// Initialize from localStorage if available
export const initStripeConfig = (): void => {
  const savedTestMode = localStorage.getItem('stripe_test_mode');
  if (savedTestMode === null) {
    // Set default to test mode if not set
    localStorage.setItem('stripe_test_mode', 'true');
  }
};

// Call init on import
initStripeConfig();
