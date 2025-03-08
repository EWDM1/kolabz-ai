
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";
import { SubscriptionLayout } from "@/components/subscription/SubscriptionLayout";
import { TestModeSection } from "@/components/subscription/TestModeSection";
import { SubscriptionCardsGrid } from "@/components/subscription/SubscriptionCardsGrid";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ManageSubscription = () => {
  const { t } = useLanguage();
  const { isAdmin, isSuperAdmin } = useAuth();
  
  // Admin check for test mode visibility
  const canAccessTestMode = isAdmin || isSuperAdmin;
  
  // Use the subscription hook
  const {
    loading,
    testMode,
    paymentMethod,
    handleToggleTestMode,
    handleUpdateCard,
    handleCancelSubscription,
    handlePaymentError,
    handleDownloadInvoice,
    openCustomerPortal
  } = useSubscription();

  return (
    <SubscriptionLayout
      title={t("subscription.title", "Manage Subscription")}
      description={t("subscription.description", "Manage your plan, billing information and view payment history")}
    >
      {/* Test Mode Toggle for Admin/SuperAdmin */}
      <TestModeSection 
        testMode={testMode} 
        onToggle={handleToggleTestMode} 
        canAccessTestMode={canAccessTestMode} 
      />
      
      {/* Stripe Customer Portal Button */}
      <div className="flex justify-center mb-6">
        <Button 
          onClick={openCustomerPortal} 
          disabled={loading} 
          className="gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          {t("subscription.manage_in_stripe", "Manage Billing in Stripe Portal")}
        </Button>
      </div>
      
      {/* Subscription Cards */}
      <SubscriptionCardsGrid 
        handleCancelSubscription={handleCancelSubscription}
        handleUpdateCard={handleUpdateCard}
        handlePaymentError={handlePaymentError}
        handleDownloadInvoice={handleDownloadInvoice}
        paymentMethod={paymentMethod}
        loading={loading}
      />
    </SubscriptionLayout>
  );
};

export default ManageSubscription;
