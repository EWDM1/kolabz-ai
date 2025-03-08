
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlanTable } from "@/components/admin/subscription/PlanTable";
import { PlanForm } from "@/components/admin/subscription/PlanForm";
import { SubscriptionSettingsCard } from "@/components/admin/subscription/SubscriptionSettingsCard";
import { SubscriptionPlan, useSubscriptionPlans } from "@/hooks/subscription/use-subscription-plans";
import { useStripeProducts } from "@/hooks/subscription/use-stripe-products";
import { cn } from "@/lib/utils";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const SubscriptionManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [planFormOpen, setPlanFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | undefined>(undefined);
  const [stripeConnected, setStripeConnected] = useState(false);
  const navigate = useNavigate();
  
  const {
    plans,
    loading,
    error,
    fetchPlans,
    savePlan,
    togglePlanStatus,
    deletePlan
  } = useSubscriptionPlans();
  
  const {
    loading: stripeLoading,
    syncWithStripe,
    checkStripeStatus
  } = useStripeProducts();
  
  // Check if sidebar is collapsed from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);
  
  // Check Stripe connection status
  useEffect(() => {
    const checkStripe = async () => {
      const connected = await checkStripeStatus();
      setStripeConnected(connected);
    };
    
    checkStripe();
  }, []);
  
  const handleAddPlan = () => {
    setSelectedPlan(undefined);
    setPlanFormOpen(true);
  };
  
  const handleEditPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setPlanFormOpen(true);
  };
  
  const handleSavePlan = async (planData: Partial<SubscriptionPlan>) => {
    await savePlan(planData);
    setPlanFormOpen(false);
  };
  
  const handleSyncWithStripe = async (planId: string) => {
    await syncWithStripe(planId);
    fetchPlans();
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Subscription Management</h1>
              <p className="text-muted-foreground">
                Manage subscription plans, free trials, and billing options
              </p>
            </div>
            
            <Tabs defaultValue="plans">
              <TabsList>
                <TabsTrigger value="plans">Plans</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="plans" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Subscription Plans</h2>
                  <Button onClick={handleAddPlan}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Plan
                  </Button>
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <PlanTable
                  plans={plans}
                  loading={loading}
                  onEdit={handleEditPlan}
                  onDelete={deletePlan}
                  onToggleStatus={togglePlanStatus}
                  onSyncWithStripe={handleSyncWithStripe}
                  stripeEnabled={stripeConnected}
                />
                
                {!stripeConnected && (
                  <Card>
                    <CardContent className="pt-6">
                      <Alert>
                        <AlertTitle>Stripe not fully configured</AlertTitle>
                        <AlertDescription className="flex flex-col gap-2">
                          <p>
                            To enable subscription features, please configure your Stripe API keys.
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-fit"
                            asChild
                          >
                            <Link to="/admin/stripe-settings">
                              Configure Stripe
                            </Link>
                          </Button>
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="settings">
                <SubscriptionSettingsCard 
                  stripeConnected={stripeConnected} 
                  onCheckConnection={checkStripeStatus}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <PlanForm
            open={planFormOpen}
            onOpenChange={setPlanFormOpen}
            onSave={handleSavePlan}
            plan={selectedPlan}
          />
        </main>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
