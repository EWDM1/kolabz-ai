
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { PaymentMethodFormWrapper } from "@/components/stripe/PaymentMethodForm";
import { useLanguage } from "@/components/LanguageContext";
import { fetchStripeConfig } from "@/integrations/stripe/stripeConfig";

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
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm rounded-md">
              <p className="font-medium">{t("checkout.stripe_not_configured", "Stripe Not Configured")}</p>
              <p>{t("checkout.demo_mode", "Checkout is running in demo mode. No actual charges will be made.")}</p>
            </div>
          ) : isTestMode ? (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-md">
              <p className="font-medium">{t("checkout.test_mode", "Test Mode")}</p>
              <p>{t("checkout.test_card", "Use test card: 4242 4242 4242 4242, any future date, any CVC")}</p>
            </div>
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
