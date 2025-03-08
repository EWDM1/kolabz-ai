
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserTable } from "@/components/admin/UserTable";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { DeleteConfirmationDialog } from "@/components/admin/user-management/DeleteConfirmationDialog";
import { UserManagementHeader } from "@/components/admin/user-management/UserManagementHeader";
import { ImportActions } from "@/components/admin/user-management/ImportActions";
import { ExportActions } from "@/components/admin/user-management/ExportActions";
import { DataActions } from "@/components/admin/user-management/DataActions";
import { useUserTable } from "@/hooks/use-user-table";
import { useUserManagement } from "@/hooks/use-user-management";
import { useAuth } from "@/components/AuthContext";
import { cn } from "@/lib/utils";
import { UserRole } from "@/components/admin/feature-management/types";
import { AdminUser } from "@/components/admin/user-management/types";

// Move this to the types file if needed
interface FilterValues {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const { users, loading, error, fetchUsers } = useUserTable(filterValues);
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  
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
  } = useUserManagement(currentUser);

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

  // Handle filter changes
  const handleFilterChange = (field: keyof FilterValues, value: string) => {
    // Update the specific filter value
    setFilterValues((prev) => ({
      ...prev,
      [field]: value || undefined // Use undefined when value is empty to remove the filter
    }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilterValues({});
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
          id="user-management-banner"
          message="👤 Manage users, control access, and monitor activity."
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6">
          <div className="space-y-6">
            <UserManagementHeader
              selectedCount={selectedUsers.length}
              onDelete={handleDeleteSelected}
              onRefresh={fetchUsers}
            />
            
            <Tabs defaultValue="all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>

                <div className="flex flex-col sm:flex-row gap-3">
                  <ImportActions onImportComplete={fetchUsers} />
                  <ExportActions users={users} />
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/admin/users/edit/new")}
                  >
                    Add User
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4 mb-6">
                <h3 className="font-medium mb-3">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Input
                      placeholder="Filter by name"
                      value={filterValues.name || ''}
                      onChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Filter by email"
                      value={filterValues.email || ''}
                      onChange={(e) => handleFilterChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Select
                      value={filterValues.role || ''}
                      onValueChange={(value) => handleFilterChange('role', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All roles</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="superadmin">Superadmin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={filterValues.status || ''}
                      onValueChange={(value) => handleFilterChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>

              <TabsContent value="all">
                <DataActions />
                <UserTable
                  users={users}
                  loading={loading}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              </TabsContent>
              
              <TabsContent value="active">
                <DataActions />
                <UserTable
                  users={users.filter(user => user.status === 'active')}
                  loading={loading}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              </TabsContent>
              
              <TabsContent value="inactive">
                <DataActions />
                <UserTable
                  users={users.filter(user => user.status === 'inactive')}
                  loading={loading}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeleteUser}
        isMultiple={deleteDialogData.isMultiple}
      />
    </div>
  );
};

export default UserManagement;
