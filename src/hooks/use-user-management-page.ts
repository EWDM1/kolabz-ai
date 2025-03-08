
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminUser } from "@/components/admin/user-management/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface FilterValues {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface DeleteDialogData {
  userId?: string;
  isMultiple: boolean;
}

export const useUserManagementPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    name: '',
    email: '',
    role: '',
    status: '',
  });
  const [filterVisible, setFilterVisible] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogData>({
    userId: undefined,
    isMultiple: false
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch users from the database
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*, user_roles(role)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Format the data for the AdminUser type
      const formattedUsers: AdminUser[] = data.map((user: any) => ({
        id: user.id,
        name: user.name || 'Unnamed User',
        email: user.email || '',
        avatar: user.avatar_url || '',
        role: user.user_roles?.role || 'user',
        status: user.status || 'active',
        lastActive: user.last_sign_in_at || user.created_at,
        createdAt: user.created_at
      }));

      setUsers(formattedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Failed to load users",
        description: error.message || "There was an error fetching the users."
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Initialize data
  useEffect(() => {
    fetchUsers();
    // Check if sidebar should be collapsed
    const savedSidebarState = localStorage.getItem('admin-sidebar-collapsed');
    if (savedSidebarState) {
      setSidebarCollapsed(savedSidebarState === 'true');
    }
  }, [fetchUsers]);

  const handleFilterChange = useCallback((field: keyof FilterValues, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterValues({
      name: '',
      email: '',
      role: '',
      status: '',
    });
  }, []);

  const handleResetFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const toggleFilterVisible = useCallback(() => {
    setFilterVisible(prev => !prev);
  }, []);

  const handleFilterClick = useCallback(() => {
    toggleFilterVisible();
  }, [toggleFilterVisible]);

  const filterUsers = useCallback((users: AdminUser[]): AdminUser[] => {
    return users.filter(user => {
      const nameMatch = !filterValues.name || 
        user.name.toLowerCase().includes(filterValues.name.toLowerCase());
      
      const emailMatch = !filterValues.email || 
        user.email.toLowerCase().includes(filterValues.email.toLowerCase());
      
      const roleMatch = !filterValues.role || user.role === filterValues.role;
      
      const statusMatch = !filterValues.status || user.status === filterValues.status;
      
      return nameMatch && emailMatch && roleMatch && statusMatch;
    });
  }, [filterValues]);

  // Edit user function
  const handleEditUser = useCallback((userId: string) => {
    navigate(`/admin/users/edit/${userId}`);
  }, [navigate]);

  // Delete user functions
  const handleDeleteUser = useCallback((userId: string) => {
    setDeleteDialogData({
      userId,
      isMultiple: false
    });
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (selectedUsers.length === 0) return;
    
    setDeleteDialogData({
      isMultiple: true
    });
    setDeleteDialogOpen(true);
  }, [selectedUsers]);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  const confirmDeleteUser = useCallback(async () => {
    try {
      const userIds = deleteDialogData.isMultiple 
        ? selectedUsers 
        : (deleteDialogData.userId ? [deleteDialogData.userId] : []);
      
      // Perform deletion for each user ID
      for (const userId of userIds) {
        await supabase.from('user_roles').delete().eq('user_id', userId);
        await supabase.from('users').delete().eq('id', userId);
      }
      
      // Success message
      toast({
        title: "Success",
        description: `${userIds.length} user(s) deleted successfully`,
      });
      
      // Clear selected users if it was a bulk delete
      if (deleteDialogData.isMultiple) {
        setSelectedUsers([]);
      }
      
      // Refresh users
      fetchUsers();
      
    } catch (error: any) {
      console.error('Error deleting user(s):', error);
      toast({
        variant: "destructive",
        title: "Failed to delete user(s)",
        description: error.message || "There was an error deleting the user(s)."
      });
    } finally {
      // Close dialog
      setDeleteDialogOpen(false);
    }
  }, [deleteDialogData, selectedUsers, toast, fetchUsers]);

  return {
    users,
    loading,
    fetchUsers,
    selectedUsers,
    setSelectedUsers,
    filterValues,
    handleFilterChange,
    resetFilters,
    handleResetFilters,
    filterVisible,
    toggleFilterVisible,
    handleFilterClick,
    filterUsers,
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
