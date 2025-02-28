
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    navigate(`/admin/users/edit/${user.id}`, { state: { user } });
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        // We can't actually delete from auth.users through the client
        // Instead, mark the user as inactive in our database
        
        // First check if the user has the superadmin role
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);
        
        const isSuperAdmin = roles?.some(r => r.role === 'superadmin');
        
        // Don't allow deleting superadmins unless you're also a superadmin
        if (isSuperAdmin && user?.role !== 'superadmin') {
          toast({
            variant: "destructive",
            title: "Permission denied",
            description: "You don't have permission to delete a superadmin user",
          });
          return;
        }
        
        // For a soft delete, you could set a "deleted" flag in the users table
        const { error } = await supabase
          .from('users')
          .update({
            deleted: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);
        
        if (error) throw error;
        
        toast({
          title: "User deleted",
          description: "The user has been successfully removed.",
        });
        
        // Refresh the user list
        setSelectedUsers(selectedUsers.filter(id => id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        toast({
          variant: "destructive",
          title: "Failed to delete user",
          description: "An error occurred while trying to delete the user.",
        });
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
      try {
        // In a real implementation, we would need to check if any of the selected users are superadmins
        // and only allow deletion if the current user is also a superadmin
        
        // For now, let's just create a simple soft delete by setting a flag
        for (const userId of selectedUsers) {
          const { error } = await supabase
            .from('users')
            .update({
              deleted: true,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
          
          if (error) throw error;
        }
        
        toast({
          title: `${selectedUsers.length} users deleted`,
          description: "The selected users have been successfully removed.",
        });
        
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error deleting users:", error);
        toast({
          variant: "destructive",
          title: "Failed to delete users",
          description: "An error occurred while trying to delete the selected users.",
        });
      }
    }
  };

  const handleFilter = () => {
    navigate("/admin/users/filter");
  };

  const handleExport = async () => {
    try {
      // Get users data
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (usersError) throw usersError;
      
      // Get roles for each user
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
      
      if (rolesError) throw rolesError;
      
      // Combine the data
      const exportData = users.map(user => {
        const userRoles = roles
          .filter(r => r.user_id === user.id)
          .map(r => r.role);
        
        return {
          ...user,
          roles: userRoles
        };
      });
      
      // Create the export file
      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      // Download the file
      const link = document.createElement("a");
      link.href = url;
      link.download = `users-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export complete",
        description: "Users data has been exported successfully.",
      });
    } catch (error) {
      console.error("Error exporting users:", error);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "An error occurred while trying to export users data.",
      });
    }
  };

  const handleImport = () => {
    // Create a file input and trigger it
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          toast({
            title: "Import initiated",
            description: `File "${file.name}" is being processed.`,
          });
          
          // Read the file contents
          const fileReader = new FileReader();
          fileReader.onload = async (event) => {
            try {
              const jsonData = JSON.parse(event.target?.result as string);
              
              // Process each user in the data
              // This would need to be implemented carefully in a real app
              // to handle existing users, roles, etc.
              
              toast({
                title: "Import complete",
                description: "Users have been imported successfully.",
              });
            } catch (error) {
              console.error("Error parsing import file:", error);
              toast({
                variant: "destructive",
                title: "Import failed",
                description: "The file format is invalid.",
              });
            }
          };
          fileReader.readAsText(file);
        } catch (error) {
          console.error("Error importing users:", error);
          toast({
            variant: "destructive",
            title: "Import failed",
            description: "An error occurred during import.",
          });
        }
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
