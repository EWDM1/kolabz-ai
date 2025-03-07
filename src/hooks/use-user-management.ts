
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/components/AuthContext";
import { AdminUser } from "@/components/admin/UserTable";

export const useUserManagement = (user: User | null) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEditUser = (user: AdminUser) => {
    navigate(`/admin/users/edit/${user.id}`);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);
        
        const isSuperAdmin = roles?.some(r => r.role === 'superadmin');
        
        if (isSuperAdmin && user?.role !== 'superadmin') {
          toast({
            variant: "destructive",
            title: "Permission denied",
            description: "You don't have permission to delete a superadmin user",
          });
          return;
        }
        
        const { error } = await supabase
          .from('users')
          .update({
            deleted: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);
        
        if (error) throw error;
        
        toast({
          title: "User deleted",
          description: "The user has been successfully removed.",
        });
        
        setSelectedUsers(selectedUsers.filter(id => id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        toast({
          variant: "destructive",
          title: "Failed to delete user",
          description: "An error occurred while trying to delete the user.",
        });
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
      try {
        for (const userId of selectedUsers) {
          const { error } = await supabase
            .from('users')
            .update({
              deleted: true,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
          
          if (error) throw error;
        }
        
        toast({
          title: `${selectedUsers.length} users deleted`,
          description: "The selected users have been successfully removed.",
        });
        
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error deleting users:", error);
        toast({
          variant: "destructive",
          title: "Failed to delete users",
          description: "An error occurred while trying to delete the selected users.",
        });
      }
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
    handleFilter
  };
};
