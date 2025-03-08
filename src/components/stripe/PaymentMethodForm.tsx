
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { getPublishableKey } from '@/integrations/stripe/stripeConfig';
import { DemoPaymentForm } from './payment/DemoPaymentForm';
import { StripePaymentForm } from './payment/StripePaymentForm';

// Wrapper to dynamically load Stripe based on available publishable key
export const PaymentMethodFormWrapper = ({ 
  onSuccess, 
  onError = () => {}, 
  demoMode = false 
}: { 
  onSuccess: (paymentMethod: any) => void,
  onError?: (error: any) => void,
  demoMode?: boolean
}) => {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  
  useEffect(() => {
    const loadStripeKey = async () => {
      if (demoMode) return;
      
      try {
        const publishableKey = await getPublishableKey();
        
        if (publishableKey) {
          setStripePromise(loadStripe(publishableKey));
        } else {
          console.warn('No Stripe publishable key available.');
        }
      } catch (error) {
        console.error('Error loading Stripe publishable key:', error);
      }
    };
    
    loadStripeKey();
  }, [demoMode]);
  
  if (demoMode) {
    return <DemoPaymentForm onSuccess={onSuccess} />;
  }
  
  if (!stripePromise) {
    return (
      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm rounded-md">
        <p>Loading payment form...</p>
      </div>
    );
  }
  
  return (
    <StripePaymentForm 
      stripePromise={stripePromise} 
      onSuccess={onSuccess} 
      onError={onError} 
    />
  );
};
