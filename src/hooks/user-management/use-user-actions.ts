
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/components/admin/user-management/types";
import { canDeleteUser } from "@/utils/user-utils";

interface UseUserActionsProps {
  currentUserId?: string;
}

export const useUserActions = ({ currentUserId }: UseUserActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEditUser = (user: AdminUser) => {
    navigate(`/admin/users/edit/${user.id}`);
  };

  const performUserDeletion = async (userId: string) => {
    try {
      if (!currentUserId) return false;
      
      const userCanDelete = await canDeleteUser(currentUserId, userId);
      
      if (!userCanDelete) {
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

  return {
    handleEditUser,
    performUserDeletion
  };
};
