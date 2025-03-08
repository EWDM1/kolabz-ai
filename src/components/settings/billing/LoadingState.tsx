
import React from "react";
import { CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageContext";

export const LoadingState: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <CardContent>
      <div className="p-8 text-center">
        <p className="text-sm text-muted-foreground">
          {t("subscription.loading", "Loading subscription details...")}
        </p>
      </div>
    </CardContent>
  );
};
