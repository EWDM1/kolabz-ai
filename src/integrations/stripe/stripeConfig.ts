
// Stripe configuration with test mode support
interface StripeConfig {
  publishableKey: string;
  secretKey: string;
  isTestMode: boolean;
}

// Default to test mode for safety
const defaultConfig: StripeConfig = {
  publishableKey: 'pk_live_51PMd4EGG8uF0Uz6BnVVnuDGYg0wBhmKLAFPu7Wz8ebmbJ6ev6zLby73QTHH3NoSuHLDhEM8hm31y2Mvgv9O7lHqC00KL6ugAIn',
  secretKey: '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',
  isTestMode: true // Default to test mode for safety
};

let stripeConfig: StripeConfig = { ...defaultConfig };

// Function to toggle between test and live modes
export const toggleStripeTestMode = (isTestMode: boolean): void => {
  stripeConfig.isTestMode = isTestMode;
  // In a real implementation, you would switch between test and live keys
  // For demo purposes, we're using the same keys
  localStorage.setItem('stripe_test_mode', isTestMode.toString());
};

// Initialize test mode from localStorage if available
export const initStripeConfig = (): void => {
  const savedTestMode = localStorage.getItem('stripe_test_mode');
  if (savedTestMode !== null) {
    stripeConfig.isTestMode = savedTestMode === 'true';
  }
};

// Get the current Stripe publishable key based on mode
export const getPublishableKey = (): string => {
  return stripeConfig.publishableKey;
};

// Get the current Stripe config
export const getStripeConfig = (): StripeConfig => {
  return { ...stripeConfig };
};

// Get test mode status
export const isTestMode = (): boolean => {
  return stripeConfig.isTestMode;
};

// Initialize on import
initStripeConfig();
