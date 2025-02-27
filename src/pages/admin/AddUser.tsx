
import { useState, useEffect } from "react";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AddUserForm from "@/components/admin/AddUserForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";

const AddUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

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
          message={`👋 Welcome back, ${user?.name}! Create a new user account below.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6">
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center">
              <Link to="/admin/users">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Users
                </Button>
              </Link>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold">Add New User</h1>
              <p className="text-muted-foreground">
                Create a new user account
              </p>
            </div>
            
            <AddUserForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddUser;
