
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface PaymentMethodSectionProps {
  paymentMethodId: string | null;
  onUpdatePaymentMethod: () => void;
}

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  paymentMethodId,
  onUpdatePaymentMethod,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{t("subscription.payment_method", "Payment Method")}</h3>
      {paymentMethodId ? (
        <div className="flex items-center p-3 bg-muted rounded-md border">
          <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{t("subscription.card.ending", "Card ending in")} ****</p>
            <p className="text-xs text-muted-foreground">{t("subscription.card.expires", "Expires")} **/**</p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-muted rounded-md border">
          <p className="text-sm text-muted-foreground">{t("subscription.no_payment_method", "No payment method on file")}</p>
        </div>
      )}
      <Button variant="outline" size="sm" className="mt-2" onClick={onUpdatePaymentMethod}>
        {t("subscription.update_payment", "Update Payment Method")}
      </Button>
    </div>
  );
};
