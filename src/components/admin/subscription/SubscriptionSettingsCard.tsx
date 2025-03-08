
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Save } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isTestMode, toggleStripeTestMode } from "@/integrations/stripe/stripeConfig";

interface SubscriptionSettingsCardProps {
  stripeConnected: boolean;
  onCheckConnection: () => Promise<boolean>;
}

export function SubscriptionSettingsCard({
  stripeConnected,
  onCheckConnection,
}: SubscriptionSettingsCardProps) {
  const [testMode, setTestMode] = useState(isTestMode());
  const [isChecking, setIsChecking] = useState(false);
  const [isConnected, setIsConnected] = useState(stripeConnected);

  useEffect(() => {
    setIsConnected(stripeConnected);
  }, [stripeConnected]);

  const handleToggleTestMode = () => {
    const newMode = !testMode;
    toggleStripeTestMode(newMode);
    setTestMode(newMode);
  };

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const connected = await onCheckConnection();
      setIsConnected(connected);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Settings</CardTitle>
        <CardDescription>
          Configure Stripe integration and subscription settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="test-mode" className="text-base">Test Mode</Label>
                <p className="text-sm text-muted-foreground">
                  {testMode
                    ? "Using Stripe test environment"
                    : "Using Stripe live environment"}
                </p>
              </div>
              <Switch
                id="test-mode"
                checked={testMode}
                onCheckedChange={handleToggleTestMode}
              />
            </div>
          </div>

          {!isConnected && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Stripe not connected</AlertTitle>
              <AlertDescription>
                Stripe integration is not configured. Please visit the Stripe settings page to configure your API keys.
              </AlertDescription>
            </Alert>
          )}

          {isConnected && (
            <Alert>
              <Check className="h-4 w-4" />
              <AlertTitle>Stripe connected</AlertTitle>
              <AlertDescription>
                Stripe integration is properly configured in {testMode ? "test" : "live"} mode.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={checkConnection}
              disabled={isChecking}
            >
              {isChecking ? "Checking..." : "Check Stripe Connection"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
