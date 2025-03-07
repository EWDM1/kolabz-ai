
import { loadStripe } from '@stripe/stripe-js';
import { getPublishableKeySync } from './stripeConfig';

let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(getPublishableKeySync());
  }
  return stripePromise;
};

export const createCustomer = async (email: string) => {
  // This would typically be an API call to your backend
  console.log(`Creating customer for ${email}`);
  return { id: 'cus_mock_' + Math.random().toString(36).substring(2, 15) };
};

export const createSubscription = async (
  customerId: string, 
  priceId: string
) => {
  // This would typically be an API call to your backend
  console.log(`Creating subscription for customer ${customerId} with price ${priceId}`);
  return { id: 'sub_mock_' + Math.random().toString(36).substring(2, 15) };
};

export const cancelSubscription = async (subscriptionId: string) => {
  // This would typically be an API call to your backend
  console.log(`Cancelling subscription ${subscriptionId}`);
  return { status: 'canceled' };
};

export const updateSubscription = async (
  subscriptionId: string, 
  priceId: string
) => {
  // This would typically be an API call to your backend
  console.log(`Updating subscription ${subscriptionId} to price ${priceId}`);
  return { status: 'active', current_period_end: new Date().setMonth(new Date().getMonth() + 1) };
};

export const getSubscription = async (subscriptionId: string) => {
  // This would typically be an API call to your backend
  console.log(`Getting subscription ${subscriptionId}`);
  return {
    id: subscriptionId,
    status: 'active',
    current_period_end: new Date().setMonth(new Date().getMonth() + 1),
    items: {
      data: [
        {
          price: {
            id: 'price_mock',
            product: 'prod_mock'
          }
        }
      ]
    }
  };
};

export const getCustomerPaymentMethods = async (customerId: string) => {
  // This would typically be an API call to your backend
  console.log(`Getting payment methods for customer ${customerId}`);
  return {
    data: [
      {
        id: 'pm_mock_' + Math.random().toString(36).substring(2, 15),
        card: {
          brand: 'visa',
          last4: '4242',
          exp_month: 12,
          exp_year: 2024
        }
      }
    ]
  };
};
