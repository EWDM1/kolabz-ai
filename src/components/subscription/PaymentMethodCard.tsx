
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { PaymentMethodFormWrapper } from "@/components/stripe/PaymentMethodForm";

interface PaymentMethodCardProps {
  paymentMethod: {
    last4: string;
    expiry: string;
  };
  handleUpdateCard: (paymentMethod: any) => Promise<void>;
  handlePaymentError: (error: any) => void;
}

export const PaymentMethodCard = ({ 
  paymentMethod, 
  handleUpdateCard, 
  handlePaymentError 
}: PaymentMethodCardProps) => {
  const { t } = useLanguage();
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("payment.title", "Payment Method")}</CardTitle>
        <CardDescription>{t("payment.description", "Manage your payment information")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-14 bg-background rounded flex items-center justify-center">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• {paymentMethod.last4}</p>
              <p className="text-xs text-muted-foreground">Expires {paymentMethod.expiry}</p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
            {t("payment.status.default", "Default")}
          </span>
        </div>
        
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              {t("payment.update", "Update Payment Method")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Payment Method</DialogTitle>
              <DialogDescription>
                Enter your new card details below
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <PaymentMethodFormWrapper
                onSuccess={(pm) => {
                  handleUpdateCard(pm);
                  setPaymentDialogOpen(false);
                }}
                onError={handlePaymentError}
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
