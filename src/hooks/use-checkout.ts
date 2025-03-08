
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
  const [planDetails, setPlanDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  // Fetch plan details from database
  useEffect(() => {
    const fetchPlanDetails = async () => {
      setLoading(true);
      try {
        // Get plan details from the subscription_plans table
        const { data, error } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('name', planId.charAt(0).toUpperCase() + planId.slice(1))
          .eq('active', true)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setPlanDetails({
            id: data.id,
            name: data.name,
            price: isAnnual ? formatCurrency(data.price_annual) : formatCurrency(data.price_monthly),
            period: isAnnual ? "year" : "month",
            description: data.description,
            trialDays: data.trial_days,
            stripePriceId: isAnnual ? data.stripe_price_id_annual : data.stripe_price_id_monthly
          });
        } else {
          // Fall back to hardcoded plans if not found in database
          setPlanDetails(fallbackPlanDetails[planId as keyof typeof fallbackPlanDetails]);
        }
      } catch (error) {
        console.error("Error fetching plan details:", error);
        // Fall back to hardcoded plans
        setPlanDetails(fallbackPlanDetails[planId as keyof typeof fallbackPlanDetails]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlanDetails();
  }, [planId, isAnnual]);

  // Format currency for display
  const formatCurrency = (amount: number, currency: string = 'usd') => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    
    return formatter.format(amount / 100);
  };

  // Fallback plan details
  const fallbackPlanDetails = {
    pro: {
      name: t("pricing.pro.name", "Pro"),
      price: isAnnual ? "$100" : "$10",
      period: isAnnual ? "year" : "month",
      description: t("pricing.pro.description", "Perfect for individual creators and professionals"),
      trialDays: 7
    },
    elite: {
      name: t("pricing.elite.name", "Elite"),
      price: isAnnual ? "$240" : "$24",
      period: isAnnual ? "year" : "month",
      description: t("pricing.elite.description", "Ideal for power users and small teams"),
      trialDays: 7
    },
  };

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
    // Calculate trial end date
    const trialDays = planDetails?.trialDays || 7;
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + trialDays);
    
    // Calculate billing period end date (after trial)
    const daysToAdd = isAnnual ? 365 + trialDays : 30 + trialDays;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + daysToAdd);
    
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        is_annual: isAnnual,
        payment_method_id: paymentMethodId,
        trial_end_date: trialEndDate.toISOString(),
        current_period_start: trialEndDate.toISOString(), // Billing starts after trial
        current_period_end: endDate.toISOString(),
        status: 'active'
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
        description: t("checkout.free_trial_message", `Welcome to Kolabz! Your subscription is now active with a ${planDetails?.trialDays || 7}-day free trial.`),
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
    selectedPlan: planDetails,
    isProcessing,
    paymentMethod,
    stripeReady,
    isTestMode,
    loading,
    saveCheckoutState,
    handlePaymentSuccess,
    handlePaymentError,
    handleCheckout
  };
};
