
import { useState } from "react";
import { useUserManagementPage } from "@/hooks/use-user-management-page";
import { UserManagementHeader } from "@/components/admin/user-management/UserManagementHeader";
import { UserFiltersPanel } from "@/components/admin/user-management/UserFiltersPanel";
import { UserTableSection } from "@/components/admin/user-management/UserTableSection";
import { DeleteConfirmationDialog } from "@/components/admin/user-management/DeleteConfirmationDialog";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminUser } from "@/components/admin/user-management/types";
import { EditUserForm } from "@/components/admin/EditUserForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const UserManagement = () => {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useSidebarState();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const {
    users,
    loading,
    fetchUsers,
    selectedUsers,
    setSelectedUsers,
    filterValues,
    handleFilterChange,
    resetFilters,
    handleFilterClick,
    filterVisible,
    filterUsers,
    handleDeleteUser,
    handleDeleteSelected,
    deleteDialogOpen,
    closeDeleteDialog,
    confirmDeleteUser,
    deleteDialogData,
  } = useUserManagementPage();

  // Handle edit user action
  const handleEditUser = async (userId: string) => {
    setSelectedUserId(userId);
    setEditMode(true);
    
    try {
      setIsLoading(true);
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (userError) throw userError;
      
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      if (rolesError) throw rolesError;
      
      const roles = rolesData.map(r => r.role);
      
      setUserData({
        ...userData,
        roles
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        variant: "destructive",
        title: "Error loading user",
        description: "Could not fetch the user details. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // We need to adapt the onEdit and onDelete functions to match the expected types
  const handleEditUserAdapter = (user: AdminUser) => {
    handleEditUser(user.id);
  };
  
  const handleDeleteUserAdapter = (user: AdminUser) => {
    handleDeleteUser(user.id);
  };

  return (
    <AdminLayout 
      title={editMode ? "Edit User" : "User Management"} 
      description={editMode ? "Update user information and manage roles" : "Manage your application users, their roles and permissions"}
      bannerMessage={editMode ? "👤 Edit user details and manage their roles." : "👥 Manage users, assign roles, and control access levels."}
    >
      {editMode ? (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setEditMode(false)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : userData ? (
            <EditUserForm 
              initialData={userData} 
              onSaveComplete={() => {
                setEditMode(false);
                fetchUsers();
              }} 
            />
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">User not found</p>
              <Button 
                onClick={() => setEditMode(false)} 
                className="mt-4"
              >
                Return to User Management
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <UserManagementHeader 
            selectedCount={selectedUsers.length}
            onDelete={handleDeleteSelected}
            onRefresh={fetchUsers}
            onDeleteSelected={handleDeleteSelected}
            toggleFilterVisible={handleFilterClick}
          />
          
          {filterVisible && (
            <div className="animate-slide-up">
              <UserFiltersPanel 
                filterValues={{
                  name: filterValues.name || '',
                  email: filterValues.email || '',
                  role: filterValues.role,
                  status: filterValues.status
                }}
                onFilterChange={(field, value) => handleFilterChange(field as keyof typeof filterValues, value)}
                onResetFilters={resetFilters}
              />
            </div>
          )}
          
          <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <UserTableSection 
              users={filterUsers(users)}
              loading={loading}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              onEdit={handleEditUserAdapter}
              onDelete={handleDeleteUserAdapter}
            />
          </div>
          
          <DeleteConfirmationDialog 
            isOpen={deleteDialogOpen}
            onClose={closeDeleteDialog}
            onConfirm={confirmDeleteUser}
            isMultiple={deleteDialogData.isMultiple}
            count={deleteDialogData.isMultiple ? selectedUsers.length : 1}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagement;
