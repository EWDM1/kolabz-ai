
import { useState, useEffect } from "react";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { UserTable } from "@/components/admin/UserTable";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";
import { useUserManagement } from "@/hooks/use-user-management";
import { UserManagementHeader } from "@/components/admin/user-management/UserManagementHeader";
import { DataActions } from "@/components/admin/user-management/DataActions";
import { DeleteConfirmationDialog } from "@/components/admin/user-management/DeleteConfirmationDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterValues {
  name: string;
  email: string;
  role: string;
  status: string;
}

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    name: "",
    email: "",
    role: "",
    status: ""
  });
  const { user } = useAuth();
  
  const { 
    selectedUsers, 
    setSelectedUsers, 
    handleEditUser, 
    handleDeleteUser, 
    handleDeleteSelected, 
    deleteDialogOpen,
    closeDeleteDialog,
    confirmDeleteUser,
    deleteDialogData
  } = useUserManagement(user);

  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem("adminSidebarCollapsed");
      if (savedState !== null) {
        setSidebarCollapsed(savedState === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
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

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Applied filters:", filterValues);
    // Here we would apply the filters to the user list
    // This would involve passing these values to the UserTable component
    setShowFilters(false);
  };

  const handleFilterReset = () => {
    setFilterValues({
      name: "",
      email: "",
      role: "",
      status: ""
    });
  };

  // Prepare dialog content based on whether it's single or multiple deletion
  const getDialogContent = () => {
    if (deleteDialogData.isMultiple) {
      return {
        title: "Delete Selected Users",
        description: `Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`
      };
    }
    return {
      title: "Delete User",
      description: "Are you sure you want to delete this user? This action cannot be undone."
    };
  };

  const dialogContent = getDialogContent();

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
            <UserManagementHeader />
            
            <DataActions 
              onFilter={handleFilterToggle}
              onDeleteSelected={handleDeleteSelected}
              selectedCount={selectedUsers.length}
            />
            
            {showFilters && (
              <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Filter Users</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleFilterToggle}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFilterSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Search by name"
                          value={filterValues.name}
                          onChange={handleFilterChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Search by email"
                          value={filterValues.email}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          name="role"
                          value={filterValues.role}
                          onChange={handleFilterChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">All Roles</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          name="status"
                          value={filterValues.status}
                          onChange={handleFilterChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">All Statuses</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={handleFilterReset}>
                        Reset Filters
                      </Button>
                      <Button type="submit">
                        Apply Filters
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            <UserTable 
              selectedUsers={selectedUsers} 
              setSelectedUsers={setSelectedUsers} 
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              filters={filterValues}
            />

            <DeleteConfirmationDialog
              isOpen={deleteDialogOpen}
              onClose={closeDeleteDialog}
              onConfirm={confirmDeleteUser}
              title={dialogContent.title}
              description={dialogContent.description}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
