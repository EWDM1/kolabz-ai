
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

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  
  const { 
    selectedUsers, 
    setSelectedUsers, 
    handleEditUser, 
    handleDeleteUser, 
    handleDeleteSelected, 
    handleFilter,
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
              onFilter={handleFilter}
              onDeleteSelected={handleDeleteSelected}
              selectedCount={selectedUsers.length}
            />
            
            <UserTable 
              selectedUsers={selectedUsers} 
              setSelectedUsers={setSelectedUsers} 
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
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
