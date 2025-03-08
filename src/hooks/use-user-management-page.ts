
import { useUserData } from './user-management/use-user-data';
import { useUserSelection } from './user-management/use-user-selection';
import { useUserFilters } from './user-management/use-user-filters';
import { useDeleteDialog } from './user-management/use-delete-dialog';
import { useSidebarState } from './use-sidebar-state';

export const useUserManagementPage = () => {
  const { users, loading, fetchUsers } = useUserData();
  const { selectedUsers, setSelectedUsers } = useUserSelection();
  const { 
    filterValues, 
    handleFilterChange, 
    resetFilters, 
    filterVisible, 
    toggleFilterVisible, 
    filterUsers 
  } = useUserFilters();
  const { 
    deleteDialogOpen, 
    deleteDialogData, 
    handleDeleteUser, 
    handleDeleteSelected, 
    closeDeleteDialog, 
    confirmDeleteUser 
  } = useDeleteDialog(selectedUsers, fetchUsers);
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useSidebarState();

  return {
    // User data
    users,
    loading,
    fetchUsers,
    
    // Selection
    selectedUsers,
    setSelectedUsers,
    
    // Filters
    filterValues,
    handleFilterChange,
    resetFilters,
    filterVisible,
    toggleFilterVisible,
    handleFilterClick: toggleFilterVisible,
    filterUsers,
    
    // Actions
    handleDeleteUser,
    handleDeleteSelected,
    
    // Delete dialog
    deleteDialogOpen,
    closeDeleteDialog,
    confirmDeleteUser,
    deleteDialogData,
    
    // Sidebar
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed
  };
};
