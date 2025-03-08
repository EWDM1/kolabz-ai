
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";
import { isTestMode, getPublishableKey, isStripeConfigured } from "@/integrations/stripe/stripeConfig";
import { supabase } from "@/integrations/supabase/client";

// Local storage key for checkout state
const CHECKOUT_STATE_KEY = "kolabz_checkout_state";

export const useCheckout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [stripeReady, setStripeReady] = useState(false);

  // Extract plan details from location state or saved state
  const getSavedState = () => {
    const savedState = localStorage.getItem(CHECKOUT_STATE_KEY);
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        return null;
      }
    }
    return null;
  };
  
  const planId = state?.planId || getSavedState()?.planId || "pro";
  const isAnnual = state?.isAnnual !== undefined ? state?.isAnnual : 
                  getSavedState()?.isAnnual !== undefined ? getSavedState()?.isAnnual : true;

  // Save checkout state for login redirect
  const saveCheckoutState = () => {
    localStorage.setItem(CHECKOUT_STATE_KEY, JSON.stringify({
      planId,
      isAnnual
    }));
  };

  // Clear saved checkout state after successful checkout
  const clearCheckoutState = () => {
    localStorage.removeItem(CHECKOUT_STATE_KEY);
  };

  // Check if Stripe is configured
  useEffect(() => {
    const checkStripeConfig = async () => {
      try {
        const configured = await isStripeConfigured();
        setStripeReady(configured);
        
        if (!configured) {
          console.warn("Stripe is not fully configured. Checkout functionality will be limited.");
        }
      } catch (error) {
        console.error("Error checking Stripe configuration:", error);
      }
    };
    
    checkStripeConfig();
  }, []);

  const planDetails = {
    pro: {
      name: t("pricing.pro.name", "Pro"),
      price: isAnnual ? "$100" : "$10",
      period: isAnnual ? "year" : "month",
      description: t("pricing.pro.description", "Perfect for individual creators and professionals"),
    },
    elite: {
      name: t("pricing.elite.name", "Elite"),
      price: isAnnual ? "$240" : "$24",
      period: isAnnual ? "year" : "month",
      description: t("pricing.elite.description", "Ideal for power users and small teams"),
    },
  };

  const selectedPlan = planDetails[planId as keyof typeof planDetails];

  const handlePaymentSuccess = (paymentMethodObj: any) => {
    setPaymentMethod(paymentMethodObj);
    toast({
      title: t("checkout.payment_method_added", "Payment method added"),
      description: t("checkout.ready_to_subscribe", "You're ready to subscribe"),
    });
  };

  const handlePaymentError = (error: any) => {
    toast({
      title: t("checkout.payment_error", "Payment error"),
      description: error.message || t("checkout.card_error", "There was a problem with your card"),
      variant: "destructive",
    });
  };

  const createSubscription = async (userId: string, paymentMethodId: string) => {
    // Calculate end date based on annual/monthly
    const daysToAdd = isAnnual ? 365 : 30;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + daysToAdd);
    
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        is_annual: isAnnual,
        payment_method_id: paymentMethodId,
        current_period_end: endDate.toISOString()
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error creating subscription:", error);
      throw new Error("Failed to create subscription");
    }
      
    return data;
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      toast({
        title: t("checkout.add_payment_method", "Add payment method"),
        description: t("checkout.please_add_card", "Please add a payment method to continue"),
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Create subscription in database
      await createSubscription(user.id, paymentMethod.id);
      
      // Clear saved checkout state
      clearCheckoutState();
      
      // Notify user of success
      toast({
        title: t("checkout.subscription_active", "Subscription active"),
        description: t("checkout.welcome_message", "Welcome to Kolabz! Your subscription is now active."),
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: t("checkout.subscription_error", "Subscription error"),
        description: t("checkout.try_again", "There was a problem activating your subscription. Please try again."),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    planId,
    isAnnual,
    selectedPlan,
    isProcessing,
    paymentMethod,
    stripeReady,
    isTestMode,
    saveCheckoutState,
    handlePaymentSuccess,
    handlePaymentError,
    handleCheckout
  };
};
