
import { loadStripe, Stripe } from '@stripe/stripe-js';

// This variable will hold the Stripe instance once loaded
let stripePromise: Promise<Stripe | null>;

// Function to initialize the Stripe client
export const getStripe = (publishableKey?: string) => {
  if (!stripePromise) {
    const key = publishableKey || 
      (typeof window !== 'undefined' && window.ENV?.STRIPE_PUBLISHABLE_KEY);
    
    if (!key) {
      console.error('Stripe publishable key is missing!');
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(key);
  }
  
  return stripePromise;
};

// Helper function to format amount with currency
export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Helper function to validate a credit card number (Luhn algorithm)
export const isValidCardNumber = (number: string) => {
  // Remove all non-digit characters
  const digits = number.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

// Function to detect card type based on the number
export const getCardType = (number: string) => {
  const digits = number.replace(/\D/g, '');
  
  // Visa
  if (/^4/.test(digits)) {
    return 'visa';
  }
  
  // Mastercard
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) {
    return 'mastercard';
  }
  
  // American Express
  if (/^3[47]/.test(digits)) {
    return 'amex';
  }
  
  // Discover
  if (/^6(?:011|5)/.test(digits)) {
    return 'discover';
  }
  
  return 'unknown';
};
