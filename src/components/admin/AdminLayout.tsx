
import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";
import { useSidebarState } from "@/hooks/use-sidebar-state";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  bannerMessage?: string;
  requireAdmin?: boolean;
}

const AdminLayout = ({
  children,
  title,
  description,
  bannerMessage,
  requireAdmin = true,
}: AdminLayoutProps) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useSidebarState();

  // Redirect if not admin
  useEffect(() => {
    if (requireAdmin && !isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate, requireAdmin]);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <Banner
          id="welcome-banner"
          message={bannerMessage || `👋 Welcome back, ${user?.name}!`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-6 lg:px-8">
          <div className="grid gap-4 lg:gap-8 max-w-7xl mx-auto">
            {(title || description) && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                <div>
                  {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
                  {description && <p className="text-muted-foreground mt-1">{description}</p>}
                </div>
              </div>
            )}
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
