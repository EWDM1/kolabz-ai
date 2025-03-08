
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";
import { isTestMode, getPublishableKey, isStripeConfigured } from "@/integrations/stripe/stripeConfig";
import { supabase } from "@/integrations/supabase/client";

export const useCheckout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [stripeReady, setStripeReady] = useState(false);

  // Extract plan details from location state or default to pro plan
  const planId = state?.planId || "pro";
  const isAnnual = state?.isAnnual !== undefined ? state?.isAnnual : true;

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

  useEffect(() => {
    // If no plan was selected, redirect to pricing
    if (!state || !state.planId) {
      toast({
        title: t("checkout.no_plan_selected", "No plan selected"),
        description: t("checkout.please_select_plan", "Please select a subscription plan first"),
        variant: "destructive",
      });
      navigate("/");
    }
  }, [state, navigate, toast, t]);

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
      
      // In a real implementation, you would call your backend API to create a subscription
      // For demo, we'll create a record in a subscriptions table
      
      const subscriptionData = {
        user_id: user.id,
        plan_id: planId,
        is_annual: isAnnual,
        payment_method_id: paymentMethod.id,
        status: 'active',
        current_period_end: new Date(Date.now() + (isAnnual ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the subscription data that would be created
      console.log("Creating subscription:", subscriptionData);
      
      // Simulated successful subscription
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
    isTestMode: isTestMode,
    handlePaymentSuccess,
    handlePaymentError,
    handleCheckout
  };
};
