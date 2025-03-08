
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";
import { 
  isTestMode, 
  toggleStripeTestMode 
} from "@/integrations/stripe/stripeConfig";
import { 
  changeSubscriptionPlan 
} from "@/integrations/stripe/stripeService";

export const useChangePlan = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isAnnual, setIsAnnual] = useState(true);
  const [loading, setLoading] = useState(false);
  const [testMode, setTestMode] = useState(isTestMode());
  
  useEffect(() => {
    console.log("Stripe test mode is", testMode ? "enabled" : "disabled");
  }, [testMode]);

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

  const handleChangePlan = async () => {
    setLoading(true);
    
    try {
      const result = await changeSubscriptionPlan(selectedPlan, isAnnual);
      
      if (result.success) {
        toast({
          title: "Plan updated",
          description: `You have successfully switched to the ${selectedPlan === 'pro' ? 'Pro' : 'Elite'} plan.`,
        });
        
        navigate("/manage-subscription");
      }
    } catch (error) {
      console.error("Error changing plan:", error);
      toast({
        variant: "destructive",
        title: "Error changing plan",
        description: "There was a problem changing your subscription plan. Please try again or contact support.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPlanDetails = () => {
    return [
      {
        id: "pro",
        name: t("pricing.pro.name", "Pro"),
        price: { monthly: "$10", annual: "$100" },
        description: t("pricing.pro.description", "Perfect for individual creators and professionals"),
        features: [
          { text: t("pricing.features.unlimited_opt", "Unlimited prompt optimizations"), included: true },
          { text: t("pricing.features.unlimited_lib", "Save Up to 100 prompts"), included: true },
          { text: t("pricing.features.all_templates", "Access to all templates"), included: true },
          { text: t("pricing.features.export", "1-click export to any platform"), included: true },
          { text: t("pricing.features.priority", "Priority support"), included: false },
        ],
        savings: t("pricing.savings.pro", "$20/year"),
      },
      {
        id: "elite",
        name: t("pricing.elite.name", "Elite"),
        price: { monthly: "$24", annual: "$240" },
        description: t("pricing.elite.description", "Ideal for power users and small teams"),
        features: [
          { text: t("pricing.features.everything", "Everything in Pro"), included: true },
          { text: t("pricing.features.save_prompts_elite", "Save Up to 300 prompts"), included: true },
          { text: t("pricing.features.ai_assistant", "AI writing assistant"), included: true },
          { text: t("pricing.features.advanced_customization", "Advanced customization options"), included: true },
          { text: t("pricing.features.dedicated", "Dedicated support"), included: true },
        ],
        savings: t("pricing.savings.elite", "$48/year"),
      },
    ];
  };

  return {
    selectedPlan,
    setSelectedPlan,
    isAnnual,
    setIsAnnual,
    loading,
    testMode,
    handleToggleTestMode,
    handleChangePlan,
    getPlanDetails
  };
};
