
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";
import { StripeApiKeysTab } from "@/components/admin/stripe-settings/StripeApiKeysTab";
import { StripeWebhooksTab } from "@/components/admin/stripe-settings/StripeWebhooksTab";
import { StripeTestingTab } from "@/components/admin/stripe-settings/StripeTestingTab";
import { StripeSettingsProvider, useStripeSettings } from "@/components/admin/stripe-settings/StripeSettingsContext";

const StripeSettings = () => {
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
    <StripeSettingsProvider>
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
                <h1 className="text-3xl font-bold">Stripe Integration</h1>
                <p className="text-muted-foreground">
                  Configure your Stripe API keys and webhook settings
                </p>
              </div>
              
              <StripeSettingsTabs />
            </div>
          </main>
        </div>
      </div>
    </StripeSettingsProvider>
  );
};

const StripeSettingsTabs = () => {
  const { testMode, loading, savedKeys, setSavedKeys, handleModeToggle } = useStripeSettings();

  return (
    <Tabs defaultValue="settings">
      <TabsList>
        <TabsTrigger value="settings">API Keys</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        <TabsTrigger value="testing">Testing</TabsTrigger>
      </TabsList>
      
      <TabsContent value="settings" className="space-y-6">
        <StripeApiKeysTab 
          testMode={testMode}
          savedKeys={savedKeys}
          loading={loading}
          handleModeToggle={handleModeToggle}
          setSavedKeys={setSavedKeys}
        />
      </TabsContent>
      
      <TabsContent value="webhooks" className="space-y-6">
        <StripeWebhooksTab 
          savedKeys={savedKeys} 
          loading={loading}
          setSavedKeys={setSavedKeys}
        />
      </TabsContent>
      
      <TabsContent value="testing" className="space-y-6">
        <StripeTestingTab />
      </TabsContent>
    </Tabs>
  );
};

export default StripeSettings;
