
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";
import { PlanForm } from "@/components/admin/subscription/PlanForm";
import { useStripeProducts } from "@/hooks/subscription/use-stripe-products";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const SubscriptionPlanEditor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { planId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    loading: stripeLoading, 
    error: stripeError, 
    checkStripeStatus, 
    syncWithStripe 
  } = useStripeProducts();
  
  const [stripeReady, setStripeReady] = useState(false);
  const [syncing, setSyncing] = useState(false);
  
  // Check the sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);
  
  // Check if Stripe is properly configured
  useEffect(() => {
    const verifyStripeStatus = async () => {
      const status = await checkStripeStatus();
      setStripeReady(status);
    };
    
    verifyStripeStatus();
  }, []);
  
  const handleSyncWithStripe = async (id: string) => {
    if (!stripeReady) {
      toast({
        variant: "destructive",
        title: "Stripe Not Configured",
        description: "Please configure Stripe API keys before syncing."
      });
      return;
    }
    
    setSyncing(true);
    
    try {
      await syncWithStripe(id);
      toast({
        title: "Plan Synced",
        description: "The plan has been successfully synced with Stripe."
      });
    } catch (error) {
      console.error("Error syncing with Stripe:", error);
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: "Failed to sync the plan with Stripe."
      });
    } finally {
      setSyncing(false);
    }
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/admin/subscription-management")} 
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Subscription Plans
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {planId ? "Edit Subscription Plan" : "Create Subscription Plan"}
                </h1>
                <p className="text-muted-foreground">
                  {planId 
                    ? "Edit details of an existing subscription plan" 
                    : "Create a new subscription plan for your customers"
                  }
                </p>
              </div>
              
              {planId && (
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">
                    Stripe Status: 
                    {stripeReady ? (
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                        Ready
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700">
                        Not Configured
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={!stripeReady || syncing}
                    onClick={() => handleSyncWithStripe(planId)}
                  >
                    {syncing ? "Syncing..." : "Sync with Stripe"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate("/admin/stripe-settings")}
                  >
                    Stripe Settings
                  </Button>
                </div>
              )}
            </div>
            
            <Card>
              <PlanForm 
                planId={planId}
                onSaveSuccess={(id) => {
                  if (!planId) {
                    navigate(`/admin/subscription-management/edit/${id}`);
                  }
                }} 
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubscriptionPlanEditor;
