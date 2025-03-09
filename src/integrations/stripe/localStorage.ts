
// Local storage utilities for Stripe configuration

// Initialize from localStorage if available
export const initStripeConfig = (): void => {
  const savedTestMode = localStorage.getItem('stripe_test_mode');
  if (savedTestMode === null) {
    // Set default to test mode if not set
    localStorage.setItem('stripe_test_mode', 'true');
  }
};

// Get test mode status from localStorage
export const getTestModeFromStorage = (): boolean => {
  // First check localStorage for UI consistency
  const savedTestMode = localStorage.getItem('stripe_test_mode');
  if (savedTestMode !== null) {
    return savedTestMode === 'true';
  }
  
  // Default to test mode for safety
  return true;
};

// Update test mode in localStorage
export const setTestModeInStorage = (isTestMode: boolean): void => {
  localStorage.setItem('stripe_test_mode', isTestMode.toString());
};
