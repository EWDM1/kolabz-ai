import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/components/AuthContext";
import { AdminUser } from "@/components/admin/UserTable";

export const useUserManagement = (currentUser: any) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<{
    userId?: string;
    isMultiple: boolean;
  }>({ isMultiple: false });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEditUser = (user: AdminUser) => {
    navigate(`/admin/users/edit/${user.id}`);
  };

  const openDeleteDialog = (userId?: string) => {
    setDeleteDialogData({
      userId,
      isMultiple: userId === undefined && selectedUsers.length > 0,
    });
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const performUserDeletion = async (userId: string) => {
    try {
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      const isSuperAdmin = roles?.some(r => r.role === 'superadmin');
      
      if (isSuperAdmin && currentUser?.role !== 'superadmin') {
        toast({
          variant: "destructive",
          title: "Permission denied",
          description: "You don't have permission to delete a superadmin user",
        });
        return false;
      }
      
      const { error } = await supabase
        .from('users')
        .update({
          deleted: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete user",
        description: "An error occurred while trying to delete the user.",
      });
      return false;
    }
  };

  const handleDeleteUser = async (userId: string) => {
    openDeleteDialog(userId);
  };

  const confirmDeleteUser = async () => {
    closeDeleteDialog();
    
    if (deleteDialogData.userId) {
      const success = await performUserDeletion(deleteDialogData.userId);
      if (success) {
        toast({
          title: "User deleted",
          description: "The user has been successfully removed.",
        });
        
        setSelectedUsers(selectedUsers.filter(id => id !== deleteDialogData.userId));
      }
    } 
    else if (deleteDialogData.isMultiple) {
      confirmDeleteSelected();
    }
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    openDeleteDialog();
  };

  const confirmDeleteSelected = async () => {
    try {
      let successCount = 0;
      
      for (const userId of selectedUsers) {
        const success = await performUserDeletion(userId);
        if (success) successCount++;
      }
      
      if (successCount > 0) {
        toast({
          title: `${successCount} users deleted`,
          description: "The selected users have been successfully removed.",
        });
        
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error("Error deleting users:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete users",
        description: "An error occurred while trying to delete the selected users.",
      });
    }
  };

  const handleFilter = () => {
    navigate("/admin/users/filter");
  };

  return {
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
  };
};
