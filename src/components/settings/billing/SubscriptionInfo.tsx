
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useSubscription } from "@/hooks/use-subscription";

interface SubscriptionInfoProps {
  subscription: any;
  isInTrialPeriod: () => boolean;
  getDaysRemainingInTrial: () => number;
  onManageSubscription: () => void;
  onChangePlan: () => void;
}

export const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({
  subscription,
  isInTrialPeriod,
  getDaysRemainingInTrial,
  onManageSubscription,
  onChangePlan,
}) => {
  const { t } = useLanguage();
  const { openCustomerPortal, loading } = useSubscription();

  return (
    <div className="bg-muted rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-medium">{subscription.plan_id || "Pro Plan"}</h3>
          <p className="text-primary font-medium text-lg">
            {subscription.is_annual ? "$10.00/month (billed annually)" : "$10.00/month"}
          </p>
        </div>
        <span className="text-sm px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
          {t("subscription.status.active", "Active")}
        </span>
      </div>
      
      {isInTrialPeriod() && (
        <Alert className="mb-4 bg-primary/10 border-primary/20">
          <AlertTitle className="text-primary-foreground">
            {t("subscription.free_trial", "Free Trial")}
          </AlertTitle>
          <AlertDescription className="text-primary-foreground">
            {t("subscription.trial_remaining", `You have ${getDaysRemainingInTrial()} days remaining in your free trial`)}
          </AlertDescription>
        </Alert>
      )}
      
      <p className="text-sm text-muted-foreground mb-4">
        {isInTrialPeriod() 
          ? t("subscription.trial_until", `Free trial until: ${new Date(subscription.trial_end_date).toLocaleDateString()}`) 
          : t("subscription.next_billing", `Next billing date: ${new Date(subscription.current_period_end).toLocaleDateString()}`)
        }
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onManageSubscription}>
          {t("subscription.manage", "Manage Subscription")}
        </Button>
        <Button variant="outline" onClick={onChangePlan}>
          {t("subscription.change_plan", "Change Plan")}
        </Button>
        <Button 
          variant="default" 
          onClick={openCustomerPortal}
          disabled={loading}
          className="gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          {t("subscription.billing_portal", "Stripe Billing Portal")}
        </Button>
      </div>
    </div>
  );
};
