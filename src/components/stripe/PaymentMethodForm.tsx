
import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getPublishableKey } from '@/integrations/stripe/stripeConfig';

// Demo mode payment form that doesn't actually connect to Stripe
const DemoPaymentForm = ({ onSuccess }: { onSuccess: (paymentMethod: any) => void }) => {
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!cardComplete) {
      setCardError('Please complete your card details');
      return;
    }
    
    setProcessing(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a fake payment method object
      const fakePaymentMethod = {
        id: `pm_demo_${Math.random().toString(36).substring(2, 15)}`,
        type: 'card',
        card: {
          brand: 'visa',
          last4: '4242',
          exp_month: 12,
          exp_year: 2030
        },
        billing_details: {
          name: 'Demo User'
        }
      };
      
      onSuccess(fakePaymentMethod);
    } catch (error) {
      console.error('Error in demo payment form:', error);
      setCardError('An error occurred while processing your card.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : null);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-element">Card details</Label>
        <div className="border rounded-md p-3 bg-background">
          <div className="p-2 border border-dashed rounded border-gray-300 dark:border-gray-600">
            <div className="h-8 flex items-center text-sm text-muted-foreground">
              **** **** **** 4242 (Demo Card)
            </div>
          </div>
        </div>
        {cardError && <p className="text-sm text-destructive">{cardError}</p>}
      </div>
      
      <Button 
        type="button" 
        className="w-full" 
        onClick={() => {
          setCardComplete(true);
          handleSubmit({ preventDefault: () => {} } as any);
        }}
        disabled={processing}
      >
        {processing ? "Processing..." : "Add Payment Method"}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        This is a demo payment form. No actual charges will be made.
      </p>
    </form>
  );
};

// Real payment form that connects to Stripe
const RealPaymentForm = ({ onSuccess, onError }: { 
  onSuccess: (paymentMethod: any) => void,
  onError: (error: any) => void
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    if (!cardComplete) {
      setCardError('Please complete your card details');
      return;
    }
    
    setProcessing(true);
    
    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Card element not found");
      }
      
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      
      if (error) {
        throw error;
      }
      
      onSuccess(paymentMethod);
    } catch (error) {
      console.error('Error creating payment method:', error);
      setCardError(error.message || 'An error occurred while processing your card.');
      onError(error);
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-element">Card details</Label>
        <div className="border rounded-md p-3 bg-background">
          <CardElement 
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            onChange={(event) => {
              setCardComplete(event.complete);
              setCardError(event.error ? event.error.message : null);
            }}
          />
        </div>
        {cardError && <p className="text-sm text-destructive">{cardError}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || !cardComplete || processing}
      >
        {processing ? "Processing..." : "Add Payment Method"}
      </Button>
    </form>
  );
};

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
    <Elements stripe={stripePromise}>
      <RealPaymentForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};
