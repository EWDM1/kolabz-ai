
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { ReactNode } from "react";
import { useAuth } from "@/components/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useSidebarState();
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <Banner
          id="welcome-banner"
          message={`👋 Welcome back, ${user?.name || 'Admin'}! Here's an overview of your platform.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-6 lg:px-8">
          <div className="grid gap-4 lg:gap-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
