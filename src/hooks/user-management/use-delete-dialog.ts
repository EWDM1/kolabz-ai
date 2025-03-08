
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DeleteDialogData } from "@/components/admin/user-management/types";

export const useDeleteDialog = (
  selectedUsers: string[],
  onDeleteSuccess: () => Promise<void>
) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogData, setDeleteDialogData] = useState<DeleteDialogData>({
    isMultiple: false
  });
  const { toast } = useToast();

  const handleDeleteUser = (userId: string) => {
    setDeleteDialogData({
      isMultiple: false,
      userId
    });
    setDeleteDialogOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    
    setDeleteDialogData({
      isMultiple: true
    });
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const confirmDeleteUser = async () => {
    try {
      let userIds: string[] = [];
      
      if (deleteDialogData.isMultiple) {
        userIds = selectedUsers;
      } else if (deleteDialogData.userId) {
        userIds = [deleteDialogData.userId];
      }
      
      if (userIds.length === 0) return;
      
      // Delete users (soft delete approach)
      const { error } = await supabase
        .from("users")
        .update({ deleted: true, status: "inactive" })
        .in("id", userIds);
      
      if (error) throw error;
      
      // Close dialog and refresh list
      closeDeleteDialog();
      await onDeleteSuccess();
      
      toast({
        title: "Success",
        description: `${userIds.length > 1 ? "Users" : "User"} successfully deleted`,
      });
    } catch (error: any) {
      console.error("Error deleting user(s):", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete user(s)",
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
