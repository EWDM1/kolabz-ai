
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";
import { SubscriptionLayout } from "@/components/subscription/SubscriptionLayout";
import { TestModeSection } from "@/components/subscription/TestModeSection";
import { SubscriptionCardsGrid } from "@/components/subscription/SubscriptionCardsGrid";
import { useSubscription } from "@/hooks/use-subscription";

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
    handleDownloadInvoice
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
