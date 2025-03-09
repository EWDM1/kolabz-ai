
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import LoginCheckoutPrompt from "@/components/checkout/LoginCheckoutPrompt";

const Checkout = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const {
    selectedPlan,
    isAnnual,
    isProcessing,
    paymentMethod,
    stripeReady,
    isTestMode,
    saveCheckoutState,
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
  
  // Save checkout state for after login
  useEffect(() => {
    if (selectedPlan && !user && !isRedirecting) {
      saveCheckoutState();
    }
  }, [selectedPlan, user, isRedirecting, saveCheckoutState]);

  // Handle login/signup redirection
  const handleLoginRedirect = () => {
    setIsRedirecting(true);
    navigate("/login", { state: { returnUrl: "/checkout" } });
  };

  const handleSignupRedirect = () => {
    setIsRedirecting(true);
    navigate("/signup", { state: { returnUrl: "/checkout" } });
  };

  if (!selectedPlan) {
    return null;
  }

  // If no user is logged in, show login/signup prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("checkout.back", "Back")}
          </Button>
          
          <LoginCheckoutPrompt 
            planName={selectedPlan.name} 
            onLoginClick={handleLoginRedirect} 
            onSignupClick={handleSignupRedirect}
          />
        </div>
      </div>
    );
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
