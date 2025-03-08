
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield } from "lucide-react";
import { PaymentMethodFormWrapper } from "@/components/stripe/PaymentMethodForm";
import { useLanguage } from "@/components/LanguageContext";
import { fetchStripeConfig } from "@/integrations/stripe/stripeConfig";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PaymentMethodSectionProps {
  stripeReady: boolean;
  isTestMode: boolean;
  onPaymentSuccess: (paymentMethod: any) => void;
  onPaymentError: (error: any) => void;
}

const PaymentMethodSection = ({
  stripeReady,
  isTestMode,
  onPaymentSuccess,
  onPaymentError
}: PaymentMethodSectionProps) => {
  const { t } = useLanguage();
  const [configStatus, setConfigStatus] = useState<{loaded: boolean, isConfigured: boolean}>({
    loaded: false,
    isConfigured: false
  });
  
  useEffect(() => {
    const checkStripeConfig = async () => {
      try {
        const config = await fetchStripeConfig();
        setConfigStatus({
          loaded: true,
          isConfigured: !!config.publishableKey
        });
      } catch (error) {
        console.error("Error checking Stripe configuration:", error);
        setConfigStatus({
          loaded: true,
          isConfigured: false
        });
      }
    };
    
    checkStripeConfig();
  }, []);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("checkout.payment_method", "Payment method")}</CardTitle>
        </CardHeader>
        <CardContent>
          {!configStatus.loaded ? (
            <div className="p-3 bg-slate-50 dark:bg-slate-900/20 text-slate-800 dark:text-slate-300 text-sm rounded-md">
              <p>{t("checkout.loading", "Loading payment configuration...")}</p>
            </div>
          ) : !configStatus.isConfigured ? (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t("checkout.stripe_not_configured", "Stripe Not Configured")}</AlertTitle>
              <AlertDescription>
                {t("checkout.admin_setup_required", "The payment system requires configuration by an administrator.")}
                <div className="mt-2 text-sm">
                  {t("checkout.demo_mode", "Checkout is running in demo mode. No actual charges will be made.")}
                </div>
              </AlertDescription>
            </Alert>
          ) : isTestMode ? (
            <Alert variant="info" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t("checkout.test_mode", "Test Mode")}</AlertTitle>
              <AlertDescription>
                {t("checkout.test_card", "Use test card: 4242 4242 4242 4242, any future date, any CVC")}
              </AlertDescription>
            </Alert>
          ) : null}
          
          <PaymentMethodFormWrapper 
            onSuccess={onPaymentSuccess} 
            onError={onPaymentError}
            demoMode={!configStatus.isConfigured}
          />
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4 mt-0.5" />
        <p>{t("checkout.security_message", "Your payment information is securely processed by Stripe. We never store your full card details.")}</p>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
