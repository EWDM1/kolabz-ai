
import { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Real payment form component that interacts with Stripe
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

// Wrapper with Stripe Elements provider
export const StripePaymentForm = ({ 
  stripePromise, 
  onSuccess, 
  onError 
}: { 
  stripePromise: Promise<any>,
  onSuccess: (paymentMethod: any) => void,
  onError: (error: any) => void
}) => {
  return (
    <Elements stripe={stripePromise}>
      <RealPaymentForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};
