
import { LayoutGrid, MessageSquare, CreditCard, Settings, LogOut, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";

interface DashboardSidebarProps {
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
  activePage?: 'dashboard' | 'prompts' | 'subscription' | 'settings' | 'help';
}

export const DashboardSidebar = ({ 
  handleNavigation, 
  handleLogout,
  activePage = 'dashboard'
}: DashboardSidebarProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  // Colors based on theme
  const bgColor = theme === 'light' ? 'bg-gray-50' : 'bg-[#0F1623]';
  const textColor = theme === 'light' ? 'text-gray-600' : 'text-[#8E9196]';
  const hoverBgColor = theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#19212F]';
  const hoverTextColor = theme === 'light' ? 'hover:text-primary' : 'hover:text-[#33C3F0]';
  const activeBgColor = theme === 'light' ? 'bg-gray-100' : 'bg-[#19212F]';
  const activeTextColor = theme === 'light' ? 'text-primary' : 'text-[#33C3F0]';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-[#1A1F2C]';
  const cardBgColor = theme === 'light' ? 'bg-white' : 'bg-[#19212F]';
  const btnBorderColor = theme === 'light' ? 'border-gray-200' : 'border-[#1A1F2C]';
  const btnBgColor = theme === 'light' ? 'bg-transparent' : 'bg-transparent';
  const btnHoverBgColor = theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#1A1F2C]';
  const btnHoverTextColor = theme === 'light' ? 'hover:text-primary' : 'hover:text-[#33C3F0]';
  
  return (
    <div className={`${bgColor} rounded-lg shadow-sm sticky top-24 ${textColor}`}>
      <div className="p-4">
        <nav className="space-y-2">
          <button
            onClick={() => handleNavigation("/dashboard")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'dashboard' 
                ? `${activeBgColor} ${activeTextColor} font-medium` 
                : `${hoverBgColor} ${hoverTextColor}`
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
            <span>{t("sidebar.dashboard", "My Dashboard")}</span>
          </button>
          <button
            onClick={() => handleNavigation("/prompts")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'prompts' 
                ? `${activeBgColor} ${activeTextColor} font-medium` 
                : `${hoverBgColor} ${hoverTextColor}`
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>{t("sidebar.prompts", "My Prompts")}</span>
          </button>
          <button
            onClick={() => handleNavigation("/manage-subscription")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'subscription' 
                ? `${activeBgColor} ${activeTextColor} font-medium` 
                : `${hoverBgColor} ${hoverTextColor}`
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>{t("sidebar.subscription", "Subscription")}</span>
          </button>
          <button
            onClick={() => handleNavigation("/settings")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'settings' 
                ? `${activeBgColor} ${activeTextColor} font-medium` 
                : `${hoverBgColor} ${hoverTextColor}`
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>{t("sidebar.settings", "Settings")}</span>
          </button>
          <button
            onClick={() => handleNavigation("/help-support")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'help' 
                ? `${activeBgColor} ${activeTextColor} font-medium` 
                : `${hoverBgColor} ${hoverTextColor}`
            }`}
          >
            <HelpCircle className="h-5 w-5" />
            <span>{t("sidebar.help", "Help & Support")}</span>
          </button>
          <button
            onClick={handleLogout}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${hoverBgColor} ${hoverTextColor}`}
          >
            <LogOut className="h-5 w-5" />
            <span>{t("sidebar.logout", "Logout")}</span>
          </button>
        </nav>
      </div>

      <div className={`p-4 border-t ${borderColor}`}>
        <h4 className={`text-xs uppercase tracking-wider mb-3 ${textColor}`}>
          {t("sidebar.subscription_heading", "SUBSCRIPTION")}
        </h4>
        <div className={`${cardBgColor} rounded-md p-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {t("sidebar.plan", "Pro Plan")}
            </span>
            <span className={`text-xs px-3 py-1 ${theme === 'light' ? 'bg-primary/10 text-primary' : 'bg-[#2A6B85] text-[#33C3F0]'} rounded-full`}>
              {t("sidebar.active", "Active")}
            </span>
          </div>
          <div className={`text-xs ${textColor} mb-4`}>
            {t("sidebar.next_billing", "Next billing on Aug 12, 2023")}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full ${textColor} border-${btnBorderColor} ${btnBgColor} ${btnHoverBgColor} ${btnHoverTextColor}`}
            onClick={() => handleNavigation("/manage-subscription")}
          >
            {t("sidebar.manage", "Manage Subscription")}
          </Button>
        </div>
      </div>
    </div>
  );
};
