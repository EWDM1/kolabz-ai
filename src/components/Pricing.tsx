
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import PlanCard from "@/components/subscription/PlanCard";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const plans = [
    {
      name: t("pricing.pro.name", "Pro"),
      price: { monthly: "$10", annual: "$100" },
      description: t("pricing.pro.description", "Perfect for individual creators and professionals"),
      features: [
        { text: t("pricing.features.unlimited_opt", "Unlimited prompt optimizations"), included: true },
        { text: t("pricing.features.save_prompts", "Save Up to 100 Prompts"), included: true },
        { text: t("pricing.features.all_templates", "Access to all templates"), included: true },
        { text: t("pricing.features.export", "1-click export to any platform"), included: true },
        { text: t("pricing.features.priority", "Priority support"), included: false },
      ],
      ctaText: t("pricing.cta.subscribe", "Subscribe Now"),
      id: "pro",
      highlighted: true,
      savings: t("pricing.savings.pro", "$20/year"),
      isAvailable: true,
    },
    {
      name: t("pricing.elite.name", "Elite"),
      price: { monthly: "$24", annual: "$240" },
      description: t("pricing.elite.description", "Ideal for power users and small teams"),
      features: [
        { text: t("pricing.features.everything", "Everything in Pro"), included: true },
        { text: t("pricing.features.save_prompts_elite", "Save Up to 300 Prompts"), included: true },
        { text: t("pricing.features.ai_assistant", "AI writing assistant"), included: true },
        { text: t("pricing.features.advanced_customization", "Advanced customization options"), included: true },
        { text: t("pricing.features.dedicated", "Dedicated support"), included: true },
      ],
      ctaText: t("pricing.cta.subscribe", "Subscribe Now"),
      id: "elite",
      highlighted: false,
      savings: t("pricing.savings.elite", "$48/year"),
      isAvailable: true,
    },
  ];

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    
    // Navigate to checkout with selected plan
    navigate("/checkout", { 
      state: { 
        planId: planId,
        isAnnual: isAnnual
      } 
    });
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-b from-background/95 to-background">
      <div className="container px-4 mx-auto">
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
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className={`${plan.highlighted ? "md:-mt-4" : ""}`}>
              <PlanCard
                id={plan.id}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                savings={plan.savings}
                isSelected={selectedPlan === plan.id}
                isAnnual={isAnnual}
                onSelect={handlePlanSelection}
              />
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-bl">
                  {t("pricing.most_popular", "Most Popular")}
                </div>
              )}
              {!plan.isAvailable && (
                <div className="absolute top-0 right-0 bg-muted-foreground text-background text-xs font-bold py-1 px-3 rounded-bl">
                  {t("hero.comingSoon", "Coming Soon")}
                </div>
              )}
            </div>
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
