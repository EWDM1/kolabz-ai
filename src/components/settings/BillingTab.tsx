
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";
import { LoadingState } from "./billing/LoadingState";
import { NoSubscriptionAlert } from "./billing/NoSubscriptionAlert";
import { SubscriptionInfo } from "./billing/SubscriptionInfo";
import { PaymentMethodSection } from "./billing/PaymentMethodSection";
import { BillingHistorySection } from "./billing/BillingHistorySection";
import { useSubscriptionInfo } from "./billing/use-subscription-info";

interface BillingTabProps {
  onManageSubscription: () => void;
  onChangePlan: () => void;
  onUpdatePaymentMethod: () => void;
}

const BillingTab = ({ 
  onManageSubscription, 
  onChangePlan, 
  onUpdatePaymentMethod 
}: BillingTabProps) => {
  const { t } = useLanguage();
  const { 
    subscription, 
    loadingSubscription, 
    isInTrialPeriod, 
    getDaysRemainingInTrial 
  } = useSubscriptionInfo();
  
  if (loadingSubscription) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("subscription.title", "Subscription Plan")}</CardTitle>
          <CardDescription>
            {t("subscription.description", "Current plan and payment information")}
          </CardDescription>
        </CardHeader>
        <LoadingState />
      </Card>
    );
  }
  
  if (!subscription) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("subscription.title", "Subscription Plan")}</CardTitle>
          <CardDescription>
            {t("subscription.description", "Current plan and payment information")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NoSubscriptionAlert onChangePlan={onChangePlan} />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t("subscription.title", "Subscription Plan")}</CardTitle>
        <CardDescription>
          {t("subscription.description", "Current plan and payment information")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SubscriptionInfo 
          subscription={subscription}
          isInTrialPeriod={isInTrialPeriod}
          getDaysRemainingInTrial={getDaysRemainingInTrial}
          onManageSubscription={onManageSubscription}
          onChangePlan={onChangePlan}
        />
        
        <PaymentMethodSection 
          paymentMethodId={subscription.payment_method_id}
          onUpdatePaymentMethod={onUpdatePaymentMethod}
        />
        
        <BillingHistorySection 
          onManageSubscription={onManageSubscription} 
        />
      </CardContent>
    </Card>
  );
};

export default BillingTab;
