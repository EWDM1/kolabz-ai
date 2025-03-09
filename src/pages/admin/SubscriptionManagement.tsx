
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { PlanTable } from "@/components/admin/subscription/PlanTable";
import { SubscriptionSettingsCard } from "@/components/admin/subscription/SubscriptionSettingsCard";
import { cn } from "@/lib/utils";

const SubscriptionManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  
  // Check the sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Subscription Plans</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage subscription plans for your customers
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => navigate("/admin/stripe-settings")}
                variant="outline"
              >
                Stripe Settings
              </Button>
              <Button
                onClick={() => navigate("/admin/subscription-management/create")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Plan
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <PlanTable
              onEdit={(id) => navigate(`/admin/subscription-management/edit/${id}`)}
            />
            <SubscriptionSettingsCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
