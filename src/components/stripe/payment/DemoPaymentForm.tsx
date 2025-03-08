
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Demo mode payment form that doesn't actually connect to Stripe
export const DemoPaymentForm = ({ onSuccess }: { onSuccess: (paymentMethod: any) => void }) => {
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
