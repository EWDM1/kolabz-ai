
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface DeleteDialogData {
  isMultiple: boolean;
  userId?: string;
}

export const useDeleteDialog = (selectedUsers: string[], refreshUsers: () => void) => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogData>({ isMultiple: false });

  const handleDeleteUser = (userId: string) => {
    setDeleteDialogData({ isMultiple: false, userId });
    setDeleteDialogOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) {
      toast({
        variant: "destructive",
        title: "No users selected",
        description: "Please select at least one user to delete."
      });
      return;
    }
    
    setDeleteDialogData({ isMultiple: true });
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const confirmDeleteUser = async () => {
    try {
      // Here you would typically call an API to delete the user(s)
      // For now, we'll just simulate success
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Success",
        description: deleteDialogData.isMultiple 
          ? `${selectedUsers.length} users deleted successfully.` 
          : "User deleted successfully."
      });
      
      // Refresh the user list
      refreshUsers();
      
      // Close the dialog
      closeDeleteDialog();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to delete user(s)",
        description: error.message || "There was an error deleting the user(s)."
      });
    }
  };

  return {
    deleteDialogOpen,
    deleteDialogData,
    handleDeleteUser,
    handleDeleteSelected,
    closeDeleteDialog,
    confirmDeleteUser
  };
};
