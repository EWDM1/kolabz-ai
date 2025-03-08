
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/components/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface CurrentPlanCardProps {
  handleCancelSubscription: () => Promise<void>;
  loading: boolean;
}

export const CurrentPlanCard = ({ handleCancelSubscription, loading }: CurrentPlanCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("subscription.current_plan.title", "Current Plan")}</CardTitle>
        <CardDescription>{t("subscription.current_plan.description", "Review your current subscription details")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div>
            <h3 className="font-bold text-lg">{t("subscription.pro_plan", "Pro Plan")}</h3>
            <p className="text-sm text-muted-foreground">{t("subscription.pro_plan.price", "$10.00/month, billed annually")}</p>
          </div>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1">
            <Check className="h-3 w-3" /> {t("subscription.status.active", "Active")}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("subscription.billing_cycle", "Billing cycle")}</span>
            <span className="font-medium">{t("subscription.billing_cycle.annual", "Annual (save 16%)")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("subscription.next_billing", "Next billing date")}</span>
            <span className="font-medium">August 12, 2023</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("subscription.amount_due", "Amount due")}</span>
            <span className="font-medium">$100.00</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button variant="outline" className="w-full" onClick={() => navigate("/change-plan")}>
          {t("subscription.change_plan", "Change Plan")}
        </Button>
        
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
              {t("subscription.cancel", "Cancel Subscription")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Your subscription will remain active until the end of your current billing period on <span className="font-medium">August 12, 2023</span>.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Keep Subscription</Button>
              </DialogClose>
              <Button 
                variant="destructive" 
                onClick={handleCancelSubscription}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Cancellation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
