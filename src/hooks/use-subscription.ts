
import { useState, useCallback } from "react";
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
import { supabase } from "@/integrations/supabase/client";

export const useSubscription = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [testMode, setTestMode] = useState(isTestMode());
  
  // Mock payment method data - in a real app, this would come from your backend
  const [paymentMethod, setPaymentMethod] = useState({
    last4: '4242',
    expiry: '12/24'
  });

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

  const openCustomerPortal = useCallback(async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to be logged in to manage your subscription",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: sessionToken, error } = await supabase.auth.getSession();
      
      if (error || !sessionToken.session) {
        throw new Error("Failed to get authentication token");
      }

      const response = await supabase.functions.invoke('create-customer-portal-session', {
        body: { returnUrl: window.location.origin + '/manage-subscription' },
        headers: {
          Authorization: `Bearer ${sessionToken.session.access_token}`
        }
      });

      if (response.error) {
        throw new Error(response.error);
      }

      // Redirect to the Stripe Customer Portal
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast({
        variant: "destructive",
        title: "Failed to open customer portal",
        description: "There was a problem connecting to Stripe. Please try again or contact support.",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  return {
    loading,
    testMode,
    paymentMethod,
    handleToggleTestMode,
    handleUpdateCard,
    handleCancelSubscription,
    handlePaymentError,
    handleDownloadInvoice,
    openCustomerPortal
  };
};
