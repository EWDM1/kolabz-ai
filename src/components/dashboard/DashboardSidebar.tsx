
import { LayoutDashboard, ListChecks, Settings, LogOut, CreditCard } from "lucide-react";
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
    <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
      <div className="p-4">
        <nav className="space-y-1">
          <button
            onClick={() => handleNavigation("/dashboard")}
            className={`flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left ${
              activePage === 'dashboard' 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>My Dashboard</span>
          </button>
          <button
            onClick={() => handleNavigation("/my-prompts")}
            className={`flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left ${
              activePage === 'prompts' 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <ListChecks className="h-5 w-5" />
            <span>My Prompts</span>
          </button>
          <button
            onClick={() => handleNavigation("/manage-subscription")}
            className={`flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left ${
              activePage === 'subscription' 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Subscription</span>
          </button>
          <button
            onClick={() => handleNavigation("/my-settings")}
            className={`flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left ${
              activePage === 'settings' 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          SUBSCRIPTION
        </h4>
        <div className="bg-primary/10 rounded-md p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Pro Plan</span>
            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
              Active
            </span>
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            Next billing on Aug 12, 2023
          </div>
          <Button variant="outline" size="sm" className="w-full text-xs bg-card">
            Manage Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};
