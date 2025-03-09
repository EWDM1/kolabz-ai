import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import PlanCard from "@/components/subscription/PlanCard";

interface PricingProps {
  onSelectPlan?: (planId: string, isAnnual: boolean) => void;
  showFreeOption?: boolean;
  inlineStyle?: boolean;
}

const Pricing = ({
  onSelectPlan,
  showFreeOption = true,
  inlineStyle = false
}: PricingProps) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const plans = [
    ...(showFreeOption ? [{
      name: t("pricing.free.name", "Free"),
      price: { monthly: "$0", annual: "$0" },
      description: t("pricing.free.description", "Perfect for trying out the platform"),
      features: [
        { text: t("pricing.features.basic_opt", "Basic prompt optimizations"), included: true },
        { text: t("pricing.features.save_prompts_free", "Save Up to 5 Prompts"), included: true },
        { text: t("pricing.features.export", "Export to clipboard"), included: true },
        { text: t("pricing.features.community_templates", "Community templates"), included: true },
        { text: t("pricing.features.priority", "Priority support"), included: false },
      ],
      id: "free",
      savings: "",
    }] : []),
    {
      name: t("pricing.pro.name", "Pro"),
      price: { monthly: "$10", annual: "$100" },
      description: t("pricing.pro.description", "Perfect for individual creators and professionals"),
      features: [
        { text: t("pricing.features.unlimited_opt", "Unlimited prompt optimizations"), included: true },
        { text: t("pricing.features.save_prompts", "Save Up to 100 Prompts"), included: true },
        { text: t("pricing.features.all_templates", "Access to all templates"), included: true },
        { text: t("pricing.features.export", "1-click export to any platform"), included: true },
        { text: t("pricing.features.datasets", "Access to all prompt datasets"), included: true },
      ],
      id: "pro",
      savings: t("pricing.savings.pro", "$20/year"),
    },
    {
      name: t("pricing.elite.name", "Elite"),
      price: { monthly: "$24", annual: "$240" },
      description: t("pricing.elite.description", "Ideal for power users"),
      features: [
        { text: t("pricing.features.everything", "Everything in Pro"), included: true },
        { text: t("pricing.features.save_prompts_elite", "Save Up to 300 Prompts"), included: true },
        { text: t("pricing.features.ai_assistant", "AI writing assistant"), included: true },
        { text: t("pricing.features.advanced_customization", "Advanced customization options"), included: true },
        { text: t("pricing.features.dedicated", "Dedicated support"), included: true },
      ],
      id: "elite",
      savings: t("pricing.savings.elite", "$48/year"),
    },
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/signup");
      }
      return;
    }

    if (onSelectPlan) {
      onSelectPlan(planId, isAnnual);
    } else {
      // If user is logged in, go directly to checkout
      if (user) {
        navigate("/checkout", { 
          state: { 
            planId: planId,
            isAnnual: isAnnual
          } 
        });
      } else {
        // If user is not logged in, go directly to signup with plan info
        navigate("/signup", { 
          state: { 
            returnUrl: "/checkout",
            planId: planId,
            isAnnual: isAnnual
          } 
        });
      }
    }
  };

  return (
    <section className={inlineStyle ? "" : "py-20 md:py-32 bg-gradient-to-b from-background/95 to-background"}>
      <div className={inlineStyle ? "" : "container px-4 mx-auto"}>
        {!inlineStyle && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              {t("nav.pricing", "Pricing")}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {t("pricing.title", "Simple, transparent pricing")}
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              {t("pricing.description", "Choose the plan that's right for you. All plans include a 7-day free trial.")}
            </p>
          </div>
        )}

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            {t("pricing.toggle.monthly", "Monthly")}
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 bg-muted"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            {t("pricing.toggle.annual", "Annual")} <span className="text-primary font-medium">{t("pricing.save", "Save 16%")}</span>
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              id={plan.id}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              savings={plan.savings}
              isSelected={false}
              isAnnual={isAnnual}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            {t("pricing.disclaimer", "All plans include a 7-day free trial. Cancel anytime. If you're not satisfied, contact us within 30 days for a full refund.")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
