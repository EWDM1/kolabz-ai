
import { useState } from "react";
import { useUserActions } from "./user-management/use-user-actions";
import { useDeleteDialog } from "./user-management/use-delete-dialog";
import { AdminUser } from "@/components/admin/user-management/types";

export const useUserManagement = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const { handleEditUser } = useUserActions();
  
  const { 
    deleteDialogOpen,
    deleteDialogData,
    handleDeleteUser,
    handleDeleteSelected,
    closeDeleteDialog,
    confirmDeleteUser
  } = useDeleteDialog(selectedUsers, async () => {
    // Placeholder for fetchUsers, can be updated when needed
    console.log("Users would be fetched here");
  });

  return {
    selectedUsers,
    setSelectedUsers,
    handleEditUser,
    handleDeleteUser,
    handleDeleteSelected,
    deleteDialogOpen,
    closeDeleteDialog,
    confirmDeleteUser,
    deleteDialogData
  };
};
