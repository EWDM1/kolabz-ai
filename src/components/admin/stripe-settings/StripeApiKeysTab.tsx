
import { useState } from "react";
import { AlertCircle, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveStripeConfig, STRIPE_SETTINGS } from "@/integrations/stripe/stripeConfig";
import { useToast } from "@/hooks/use-toast";

interface StripeApiKeysTabProps {
  testMode: boolean;
  savedKeys: {
    stripePublishableKey: boolean;
    stripeSecretKey: boolean;
    stripeWebhookSecret: boolean;
  };
  loading: boolean;
  handleModeToggle: () => Promise<void>;
  setSavedKeys: (keys: any) => void;
}

export const StripeApiKeysTab = ({ 
  testMode, 
  savedKeys, 
  loading, 
  handleModeToggle,
  setSavedKeys
}: StripeApiKeysTabProps) => {
  const { toast } = useToast();
  const [publishableKey, setPublishableKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");

  // Handler for saving Stripe keys
  const handleSaveKeys = async () => {
    const updatedKeys = { ...savedKeys };
    const promises = [];
    
    try {
      // Save publishable key if provided
      if (publishableKey) {
        promises.push(
          saveStripeConfig(STRIPE_SETTINGS.PUBLISHABLE_KEY, publishableKey)
            .then(success => {
              if (success) updatedKeys.stripePublishableKey = true;
              return success;
            })
        );
      }
      
      // Save secret key if provided
      if (secretKey) {
        promises.push(
          saveStripeConfig(STRIPE_SETTINGS.SECRET_KEY, secretKey)
            .then(success => {
              if (success) updatedKeys.stripeSecretKey = true;
              return success;
            })
        );
      }
      
      // Save webhook secret if provided
      if (webhookSecret) {
        promises.push(
          saveStripeConfig(STRIPE_SETTINGS.WEBHOOK_SECRET, webhookSecret)
            .then(success => {
              if (success) updatedKeys.stripeWebhookSecret = true;
              return success;
            })
        );
      }
      
      const results = await Promise.all(promises);
      
      if (results.every(result => result)) {
        setSavedKeys(updatedKeys);
        
        // Show success toast
        toast({
          title: "Settings saved",
          description: "Your Stripe API keys have been saved successfully",
        });
        
        // Clear the form inputs for security
        setPublishableKey("");
        setSecretKey("");
        setWebhookSecret("");
      } else {
        throw new Error("Failed to save some settings");
      }
    } catch (error) {
      console.error("Error saving Stripe keys:", error);
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: "There was an unexpected error saving your Stripe API keys",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Stripe API Keys</CardTitle>
              <CardDescription>
                Configure your Stripe API keys for payment processing
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                testMode 
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              }`}>
                {testMode ? "Test Mode" : "Live Mode"}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleModeToggle}
                disabled={loading}
              >
                Toggle Mode
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg border p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <div className="font-medium">Important Security Notice</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your API keys are securely stored. Never share your secret key and 
              ensure you're using the correct keys based on your environment (test or live).
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="publishable-key">Publishable Key</Label>
                {savedKeys.stripePublishableKey && (
                  <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Check className="h-3 w-3" /> Key Set
                  </span>
                )}
              </div>
              <Input
                id="publishable-key"
                placeholder={`${testMode ? 'pk_test_...' : 'pk_live_...'}`}
                value={publishableKey}
                onChange={(e) => setPublishableKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The publishable key is used in your frontend code
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="secret-key">Secret Key</Label>
                {savedKeys.stripeSecretKey && (
                  <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Check className="h-3 w-3" /> Key Set
                  </span>
                )}
              </div>
              <Input
                id="secret-key"
                type="password"
                placeholder={`${testMode ? 'sk_test_...' : 'sk_live_...'}`}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The secret key is used in your backend code (never expose this in frontend code)
              </p>
            </div>
            
            <div className="flex items-center justify-end mt-6">
              <Button 
                onClick={handleSaveKeys} 
                disabled={loading || (!publishableKey && !secretKey && !webhookSecret)}
              >
                {loading ? "Saving..." : "Save API Keys"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <StripeApiKeysGuide />
    </div>
  );
};

const StripeApiKeysGuide = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Your Stripe API Keys</CardTitle>
        <CardDescription>
          Follow these steps to find and configure your Stripe API keys
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ol className="space-y-4 list-decimal list-inside">
          <li className="pl-2">
            <span className="font-medium">Log in to your Stripe Dashboard</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              Sign in to your Stripe account at <a href="https://dashboard.stripe.com" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center">dashboard.stripe.com <ExternalLink className="h-3 w-3 ml-1" /></a>
            </p>
          </li>
          
          <li className="pl-2">
            <span className="font-medium">Navigate to the API Keys section</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              Go to Developers → API Keys in the Stripe Dashboard
            </p>
          </li>
          
          <li className="pl-2">
            <span className="font-medium">Copy your API keys</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              Copy both the publishable key and secret key
            </p>
          </li>
          
          <li className="pl-2">
            <span className="font-medium">Paste them in the fields above</span>
            <p className="text-sm text-muted-foreground ml-6 mt-1">
              Ensure you're using the correct keys based on your selected mode (test/live)
            </p>
          </li>
        </ol>
        
        <div className="flex justify-center mt-4">
          <a 
            href="https://dashboard.stripe.com/apikeys" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center"
          >
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to Stripe API Keys
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
