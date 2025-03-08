
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import { 
  isTestMode, 
  toggleStripeTestMode 
} from "@/integrations/stripe/stripeConfig";
import { 
  cancelSubscription, 
  formatCardDetails
} from "@/integrations/stripe/stripeService";
import { HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { CurrentPlanCard } from "@/components/subscription/CurrentPlanCard";
import { PaymentMethodCard } from "@/components/subscription/PaymentMethodCard";
import { BillingHistoryCard } from "@/components/subscription/BillingHistoryCard";
import { FAQCard } from "@/components/subscription/FAQCard";

const ManageSubscription = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { isAdmin, isSuperAdmin, user } = useAuth();
  const [testMode, setTestMode] = useState(isTestMode());
  const { theme } = useTheme();
  
  // Admin check for test mode visibility
  const canAccessTestMode = isAdmin || isSuperAdmin;
  
  // Mock payment method data - in a real app, this would come from your backend
  const [paymentMethod, setPaymentMethod] = useState({
    last4: '4242',
    expiry: '12/24'
  });

  const handleLogout = () => {
    toast({
      title: t("logout.title", "Logged out"),
      description: t("logout.description", "You have been successfully logged out"),
    });
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const handleToggleTestMode = () => {
    const newMode = !testMode;
    toggleStripeTestMode(newMode);
    setTestMode(newMode);
    
    toast({
      title: newMode ? "Test Mode Enabled" : "Live Mode Enabled",
      description: newMode 
        ? "You are now using Stripe in test mode. No real charges will be made." 
        : "Warning: You are now using Stripe in live mode. Real charges will be made.",
      variant: newMode ? "default" : "destructive",
    });
  };
  
  const handleUpdateCard = async (paymentMethod: any) => {
    setLoading(true);
    
    try {
      // In a real implementation, you would send this payment method to your backend
      console.log("Payment method updated:", paymentMethod);
      
      // Update local state with new card details
      setPaymentMethod({
        last4: paymentMethod.card.last4,
        expiry: `${paymentMethod.card.exp_month.toString().padStart(2, '0')}/${paymentMethod.card.exp_year.toString().slice(-2)}`
      });
      
      toast({
        title: t("payment.updated.title", "Card updated"),
        description: t("payment.updated.description", "Your payment method has been updated successfully"),
      });
    } catch (error) {
      console.error("Error updating payment method:", error);
      toast({
        variant: "destructive",
        title: "Error updating card",
        description: "There was a problem updating your payment method. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    
    try {
      // Call the cancellation service
      const result = await cancelSubscription();
      
      if (result.success) {
        toast({
          title: "Subscription Cancelled",
          description: "Your subscription has been cancelled successfully. You will have access until the end of your billing period.",
        });
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast({
        variant: "destructive",
        title: "Error cancelling subscription",
        description: "There was a problem cancelling your subscription. Please try again or contact support.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error);
    toast({
      variant: "destructive",
      title: "Payment Error",
      description: error.message || "There was a problem processing your payment. Please try again.",
    });
  };

  const handleDownloadInvoice = (invoiceDate: string) => {
    toast({
      title: t("invoice.download.title", "Invoice downloaded"),
      description: t("invoice.download.description", `Invoice for ${invoiceDate} has been downloaded`),
    });
  };

  return (
    <div className="min-h-screen bg-background/95">
      {/* Dashboard header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            {theme === 'dark' ? (
              <img 
                src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            ) : (
              <img 
                src="/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            )}
          </Link>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
            {canAccessTestMode && (
              <Button
                variant={testMode ? "outline" : "ghost"}
                size="sm"
                onClick={handleToggleTestMode}
                className={testMode ? "border-orange-300 text-orange-600" : ""}
              >
                {testMode ? "Test Mode" : "Live Mode"}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2 cursor-pointer ml-2">
              <span className="text-sm font-medium hidden md:inline-block">
                {user?.name || "John Doe"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <DashboardSidebar 
              handleNavigation={handleNavigation}
              handleLogout={handleLogout}
              activePage="subscription"
            />
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <h1 className="text-2xl font-bold mb-2">{t("subscription.title", "Manage Subscription")}</h1>
            <p className="text-muted-foreground mb-6">{t("subscription.description", "Manage your plan, billing information and view payment history")}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current plan card */}
              <CurrentPlanCard 
                handleCancelSubscription={handleCancelSubscription}
                loading={loading}
              />
              
              {/* Payment method card */}
              <PaymentMethodCard 
                paymentMethod={paymentMethod}
                handleUpdateCard={handleUpdateCard}
                handlePaymentError={handlePaymentError}
              />
            </div>
            
            {/* Billing history card */}
            <BillingHistoryCard handleDownloadInvoice={handleDownloadInvoice} />
            
            {/* FAQ Card */}
            <FAQCard />
            
            {/* Help & Support Footer */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Need help?</span>
                </div>
                <Button variant="link" size="sm" asChild>
                  <Link to="/help-support">Visit Help & Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;
