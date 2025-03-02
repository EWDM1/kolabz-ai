
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeProvider";
import { PaymentMethodFormWrapper } from "@/components/stripe/PaymentMethodForm";
import { isTestMode } from "@/integrations/stripe/stripeConfig";

const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);

  // Extract plan details from location state or default to pro plan
  const planId = state?.planId || "pro";
  const isAnnual = state?.isAnnual !== undefined ? state?.isAnnual : true;

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
    team: {
      name: t("pricing.team.name", "Team"),
      price: isAnnual ? "$240" : "$24",
      period: isAnnual ? "year" : "month",
      description: t("pricing.team.description", "Ideal for teams and businesses"),
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
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate the process with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated successful subscription
      toast({
        title: t("checkout.subscription_active", "Subscription active"),
        description: t("checkout.welcome_message", "Welcome to Kolabz! Your subscription is now active."),
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: t("checkout.subscription_error", "Subscription error"),
        description: t("checkout.try_again", "There was a problem activating your subscription. Please try again."),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            {theme === 'dark' ? (
              <img 
                src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            ) : (
              <img 
                src="/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            )}
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("checkout.back", "Back")}
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Payment form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t("checkout.title", "Complete your purchase")}</h1>
              <p className="text-muted-foreground">
                {t("checkout.subtitle", "You're subscribing to the")} <strong>{selectedPlan.name}</strong> {t("checkout.plan", "plan")}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("checkout.payment_method", "Payment method")}</CardTitle>
              </CardHeader>
              <CardContent>
                {isTestMode() && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-md">
                    <p className="font-medium">{t("checkout.test_mode", "Test Mode")}</p>
                    <p>{t("checkout.test_card", "Use test card: 4242 4242 4242 4242, any future date, any CVC")}</p>
                  </div>
                )}
                <PaymentMethodFormWrapper 
                  onSuccess={handlePaymentSuccess} 
                  onError={handlePaymentError} 
                />
              </CardContent>
            </Card>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 mt-0.5" />
              <p>{t("checkout.security_message", "Your payment information is securely processed by Stripe. We never store your full card details.")}</p>
            </div>
          </div>

          {/* Right column - Order summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{t("checkout.order_summary", "Order summary")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{selectedPlan.name} {t("checkout.subscription", "Subscription")}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {isAnnual ? t("checkout.billed_annually", "Billed annually") : t("checkout.billed_monthly", "Billed monthly")}
                      </p>
                    </div>
                    <span className="font-medium">{selectedPlan.price}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between font-medium">
                    <span>{t("checkout.total", "Total")}</span>
                    <span>{selectedPlan.price}</span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {isAnnual ? 
                      t("checkout.billed_annually_today", "You'll be billed today, and annually thereafter") : 
                      t("checkout.billed_monthly_today", "You'll be billed today, and monthly thereafter")
                    }
                  </div>

                  <div className="pt-2">
                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={handleCheckout}
                      disabled={!paymentMethod || isProcessing}
                    >
                      {isProcessing ? (
                        t("checkout.processing", "Processing...")
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          {t("checkout.complete_purchase", "Complete purchase")}
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-xs text-center text-muted-foreground">
                    {t("checkout.agreement", "By completing your purchase, you agree to our Terms of Service and Privacy Policy.")}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="h-3 w-3" />
                    <p>{t("checkout.powered_by_stripe", "Payments securely processed by Stripe")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
