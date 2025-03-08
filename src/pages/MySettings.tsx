
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  Mail,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Palette,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/settings/DashboardHeader";
import AccountTab from "@/components/settings/AccountTab";
import SecurityTab from "@/components/settings/SecurityTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import AppearanceTab from "@/components/settings/AppearanceTab";
import BillingTab from "@/components/settings/BillingTab";
import HelpSupportFooter from "@/components/settings/HelpSupportFooter";

const MySettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    });
  };

  const handleChangePassword = () => {
    // Password validation is now handled in the SecurityTab component
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your display preferences have been updated",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleManageSubscription = () => {
    navigate("/manage-subscription");
  };

  const handleChangePlan = () => {
    navigate("/change-plan");
  };

  const handleUpdatePaymentMethod = () => {
    navigate("/manage-subscription");
  };

  return (
    <div className="min-h-screen bg-background/95">
      <DashboardHeader 
        userName={user?.name || "John Doe"} 
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <DashboardSidebar 
              handleNavigation={handleNavigation}
              handleLogout={handleLogout}
              activePage="settings"
            />
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <h1 className="text-2xl font-bold mb-6">My Settings</h1>

            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="bg-background border">
                <TabsTrigger value="account" className="data-[state=active]:bg-primary/10">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-primary/10">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-primary/10">
                  <Palette className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="data-[state=active]:bg-primary/10">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Billing</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Account Tab */}
              <TabsContent value="account">
                <AccountTab onSaveProfile={handleSaveProfile} />
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security">
                <SecurityTab onChangePassword={handleChangePassword} />
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <NotificationsTab onSaveNotifications={handleSaveNotifications} />
              </TabsContent>
              
              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <AppearanceTab onSaveAppearance={handleSaveAppearance} />
              </TabsContent>
              
              {/* Billing Tab */}
              <TabsContent value="billing">
                <BillingTab 
                  onManageSubscription={handleManageSubscription}
                  onChangePlan={handleChangePlan}
                  onUpdatePaymentMethod={handleUpdatePaymentMethod}
                />
              </TabsContent>
            </Tabs>
            
            {/* Help & Support Footer */}
            <HelpSupportFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySettings;
