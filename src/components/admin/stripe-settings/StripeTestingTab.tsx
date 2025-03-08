
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const StripeTestingTab = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Testing Your Stripe Integration</CardTitle>
          <CardDescription>
            Use these test cards and tools to verify your integration works correctly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Test Credit Cards</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <TestCardItem 
                  title="Successful Payment"
                  cardNumber="4242 4242 4242 4242"
                  description="Any future date, any 3 digits for CVC, any ZIP code"
                />
                
                <TestCardItem 
                  title="Requires Authentication"
                  cardNumber="4000 0025 0000 3155"
                  description="Tests 3D Secure authentication flow"
                />
                
                <TestCardItem 
                  title="Payment Declined"
                  cardNumber="4000 0000 0000 0002"
                  description="Will be declined with a generic decline code"
                />
                
                <TestCardItem 
                  title="Insufficient Funds"
                  cardNumber="4000 0000 0000 9995"
                  description="Will be declined with an insufficient funds code"
                />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Webhook Testing Tools</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use these tools to test your webhook integration without making real payments
              </p>
              
              <div className="space-y-4">
                <Card className="bg-muted/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Stripe CLI</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      The Stripe CLI allows you to forward events to your local environment and trigger test webhook events
                    </p>
                    <div className="bg-card p-3 rounded-md font-mono text-xs overflow-x-auto whitespace-nowrap">
                      stripe listen --forward-to localhost:5000/api/stripe-webhook
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-3">
                    <a 
                      href="https://stripe.com/docs/stripe-cli" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center"
                    >
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Stripe CLI Documentation
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Stripe Dashboard Events</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm text-muted-foreground mb-3">
                      You can trigger test events directly from the Stripe Dashboard to test your webhook handlers.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-2 pb-3">
                    <a 
                      href="https://dashboard.stripe.com/test/webhooks" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center"
                    >
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Stripe Webhooks Dashboard
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface TestCardItemProps {
  title: string;
  cardNumber: string;
  description: string;
}

const TestCardItem = ({ title, cardNumber, description }: TestCardItemProps) => {
  const { toast } = useToast();
  
  const handleCopyCardNumber = () => {
    const strippedCardNumber = cardNumber.replace(/\s/g, "");
    navigator.clipboard.writeText(strippedCardNumber);
    toast({
      title: "Copied",
      description: "Test card number copied to clipboard",
    });
  };
  
  return (
    <Card className="bg-muted/50">
      <CardHeader className="py-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex justify-between items-center">
          <div className="font-mono">{cardNumber}</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={handleCopyCardNumber}
          >
            Copy
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          {description}
        </div>
      </CardContent>
    </Card>
  );
};
