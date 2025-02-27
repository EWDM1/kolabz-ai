
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free Trial",
      price: { monthly: "$0", annual: "$0" },
      description: "Test drive Kolabz with limited features",
      features: [
        { text: "10 prompt optimizations", included: true },
        { text: "Basic LLM support", included: true },
        { text: "Save up to 5 prompts", included: true },
        { text: "Community templates", included: true },
        { text: "Advanced optimization features", included: false },
        { text: "Team collaboration", included: false },
        { text: "API access", included: false },
      ],
      ctaText: "Start Free Trial",
      ctaLink: "/signup",
      highlighted: false,
    },
    {
      name: "Pro",
      price: { monthly: "$10", annual: "$100" },
      description: "Perfect for individual creators and professionals",
      features: [
        { text: "Unlimited prompt optimizations", included: true },
        { text: "All LLM models supported", included: true },
        { text: "Unlimited prompt library", included: true },
        { text: "Advanced customization", included: true },
        { text: "1-click export to any platform", included: true },
        { text: "Basic analytics", included: true },
        { text: "Priority support", included: false },
      ],
      ctaText: "Subscribe Now",
      ctaLink: "/signup?plan=pro",
      highlighted: true,
      savings: "$20/year",
    },
    {
      name: "Team",
      price: { monthly: "$24", annual: "$240" },
      description: "Ideal for teams and businesses",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Team workspaces", included: true },
        { text: "Collaboration features", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom templates", included: true },
        { text: "API access", included: true },
        { text: "Dedicated support", included: true },
      ],
      ctaText: "Subscribe Now",
      ctaLink: "/signup?plan=team",
      highlighted: false,
      savings: "$48/year",
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Choose the plan that's right for you. All plans include a 7-day free trial.
            No credit card required to start.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 bg-gray-200"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Annual <span className="text-primary font-medium">Save 16%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden border transition-all-200 ${
                plan.highlighted
                  ? "border-primary shadow-xl relative transform md:-translate-y-4"
                  : "border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold py-1 px-3 rounded-bl">
                  Most Popular
                </div>
              )}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-display font-bold">{plan.name}</h3>
                  {plan.savings && isAnnual && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      Save {plan.savings}
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl md:text-4xl font-display font-bold">
                      {isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-gray-500 ml-2">{isAnnual ? "/year" : "/month"}</span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                </div>
                <Button
                  className={`w-full mb-8 ${
                    plan.highlighted ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link to={plan.ctaLink}>{plan.ctaText}</Link>
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300" />
                        )}
                      </div>
                      <span className={feature.included ? "" : "text-gray-400"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            All plans include a 7-day free trial. No credit card required to start.
            Cancel anytime. If you're not satisfied, contact us within 30 days for a full refund.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
