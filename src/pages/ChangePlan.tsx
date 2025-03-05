import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Settings,
  LogOut,
  User,
  ArrowLeft,
  Check,
  CreditCard,
  Sparkles,
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import { 
  isTestMode, 
  toggleStripeTestMode 
} from "@/integrations/stripe/stripeConfig";
import { 
  changeSubscriptionPlan 
} from "@/integrations/stripe/stripeService";
import { LanguageSelector } from "@/components/LanguageSelector";

const ChangePlan = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isAnnual, setIsAnnual] = useState(true);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const { isAdmin, isSuperAdmin } = useAuth();
  const [testMode, setTestMode] = useState(isTestMode());
  
  const canAccessTestMode = isAdmin || isSuperAdmin;

  useEffect(() => {
    console.log("Stripe test mode is", testMode ? "enabled" : "disabled");
  }, [testMode]);

  const handleLogout = () => {
    toast({
      title: t("logout.title", "Logged out"),
      description: t("logout.description", "You have been successfully logged out"),
    });
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
          description: `You have successfully switched to the ${selectedPlan === 'pro' ? 'Pro' : 'Team'} plan.`,
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

  const planDetails = [
    {
      id: "pro",
      name: t("pricing.pro.name", "Pro"),
      price: { monthly: "$10", annual: "$100" },
      description: t("pricing.pro.description", "Perfect for individual creators and professionals"),
      features: [
        { text: t("pricing.features.unlimited_opt", "Unlimited prompt optimizations"), included: true },
        { text: t("pricing.features.unlimited_lib", "Unlimited prompt library"), included: true },
        { text: t("pricing.features.all_templates", "Access to all templates"), included: true },
        { text: t("pricing.features.export", "1-click export to any platform"), included: true },
        { text: t("pricing.features.priority", "Priority support"), included: false },
      ],
      savings: t("pricing.savings.pro", "$20/year"),
    },
    {
      id: "team",
      name: t("pricing.team.name", "Team"),
      price: { monthly: "$24", annual: "$240" },
      description: t("pricing.team.description", "Ideal for teams and businesses"),
      features: [
        { text: t("pricing.features.everything", "Everything in Pro"), included: true },
        { text: t("pricing.features.workspaces", "Team workspaces"), included: true },
        { text: t("pricing.features.collab_features", "Collaboration features"), included: true },
        { text: t("pricing.features.custom", "Custom templates"), included: true },
        { text: t("pricing.features.dedicated", "Dedicated support"), included: true },
      ],
      savings: t("pricing.savings.team", "$48/year"),
    },
  ];

  return (
    <div className="min-h-screen bg-background/95">
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />

            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => handleNavigation("/my-settings")}
            >
              <span className="text-sm font-medium hidden md:inline-block">
                John Doe
              </span>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-prompts")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <ListChecks className="h-5 w-5" />
                    <span>My Prompts</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-settings")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>

              <div className="p-4 border-t border-border">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  SUBSCRIPTION
                </h4>
                <div className="bg-primary/10 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Pro Plan</span>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Next billing on Aug 12, 2023
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs bg-card"
                    onClick={() => handleNavigation("/manage-subscription")}
                  >
                    Manage Subscription
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate("/manage-subscription")} className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Subscription
              </Button>
              
              {canAccessTestMode && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleToggleTestMode}
                  className={`gap-1 ${testMode ? 'border-orange-300 text-orange-600 hover:text-orange-700 hover:border-orange-400 dark:border-orange-800 dark:text-orange-500' : ''}`}
                >
                  {testMode ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  {testMode ? 'Test Mode' : 'Live Mode'}
                </Button>
              )}
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Change Plan</h1>
            <p className="text-muted-foreground mb-6">Compare plans and select the option that's right for you</p>
            
            {testMode && canAccessTestMode && (
              <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300 p-4 rounded-lg mb-6 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Stripe Test Mode Active</h3>
                  <p className="text-sm mt-1">
                    You're currently in test mode. No real charges will be made when changing plans.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-start space-x-4 mb-8">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planDetails.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`${selectedPlan === plan.id ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{plan.name}</CardTitle>
                      {isAnnual && plan.savings && (
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {t("pricing.save_amount", "Save")} {plan.savings}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">
                        {isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground ml-2 text-sm">
                        {isAnnual ? "/year" : "/month"}
                      </span>
                    </div>
                    <CardDescription className="mt-1.5">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2">
                            {feature.included ? (
                              <Check className="h-4 w-4 text-primary" />
                            ) : (
                              <span className="h-4 w-4 text-muted-foreground/30">✕</span>
                            )}
                          </div>
                          <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground/60'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Selected
                        </>
                      ) : (
                        "Select Plan"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-card border border-border rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium">Confirm your plan change</h3>
                  <p className="text-muted-foreground">
                    {selectedPlan === "pro" ? (
                      "You're selecting the Pro plan, perfect for individual use and small projects."
                    ) : (
                      "You're upgrading to the Team plan with all premium features included."
                    )}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Your card ending in 4242 will be charged on Aug 12, 2023
                  </div>
                </div>
                <Button 
                  size="lg" 
                  onClick={handleChangePlan}
                  className="w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Confirm Plan Change
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg">
              <h3 className="font-medium">Questions about changing plans?</h3>
              <p className="text-sm mt-1">
                If you need help choosing the right plan or have billing questions, our support team is ready to assist at{" "}
                <a href="mailto:support@kolabz.com" className="text-primary hover:underline">
                  support@kolabz.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePlan;
