
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/components/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pricing from "@/components/Pricing";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("signup");

  // Check if we have a returnUrl in the location state
  const returnUrl = location.state?.returnUrl || '/datasets';

  // Handle direct checkout
  const handleDirectCheckout = (planId: string, isAnnual: boolean) => {
    navigate("/checkout", { 
      state: { 
        planId: planId,
        isAnnual: isAnnual
      } 
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
        <Link to="/" className="mb-8 inline-block">
          <img 
            src="/lovable-uploads/69364710-57d5-42d2-b6ca-740993198589.png" 
            alt="Kolabz Icon" 
            className="h-16" 
          />
        </Link>
        
        <div className="w-full max-w-4xl space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-4">
              <TabsList>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="pricing">See Pricing</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="signup">
              <div className="relative z-10 rounded-2xl border border-border bg-card p-8 shadow-sm max-w-md mx-auto">
                <AuthForm mode="signup" onSuccess={() => navigate(returnUrl)} />
              </div>
            </TabsContent>
            
            <TabsContent value="pricing">
              <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
                <Pricing onSelectPlan={handleDirectCheckout} showFreeOption={false} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Signup;
