
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { useLanguage } from "@/components/LanguageContext";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";

const Checkout = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    selectedPlan,
    isAnnual,
    isProcessing,
    paymentMethod,
    stripeReady,
    isTestMode,
    handlePaymentSuccess,
    handlePaymentError,
    handleCheckout
  } = useCheckout();

  // Redirect if no plan selected
  useEffect(() => {
    if (!selectedPlan) {
      navigate("/");
    }
  }, [selectedPlan, navigate]);

  if (!selectedPlan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("checkout.back", "Back")}
        </Button>

        <div>
          <h1 className="text-2xl font-bold mb-2">{t("checkout.title", "Complete your purchase")}</h1>
          <p className="text-muted-foreground mb-6">
            {t("checkout.subtitle", "You're subscribing to the")} <strong>{selectedPlan.name}</strong> {t("checkout.plan", "plan")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Payment form */}
          <PaymentMethodSection 
            stripeReady={stripeReady}
            isTestMode={isTestMode()}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />

          {/* Right column - Order summary */}
          <CheckoutSummary 
            selectedPlan={selectedPlan}
            isAnnual={isAnnual}
            isProcessing={isProcessing}
            paymentMethod={paymentMethod}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
