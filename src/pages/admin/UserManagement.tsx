
import { useState, useEffect } from "react";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { UserTable, AdminUser } from "@/components/admin/UserTable";
import { Button } from "@/components/ui/button";
import { 
  UserRoundPlus,
  Filter,
  Download, 
  Upload, 
  Trash2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";
import { toast } from "@/hooks/use-toast";

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Eric Smith",
    email: "eric@example.com",
    role: "superadmin",
    status: "active",
    lastActive: "Today, 2:30 PM"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
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
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const { user, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

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

  const handleEditUser = (user: AdminUser) => {
    // If not super admin, restrict editing of non-user roles
    if (!isSuperAdmin && user.role !== "user") {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "You can only edit users with the 'User' role.",
      });
      return;
    }
    
    navigate(`/admin/users/edit/${user.id}`, { state: { user } });
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    
    // If not super admin, restrict deleting of non-user roles
    if (!isSuperAdmin && userToDelete && userToDelete.role !== "user") {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "You can only delete users with the 'User' role.",
      });
      return;
    }
    
    // In a real application, this would call an API
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been successfully removed.",
    });
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    
    // Check permissions for non-super admins
    if (!isSuperAdmin) {
      const hasRestrictedUsers = users
        .filter(user => selectedUsers.includes(user.id))
        .some(user => user.role !== "user");
        
      if (hasRestrictedUsers) {
        toast({
          variant: "destructive",
          title: "Permission denied",
          description: "You can only delete users with the 'User' role.",
        });
        return;
      }
    }
    
    // In a real application, this would call an API
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    toast({
      title: `${selectedUsers.length} users deleted`,
      description: "The selected users have been successfully removed.",
    });
    setSelectedUsers([]);
  };

  const handleFilter = () => {
    navigate("/admin/users/filter");
  };

  const handleExport = () => {
    // In a real application, this would generate a CSV/Excel file
    const usersJson = JSON.stringify(users, null, 2);
    const blob = new Blob([usersJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users-export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export complete",
      description: "Users data has been exported successfully.",
    });
  };

  const handleImport = () => {
    // Create a file input and trigger it
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.csv";
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real application, this would parse the file and import users
        toast({
          title: "Import initiated",
          description: `File "${file.name}" is being processed.`,
        });
        
        // Simulating successful import after a delay
        setTimeout(() => {
          toast({
            title: "Import complete",
            description: "Users have been imported successfully.",
          });
        }, 1500);
      }
    };
    
    input.click();
  };

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
                <Button variant="outline" size="sm" onClick={handleFilter}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={handleImport}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </div>
              
              {selectedUsers.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected ({selectedUsers.length})
                </Button>
              )}
            </div>
            
            <UserTable 
              users={users} 
              selectedUsers={selectedUsers} 
              setSelectedUsers={setSelectedUsers} 
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
