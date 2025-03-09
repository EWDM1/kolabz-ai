
import { StripeConfig } from './types';

// Default to empty values and test mode
export const defaultConfig: StripeConfig = {
  publishableKey: null,
  secretKey: null,
  webhookSecret: null,
  isTestMode: true
};

// Cache the config to avoid frequent database calls
export let cachedConfig: StripeConfig | null = null;
export let lastFetchTimestamp = 0;
export const CACHE_DURATION = 60 * 1000; // 1 minute cache

// Cache management functions
export const getCachedConfig = (): StripeConfig | null => {
  return cachedConfig;
};

export const setCachedConfig = (config: StripeConfig): void => {
  cachedConfig = config;
  lastFetchTimestamp = Date.now();
};

export const invalidateCache = (): void => {
  cachedConfig = null;
  lastFetchTimestamp = 0;
};

export const isCacheValid = (): boolean => {
  const currentTime = Date.now();
  return !!(cachedConfig && (currentTime - lastFetchTimestamp < CACHE_DURATION));
};
