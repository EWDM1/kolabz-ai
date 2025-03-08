
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface DeleteDialogData {
  userId?: string;
  isMultiple: boolean;
}

export const useDeleteDialog = (selectedUsers: string[], fetchUsers: () => Promise<void>) => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogData>({
    userId: undefined,
    isMultiple: false
  });

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
    deleteDialogOpen,
    deleteDialogData,
    handleDeleteUser,
    handleDeleteSelected,
    closeDeleteDialog,
    confirmDeleteUser
  };
};
