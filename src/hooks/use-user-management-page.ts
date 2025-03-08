
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserTable } from "@/hooks/use-user-table";
import { useUserManagement } from "@/hooks/use-user-management";
import { useAuth } from "@/components/AuthContext";
import { useSidebarState } from "@/hooks/use-sidebar-state";

// Filter values interface
export interface FilterValues {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

export const useUserManagementPage = () => {
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

  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useSidebarState();

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

  // Handler for filter button
  const handleFilterClick = () => {
    // Scroll to filter section
    document.querySelector('.border.rounded-md.p-4.mb-6')?.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    users,
    loading,
    error,
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
  };
};
