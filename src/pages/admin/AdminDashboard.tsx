
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuth } from "@/components/AuthContext";
import { cn } from "@/lib/utils";

// Import the dashboard components
import { DashboardMetrics } from "@/components/admin/dashboard/DashboardMetrics";
import { UserGrowthChart } from "@/components/admin/dashboard/charts/UserGrowthChart";
import { ActivityChart } from "@/components/admin/dashboard/charts/ActivityChart";
import { RoleDistributionChart } from "@/components/admin/dashboard/charts/RoleDistributionChart";
import { UserManagementCard } from "@/components/admin/dashboard/UserManagementCard";

// Import the hook for dashboard data
import { useDashboardData } from "@/hooks/use-dashboard-data";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const { metrics, loading } = useDashboardData();
  const location = useLocation();
  
  // Redirect from /admin to /admin/dashboard
  if (location.pathname === '/admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  // Check the sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

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
        "flex-1 transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64",
        "px-4 md:px-6 lg:px-8"
      )}>
        <Banner
          id="welcome-banner"
          message={`👋 Welcome back, ${user?.name}! Here's an overview of your platform.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6">
          <div className="space-y-6 max-w-full">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Overview of your platform's performance and user metrics
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <>
                {/* Key Metrics */}
                <DashboardMetrics 
                  totalUsers={metrics.totalUsers}
                  activeUsers={metrics.activeUsers}
                  newUsers={metrics.newUsers}
                />
                
                {/* Charts */}
                <div className="grid gap-4 md:grid-cols-2">
                  <UserGrowthChart data={metrics.userGrowth} />
                  <ActivityChart data={metrics.activityData} />
                </div>
                
                {/* User Distribution by Role and User Management */}
                <div className="grid gap-4 md:grid-cols-2">
                  <RoleDistributionChart data={metrics.usersByRole} />
                  <UserManagementCard 
                    selectedUsers={selectedUsers} 
                    setSelectedUsers={setSelectedUsers} 
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
