
import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/integrations/stripe/stripeService';
import { Button } from '@/components/ui/button';
import { isTestMode } from '@/integrations/stripe/stripeConfig';

interface PaymentMethodFormProps {
  onSuccess: (paymentMethod: any) => void;
  onError: (error: any) => void;
}

const PaymentMethodForm = ({ onSuccess, onError }: PaymentMethodFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Card element not found");
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message || "An unknown error occurred");
        onError(error);
      } else if (paymentMethod) {
        onSuccess(paymentMethod);
      }
    } catch (e) {
      setErrorMessage("Payment processing failed");
      onError(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isTestMode() && (
        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs rounded flex items-center gap-2">
          <span className="font-semibold">Test Mode Active</span>
          <span>Use test card: 4242 4242 4242 4242, any future date, any CVC</span>
        </div>
      )}
      
      <div className="p-3 border rounded-md bg-background">
        <CardElement 
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
        />
      </div>
      
      {errorMessage && (
        <div className="text-sm text-red-500">
          {errorMessage}
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={isProcessing || !stripe} 
        className="w-full"
      >
        {isProcessing ? "Processing..." : "Update Payment Method"}
      </Button>
    </form>
  );
};

// Wrapper component that provides Stripe context
export const PaymentMethodFormWrapper = (props: Omit<PaymentMethodFormProps, 'stripe' | 'elements'>) => {
  return (
    <Elements stripe={getStripe()}>
      <PaymentMethodForm {...props} />
    </Elements>
  );
};

export default PaymentMethodFormWrapper;
