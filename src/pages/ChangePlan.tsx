
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useChangePlan } from "@/hooks/use-change-plan";
import PlanCard from "@/components/subscription/PlanCard";
import BillingToggle from "@/components/subscription/BillingToggle";
import PlanConfirmation from "@/components/subscription/PlanConfirmation";
import ChangePlanHeader from "@/components/subscription/ChangePlanHeader";
import TestModeAlert from "@/components/subscription/TestModeAlert";
import SupportSection from "@/components/subscription/SupportSection";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ChangePlan = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAdmin, isSuperAdmin, user } = useAuth();
  
  const canAccessTestMode = isAdmin || isSuperAdmin;
  
  const {
    selectedPlan,
    setSelectedPlan,
    isAnnual,
    setIsAnnual,
    loading,
    testMode,
    handleToggleTestMode,
    handleChangePlan,
    getPlanDetails
  } = useChangePlan();
  
  const planDetails = getPlanDetails();

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

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
            {canAccessTestMode && (
              <Button 
                variant={testMode ? "outline" : "ghost"}
                size="sm" 
                onClick={handleToggleTestMode}
                className={testMode ? "border-orange-300 text-orange-600" : ""}
              >
                {testMode ? "Test Mode" : "Live Mode"}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2 cursor-pointer ml-2">
              <span className="text-sm font-medium hidden md:inline-block">
                {user?.name || "John Doe"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <DashboardSidebar 
              handleNavigation={handleNavigation}
              handleLogout={handleLogout}
              activePage="subscription"
            />
          </div>

          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <ChangePlanHeader 
              testMode={testMode}
              canAccessTestMode={canAccessTestMode}
              onToggleTestMode={handleToggleTestMode}
            />
            
            <h1 className="text-2xl font-bold mb-2">Change Plan</h1>
            <p className="text-muted-foreground mb-6">Compare plans and select the option that's right for you</p>
            
            <TestModeAlert 
              testMode={testMode}
              canAccessTestMode={canAccessTestMode}
            />
            
            <BillingToggle 
              isAnnual={isAnnual}
              setIsAnnual={setIsAnnual}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planDetails.map((plan) => (
                <PlanCard 
                  key={plan.id}
                  id={plan.id}
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  savings={plan.savings}
                  isSelected={selectedPlan === plan.id}
                  isAnnual={isAnnual}
                  onSelect={setSelectedPlan}
                />
              ))}
            </div>
            
            <PlanConfirmation 
              selectedPlan={selectedPlan}
              loading={loading}
              onConfirm={handleChangePlan}
            />
            
            <SupportSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePlan;
