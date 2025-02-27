
import { useState, useEffect } from "react";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { UserTable } from "@/components/admin/UserTable";
import { Button } from "@/components/ui/button";
import { 
  UserRoundPlus,
  Filter,
  Download, 
  Upload, 
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";
import { AdminUser } from "@/components/admin/UserTable";

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "admin",
    status: "active",
    lastActive: "Today, 2:30 PM"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    lastActive: "Yesterday, 4:20 PM"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "user",
    status: "inactive",
    lastActive: "Last week"
  },
  {
    id: "4",
    name: "Lisa Davis",
    email: "lisa@example.com",
    role: "user",
    status: "active",
    lastActive: "Today, 11:15 AM"
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james@example.com",
    role: "user",
    status: "active",
    lastActive: "Yesterday, 9:45 AM"
  },
  {
    id: "6",
    name: "Emily Taylor",
    email: "emily@example.com",
    role: "user",
    status: "inactive",
    lastActive: "Never"
  }
];

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
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
          message={`👋 Welcome back, ${user?.name}! Here you can manage all platform users.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6">
          <div className="space-y-6 max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground">
                  Manage your platform users
                </p>
              </div>
              <Link to="/admin/users/new">
                <Button>
                  <UserRoundPlus className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </div>
              
              {selectedUsers.length > 0 && (
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected ({selectedUsers.length})
                </Button>
              )}
            </div>
            
            <UserTable 
              users={mockUsers} 
              selectedUsers={selectedUsers} 
              setSelectedUsers={setSelectedUsers} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
