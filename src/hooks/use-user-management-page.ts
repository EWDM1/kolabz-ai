
import { useUserData } from './user-management/use-user-data';
import { useUserSelection } from './user-management/use-user-selection';
import { useUserFilters, FilterValues } from './user-management/use-user-filters';
import { useUserActions } from './user-management/use-user-actions';
import { useDeleteDialog, DeleteDialogData } from './user-management/use-delete-dialog';
import { useSidebarState } from './use-sidebar-state';

export { type FilterValues } from './user-management/use-user-filters';
export { type DeleteDialogData } from './user-management/use-delete-dialog';

export const useUserManagementPage = () => {
  const { users, loading, fetchUsers } = useUserData();
  const { selectedUsers, setSelectedUsers } = useUserSelection();
  const { 
    filterValues, 
    handleFilterChange, 
    resetFilters, 
    filterVisible, 
    toggleFilterVisible: handleFilterClick, 
    filterUsers 
  } = useUserFilters();
  const { handleEditUser, navigate } = useUserActions();
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
    handleResetFilters: resetFilters,
    filterVisible,
    toggleFilterVisible: handleFilterClick,
    handleFilterClick,
    filterUsers,
    
    // Actions
    handleEditUser,
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
    sidebarCollapsed,
    
    // Navigation
    navigate
  };
};
