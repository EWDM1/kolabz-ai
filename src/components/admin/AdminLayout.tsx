
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check the sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (requireAdmin && !isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate, requireAdmin]);

  // Listen for storage events to sync sidebar state across components
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem("adminSidebarCollapsed");
      if (savedState !== null) {
        setSidebarCollapsed(savedState === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Check for changes every second (for same-window updates)
    const interval = setInterval(() => {
      const savedState = localStorage.getItem("adminSidebarCollapsed");
      if (savedState !== null && (savedState === "true") !== sidebarCollapsed) {
        setSidebarCollapsed(savedState === "true");
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [sidebarCollapsed]);

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
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-6 max-w-7xl mx-auto">
            {(title || description) && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  {title && <h1 className="text-3xl font-bold">{title}</h1>}
                  {description && <p className="text-muted-foreground">{description}</p>}
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
