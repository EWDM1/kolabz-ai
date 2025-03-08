
import { useState, useCallback, useEffect } from 'react';
import { AdminUser } from "@/components/admin/user-management/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useUserData = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [fetchUsers]);

  return {
    users,
    loading,
    fetchUsers
  };
};
