
// Stripe configuration types
export interface StripeConfig {
  publishableKey: string | null;
  secretKey: string | null;
  webhookSecret: string | null;
  isTestMode: boolean;
}

// Settings keys
export const STRIPE_SETTINGS = {
  PUBLISHABLE_KEY: 'stripe_publishable_key',
  SECRET_KEY: 'stripe_secret_key',
  WEBHOOK_SECRET: 'stripe_webhook_secret',
  MODE: 'stripe_mode'
};
