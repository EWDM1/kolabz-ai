
import { LayoutGrid, MessageSquare, CreditCard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
  activePage?: 'dashboard' | 'prompts' | 'subscription' | 'settings';
}

export const DashboardSidebar = ({ 
  handleNavigation, 
  handleLogout,
  activePage = 'dashboard'
}: DashboardSidebarProps) => {
  return (
    <div className="bg-[#0F1623] rounded-lg shadow-sm sticky top-24 text-[#8E9196]">
      <div className="p-4">
        <nav className="space-y-2">
          <button
            onClick={() => handleNavigation("/my-dashboard")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'dashboard' 
                ? 'bg-[#19212F] text-[#33C3F0] font-medium' 
                : 'hover:bg-[#19212F] hover:text-[#33C3F0]'
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
            <span>My Dashboard</span>
          </button>
          <button
            onClick={() => handleNavigation("/my-prompts")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'prompts' 
                ? 'bg-[#19212F] text-[#33C3F0] font-medium' 
                : 'hover:bg-[#19212F] hover:text-[#33C3F0]'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>My Prompts</span>
          </button>
          <button
            onClick={() => handleNavigation("/manage-subscription")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'subscription' 
                ? 'bg-[#19212F] text-[#33C3F0] font-medium' 
                : 'hover:bg-[#19212F] hover:text-[#33C3F0]'
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Subscription</span>
          </button>
          <button
            onClick={() => handleNavigation("/my-settings")}
            className={`flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left ${
              activePage === 'settings' 
                ? 'bg-[#19212F] text-[#33C3F0] font-medium' 
                : 'hover:bg-[#19212F] hover:text-[#33C3F0]'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 px-4 py-3 rounded-md text-left hover:bg-[#19212F] hover:text-[#33C3F0]"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-[#1A1F2C]">
        <h4 className="text-xs uppercase tracking-wider mb-3 text-[#8E9196]">
          SUBSCRIPTION
        </h4>
        <div className="bg-[#19212F] rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Pro Plan</span>
            <span className="text-xs px-3 py-1 bg-[#2A6B85] text-[#33C3F0] rounded-full">
              Active
            </span>
          </div>
          <div className="text-xs text-[#8E9196] mb-4">
            Next billing on Aug 12, 2023
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-[#8E9196] border-[#1A1F2C] bg-transparent hover:bg-[#1A1F2C] hover:text-[#33C3F0]"
            onClick={() => handleNavigation("/manage-subscription")}
          >
            Manage Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};
