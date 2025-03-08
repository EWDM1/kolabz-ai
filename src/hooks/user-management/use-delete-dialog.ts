
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserActions } from "./use-user-actions";

interface UseDeleteDialogProps {
  currentUserId?: string;
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onSuccess?: () => void;
}

export const useDeleteDialog = ({ 
  currentUserId,
  selectedUsers,
  setSelectedUsers,
  onSuccess
}: UseDeleteDialogProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<{
    userId?: string;
    isMultiple: boolean;
  }>({ isMultiple: false });
  
  const { toast } = useToast();
  const { performUserDeletion } = useUserActions({ currentUserId });

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
        if (onSuccess) onSuccess();
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
        if (onSuccess) onSuccess();
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

  return {
    deleteDialogOpen,
    deleteDialogData,
    handleDeleteUser,
    handleDeleteSelected,
    closeDeleteDialog,
    confirmDeleteUser
  };
};
