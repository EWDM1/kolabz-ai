
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSubscription } from "@/hooks/use-subscription";
import { useAuth } from "@/components/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/LanguageContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const { openCustomerPortal, loading } = useSubscription();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [subscription, setSubscription] = useState<any>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;
      
      try {
        setLoadingSubscription(true);
        
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();
        
        if (error) throw error;
        
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoadingSubscription(false);
      }
    };
    
    fetchSubscription();
  }, [user]);
  
  if (loadingSubscription) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("subscription.title", "Subscription Plan")}</CardTitle>
          <CardDescription>
            {t("subscription.description", "Current plan and payment information")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">{t("subscription.loading", "Loading subscription details...")}</p>
          </div>
        </CardContent>
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
          <p className="text-sm text-muted-foreground mb-4">
            {t("subscription.next_billing", "Next billing date")}: {
              subscription.current_period_end ? 
              new Date(subscription.current_period_end).toLocaleDateString() : 
              "N/A"
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
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{t("subscription.payment_method", "Payment Method")}</h3>
          {subscription.payment_method_id ? (
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
      </CardContent>
    </Card>
  );
};

export default BillingTab;
