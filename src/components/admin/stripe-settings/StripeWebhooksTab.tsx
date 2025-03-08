
import { useState } from "react";
import { ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveStripeConfig, STRIPE_SETTINGS } from "@/integrations/stripe/stripeConfig";
import { useToast } from "@/hooks/use-toast";

interface StripeWebhooksTabProps {
  savedKeys: {
    stripePublishableKey: boolean;
    stripeSecretKey: boolean;
    stripeWebhookSecret: boolean;
  };
  loading: boolean;
  setSavedKeys: (keys: any) => void;
}

export const StripeWebhooksTab = ({ 
  savedKeys, 
  loading, 
  setSavedKeys 
}: StripeWebhooksTabProps) => {
  const { toast } = useToast();
  const [webhookSecret, setWebhookSecret] = useState("");

  // Handler for saving webhook secret
  const handleSaveWebhookSecret = async () => {
    if (!webhookSecret) return;
    
    try {
      const success = await saveStripeConfig(STRIPE_SETTINGS.WEBHOOK_SECRET, webhookSecret);
      
      if (success) {
        setSavedKeys({
          ...savedKeys,
          stripeWebhookSecret: true
        });
        
        toast({
          title: "Webhook secret saved",
          description: "Your Stripe webhook secret has been saved successfully",
        });
        
        setWebhookSecret("");
      } else {
        throw new Error("Failed to save webhook secret");
      }
    } catch (error) {
      console.error("Error saving webhook secret:", error);
      toast({
        variant: "destructive",
        title: "Error saving webhook secret",
        description: "There was an unexpected error saving your Stripe webhook secret",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <CardDescription>
            Set up webhooks to handle Stripe events in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="webhook-secret">Webhook Secret</Label>
                {savedKeys.stripeWebhookSecret && (
                  <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Check className="h-3 w-3" /> Secret Set
                  </span>
                )}
              </div>
              <Input
                id="webhook-secret"
                type="password"
                placeholder="whsec_..."
                value={webhookSecret}
                onChange={(e) => setWebhookSecret(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The webhook secret is used to verify that events were sent by Stripe
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Your Webhook URL</Label>
              <div className="flex gap-2">
                <Input
                  id="webhook-url"
                  value={`${window.location.origin}/api/stripe-webhook`}
                  readOnly
                  className="bg-muted/50"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/api/stripe-webhook`);
                    toast({
                      title: "URL copied",
                      description: "Webhook URL copied to clipboard",
                    });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this URL when configuring webhooks in your Stripe Dashboard
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-lg border p-4 space-y-2 mt-4">
              <div className="font-medium text-sm">Recommended Events to Listen For:</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• payment_intent.succeeded</li>
                <li>• payment_intent.failed</li>
                <li>• checkout.session.completed</li>
                <li>• customer.subscription.created</li>
                <li>• customer.subscription.updated</li>
                <li>• customer.subscription.deleted</li>
              </ul>
            </div>
            
            <div className="flex items-center justify-end mt-6">
              <Button 
                onClick={handleSaveWebhookSecret}
                disabled={loading || !webhookSecret}
              >
                {loading ? "Saving..." : "Save Webhook Secret"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <WebhookSetupGuide />
    </div>
  );
};

const WebhookSetupGuide = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Setting Up Stripe Webhooks</CardTitle>
        <CardDescription>
          Step-by-step guide to configure webhooks in your Stripe Dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ol className="space-y-4 list-decimal list-inside">
          <li className="pl-2">
            <span className="font-medium">Go to the Webhooks section in Stripe</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              Navigate to Developers → Webhooks in your Stripe Dashboard
            </p>
          </li>
          
          <li className="pl-2">
            <span className="font-medium">Add a new endpoint</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              Click "Add endpoint" and enter your webhook URL from above
            </p>
          </li>
          
          <li className="pl-2">
            <span className="font-medium">Select events to listen for</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              Choose the events you want to be notified about (see recommended list above)
            </p>
          </li>
          
          <li className="pl-2">
            <span className="font-medium">Copy the signing secret</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              After creating the webhook, Stripe will provide a signing secret (starts with "whsec_")
            </p>
          </li>
          
          <li className="pl-2">
            <span className="font-medium">Add the secret above</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              Paste the webhook signing secret in the field above and save
            </p>
          </li>
        </ol>
        
        <div className="flex justify-center mt-4">
          <a 
            href="https://dashboard.stripe.com/webhooks" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center"
          >
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Stripe Webhooks
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
