
import { Banner } from "@/components/ui/banner";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { DeleteConfirmationDialog } from "@/components/admin/user-management/DeleteConfirmationDialog";
import { UserManagementHeader } from "@/components/admin/user-management/UserManagementHeader";
import { UserFiltersPanel } from "@/components/admin/user-management/UserFiltersPanel";
import { UserActionsPanel } from "@/components/admin/user-management/UserActionsPanel";
import { UserTableSection } from "@/components/admin/user-management/UserTableSection";
import { useUserManagementPage } from "@/hooks/use-user-management-page";
import { cn } from "@/lib/utils";

const UserManagement = () => {
  const {
    users,
    loading,
    fetchUsers,
    filterValues,
    handleFilterChange,
    handleResetFilters,
    handleFilterClick,
    selectedUsers,
    setSelectedUsers,
    handleEditUser,
    handleDeleteUser,
    handleDeleteSelected,
    deleteDialogOpen,
    closeDeleteDialog,
    confirmDeleteUser,
    deleteDialogData,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    navigate
  } = useUserManagementPage();

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
              <UserActionsPanel 
                users={users}
                onImportComplete={fetchUsers}
                onAddUser={() => navigate("/admin/users/edit/new")}
              />

              <UserFiltersPanel
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />

              <TabsContent value="all">
                <UserTableSection
                  users={users}
                  filteredUsers={users}
                  loading={loading}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  onDeleteSelected={handleDeleteSelected}
                  onFilter={handleFilterClick}
                />
              </TabsContent>
              
              <TabsContent value="active">
                <UserTableSection
                  users={users}
                  filteredUsers={users.filter(user => user.status === 'active')}
                  loading={loading}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  onDeleteSelected={handleDeleteSelected}
                  onFilter={handleFilterClick}
                />
              </TabsContent>
              
              <TabsContent value="inactive">
                <UserTableSection
                  users={users}
                  filteredUsers={users.filter(user => user.status === 'inactive')}
                  loading={loading}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  onDeleteSelected={handleDeleteSelected}
                  onFilter={handleFilterClick}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeleteUser}
        isMultiple={deleteDialogData.isMultiple}
      />
    </div>
  );
};

export default UserManagement;
