
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PlanDetails {
  name: string;
  price: string;
  period: string;
  description: string;
  trialDays?: number;
}

interface CheckoutSummaryProps {
  selectedPlan: PlanDetails;
  isAnnual: boolean;
  isProcessing: boolean;
  paymentMethod: any;
  onCheckout: () => void;
  isTestMode?: boolean;
}

const CheckoutSummary = ({
  selectedPlan,
  isAnnual,
  isProcessing,
  paymentMethod,
  onCheckout,
  isTestMode = false
}: CheckoutSummaryProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>{t("checkout.order_summary", "Order summary")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isTestMode && (
            <Alert variant="warning" className="mb-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {t("checkout.test_mode_alert", "This is a test checkout. No actual charges will be made.")}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{selectedPlan.name} {t("checkout.subscription", "Subscription")}</h3>
              <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
              <p className="text-sm text-muted-foreground">
                {isAnnual ? t("checkout.billed_annually", "Billed annually") : t("checkout.billed_monthly", "Billed monthly")}
              </p>
            </div>
            <span className="font-medium">{selectedPlan.price}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between font-medium">
            <span>{t("checkout.total", "Total")}</span>
            <span>{selectedPlan.price}</span>
          </div>

          {selectedPlan.trialDays && selectedPlan.trialDays > 0 && (
            <Alert variant="default" className="bg-primary/10 border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary-foreground">
                {t("checkout.free_trial", "You'll get a {{days}}-day free trial. No charge until the trial ends.", { days: selectedPlan.trialDays })}
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground">
            {isAnnual ? 
              t("checkout.billed_annually_after_trial", "You'll be billed after your free trial ends, and annually thereafter") : 
              t("checkout.billed_monthly_after_trial", "You'll be billed after your free trial ends, and monthly thereafter")
            }
          </div>

          <div className="pt-2">
            <Button 
              className="w-full" 
              size="lg" 
              onClick={onCheckout}
              disabled={!paymentMethod || isProcessing}
            >
              {isProcessing ? (
                t("checkout.processing", "Processing...")
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t("checkout.start_free_trial", "Start Free Trial")}
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            {t("checkout.agreement", "By completing your purchase, you agree to our Terms of Service and Privacy Policy.")}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <p>{t("checkout.powered_by_stripe", "Payments securely processed by Stripe")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutSummary;
