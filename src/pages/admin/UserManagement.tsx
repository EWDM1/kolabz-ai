
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserManagementPage } from "@/hooks/use-user-management-page";
import { UserManagementHeader } from "@/components/admin/user-management/UserManagementHeader";
import { UserFiltersPanel } from "@/components/admin/user-management/UserFiltersPanel";
import { UserTableSection } from "@/components/admin/user-management/UserTableSection";
import { DeleteConfirmationDialog } from "@/components/admin/user-management/DeleteConfirmationDialog";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminUser } from "@/components/admin/user-management/types";

const UserManagement = () => {
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useSidebarState();
  
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
    handleEditUser,
    handleDeleteUser,
    handleDeleteSelected,
    deleteDialogOpen,
    closeDeleteDialog,
    confirmDeleteUser,
    deleteDialogData,
  } = useUserManagementPage();

  // We need to adapt the onEdit and onDelete functions to match the expected types
  const handleEditUserAdapter = (user: AdminUser) => {
    handleEditUser(user.id);
  };
  
  const handleDeleteUserAdapter = (user: AdminUser) => {
    handleDeleteUser(user.id);
  };

  return (
    <AdminLayout 
      title="User Management" 
      description="Manage your application users, their roles and permissions"
      bannerMessage="👥 Manage users, assign roles, and control access levels."
    >
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
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
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
    </AdminLayout>
  );
};

export default UserManagement;
