
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface NoSubscriptionAlertProps {
  onChangePlan: () => void;
}

export const NoSubscriptionAlert: React.FC<NoSubscriptionAlertProps> = ({ onChangePlan }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <Alert variant="default">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{t("subscription.no_active_plan.title", "No active subscription")}</AlertTitle>
        <AlertDescription>
          {t("subscription.no_active_plan.description", "You don't have an active subscription plan.")}
        </AlertDescription>
      </Alert>
      
      <Button 
        variant="default" 
        onClick={onChangePlan}
        className="w-full"
      >
        {t("subscription.choose_plan", "Choose a Plan")}
      </Button>
    </div>
  );
};
