
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useStripeSettings } from "./StripeSettingsContext";
import { useStripeProducts } from "@/hooks/subscription/use-stripe-products";

export const StripeTestingTab = () => {
  const { testMode } = useStripeSettings();
  const { checkStripeStatus } = useStripeProducts();
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    mode?: string;
  } | null>(null);

  const handleCheckStripeConnection = async () => {
    setCheckingStatus(true);
    setResult(null);
    
    try {
      const success = await checkStripeStatus();
      
      if (success) {
        setResult({
          success: true,
          message: "Connection to Stripe API successful!",
          mode: testMode ? "test" : "live"
        });
      } else {
        setResult({
          success: false,
          message: "Could not connect to Stripe API. Please check your API keys."
        });
      }
    } catch (error) {
      console.error("Error checking Stripe connection:", error);
      setResult({
        success: false,
        message: error.message || "An error occurred checking the Stripe connection."
      });
    } finally {
      setCheckingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Stripe API Connection</CardTitle>
          <CardDescription>
            Verify that your Stripe API keys are correctly configured and working
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg border p-4">
              <p className="text-sm">
                You are currently in <span className="font-bold">{testMode ? "test" : "live"}</span> mode. 
                This test will verify that your Stripe API keys for this mode are working correctly.
              </p>
            </div>
            
            <Button 
              onClick={handleCheckStripeConnection} 
              disabled={checkingStatus}
            >
              {checkingStatus ? "Checking connection..." : "Test Stripe Connection"}
            </Button>
            
            {result && (
              <Alert 
                variant={result.success ? "default" : "destructive"} 
                className={result.success ? "bg-green-50 text-green-800 border-green-200" : ""}
              >
                {result.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {result.success ? "Connection Successful" : "Connection Failed"}
                </AlertTitle>
                <AlertDescription>
                  {result.message}
                  {result.success && result.mode && (
                    <p className="mt-2">Mode: <span className="font-semibold">{result.mode}</span></p>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Integration Guides</CardTitle>
          <CardDescription>
            Learn how to work with Stripe in your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="testing">
            <TabsList className="mb-4">
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="testing" className="space-y-4">
              <h3 className="text-lg font-medium">Test Mode Guidelines</h3>
              <p className="text-sm text-muted-foreground">
                When testing Stripe integration, use these test credit card numbers:
              </p>
              
              <div className="space-y-2">
                <div className="bg-muted p-3 rounded text-sm">
                  <p className="font-medium">Test Credit Card:</p>
                  <code className="block mt-1">4242 4242 4242 4242</code>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Use any future expiration date, any 3-digit CVC, and any postal code.
                  </p>
                </div>
                
                <div className="bg-muted p-3 rounded text-sm">
                  <p className="font-medium">Declined Payment Card:</p>
                  <code className="block mt-1">4000 0000 0000 0002</code>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Use this to test declined payment scenarios.
                  </p>
                </div>
              </div>
              
              <a 
                href="https://stripe.com/docs/testing" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline mt-2"
              >
                View more test cards 
                <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </TabsContent>
            
            <TabsContent value="integration" className="space-y-4">
              <h3 className="text-lg font-medium">Integration Guide</h3>
              <p className="text-sm text-muted-foreground">
                Follow these steps to integrate Stripe payments in your application:
              </p>
              
              <ol className="space-y-2 list-decimal list-inside text-sm">
                <li>Configure your Stripe API keys (both publishable and secret)</li>
                <li>Add Stripe's checkout flow to your application</li>
                <li>Set up webhooks to receive payment events</li>
                <li>Test the integration using test cards</li>
                <li>Switch to live mode when ready for production</li>
              </ol>
              
              <a 
                href="https://stripe.com/docs/payments/quickstart" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline mt-2"
              >
                View Stripe quickstart guide
                <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </TabsContent>
            
            <TabsContent value="webhooks" className="space-y-4">
              <h3 className="text-lg font-medium">Webhooks Setup</h3>
              <p className="text-sm text-muted-foreground">
                Webhooks allow Stripe to notify your application when events happen:
              </p>
              
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li>Successful payments</li>
                <li>Failed payments</li>
                <li>Subscription renewals or cancellations</li>
                <li>Dispute or refund events</li>
              </ul>
              
              <p className="text-sm text-muted-foreground mt-2">
                Your webhook endpoint for this application is:
              </p>
              
              <div className="bg-muted p-3 rounded text-sm font-mono break-all">
                {window.location.origin.replace(/\/$/, "")}/api/stripe-webhook
              </div>
              
              <a 
                href="https://stripe.com/docs/webhooks" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline mt-2"
              >
                Learn more about webhooks
                <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
