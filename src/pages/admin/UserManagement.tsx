
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserManagementPage } from "@/hooks/use-user-management-page";
import { UserManagementHeader } from "@/components/admin/user-management/UserManagementHeader";
import { UserFiltersPanel } from "@/components/admin/user-management/UserFiltersPanel";
import { UserTableSection } from "@/components/admin/user-management/UserTableSection";
import { DeleteConfirmationDialog } from "@/components/admin/user-management/DeleteConfirmationDialog";
import { AdminUser } from "@/components/admin/user-management/types";
import { cn } from "@/lib/utils";
import AdminSidebar from "@/components/admin/AdminSidebar";

const UserManagement = () => {
  const navigate = useNavigate();
  const {
    users = [],
    loading = false,
    fetchUsers = () => {},
    selectedUsers,
    setSelectedUsers,
    filterValues,
    handleFilterChange,
    resetFilters = () => {},
    handleFilterClick = () => {},
    filterVisible,
    filterUsers,
    handleEditUser = () => {},
    handleDeleteUser = () => {},
    handleDeleteSelected = () => {},
    deleteDialogOpen = false,
    closeDeleteDialog = () => {},
    confirmDeleteUser = async () => {},
    deleteDialogData = { isMultiple: false },
    sidebarOpen = false,
    setSidebarOpen = () => {},
    sidebarCollapsed = false
  } = useUserManagementPage();

  // We need to adapt the onEdit and onDelete functions to match the expected types
  const handleEditUserAdapter = (user: AdminUser) => {
    handleEditUser(user.id);
  };
  
  const handleDeleteUserAdapter = (user: AdminUser) => {
    handleDeleteUser(user.id);
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 overflow-auto transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <UserManagementHeader 
            selectedCount={selectedUsers.length}
            onDelete={() => {}} // Providing an empty function to satisfy the required prop
            onRefresh={fetchUsers} // Passing the fetchUsers function for refreshing data
            onDeleteSelected={handleDeleteSelected}
            toggleFilterVisible={handleFilterClick}
          />
          
          {filterVisible && (
            <UserFiltersPanel 
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
            />
          )}
          
          <UserTableSection 
            users={filterUsers(users)}
            loading={loading}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            onEdit={handleEditUserAdapter}
            onDelete={handleDeleteUserAdapter}
          />
          
          <DeleteConfirmationDialog 
            isOpen={deleteDialogOpen}
            onClose={closeDeleteDialog}
            onConfirm={confirmDeleteUser}
            isMultiple={deleteDialogData.isMultiple}
            count={deleteDialogData.isMultiple ? selectedUsers.length : 1}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
