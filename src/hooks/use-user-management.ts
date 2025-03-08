
import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { useUserActions } from "./user-management/use-user-actions";
import { useDeleteDialog } from "./user-management/use-delete-dialog";
import { AdminUser } from "@/components/admin/user-management/types";

export const useUserManagement = (currentUser: any) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const { handleEditUser } = useUserActions({ 
    currentUserId: currentUser?.id 
  });
  
  const { 
    deleteDialogOpen,
    deleteDialogData,
    handleDeleteUser,
    handleDeleteSelected,
    closeDeleteDialog,
    confirmDeleteUser
  } = useDeleteDialog({
    currentUserId: currentUser?.id,
    selectedUsers,
    setSelectedUsers
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
