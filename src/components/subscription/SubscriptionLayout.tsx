
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import DashboardHeader from "@/components/settings/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import HelpSupportFooter from "@/components/settings/HelpSupportFooter";

interface SubscriptionLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const SubscriptionLayout = ({ 
  children, 
  title, 
  description 
}: SubscriptionLayoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

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
              activePage="subscription"
            />
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground mb-6">{description}</p>
            
            {children}
            
            {/* Help & Support Footer */}
            <HelpSupportFooter />
          </div>
        </div>
      </div>
    </div>
  );
};
