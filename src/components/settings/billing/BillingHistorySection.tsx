
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";

interface BillingHistorySectionProps {
  onManageSubscription: () => void;
}

export const BillingHistorySection: React.FC<BillingHistorySectionProps> = ({
  onManageSubscription,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{t("subscription.billing_history", "Billing History")}</h3>
      <Button 
        className="w-full mt-2" 
        variant="outline" 
        size="sm" 
        onClick={onManageSubscription}
      >
        {t("subscription.view_invoices", "View All Invoices")}
      </Button>
    </div>
  );
};
