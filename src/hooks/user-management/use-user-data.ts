
import { useState, useEffect, useMemo } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/components/admin/user-management/types";
import { formatLastActive, getHighestRole } from "@/utils/user-utils";

interface FetchUsersResult {
  allUsers: AdminUser[];
  loading: boolean;
  error: string;
  fetchUsers: () => Promise<void>;
}

export const useUserData = (): FetchUsersResult => {
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // First get all users from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, name, deleted');
      
      if (userError) throw userError;
      
      // Get all roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
      
      if (rolesError) throw rolesError;
      
      // Get auth users for last sign in time
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      const authUsers = authError ? [] : authData.users;
      
      // Map the data to our AdminUser format
      const formattedUsers: AdminUser[] = (userData || []).map(user => {
        // Get all roles for this user
        const userRoles = (rolesData || [])
          .filter(r => r.user_id === user.id)
          .map(r => r.role);
        
        // Determine the highest role
        const highestRole = getHighestRole(userRoles);
        
        // Find auth data for this user
        const authUser = authUsers.find(au => au.id === user.id);
        
        // Format the last login time
        const lastActive = formatLastActive(authUser?.last_sign_in_at);
        
        // Determine user status - either from the deleted flag or from auth user data
        const isDeleted = user.deleted === true;
        const isDisabled = authUser?.user_metadata?.disabled === true;
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: highestRole,
          status: isDeleted || isDisabled ? "inactive" : "active",
          lastActive
        };
      });
      
      setAllUsers(formattedUsers);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    allUsers,
    loading,
    error,
    fetchUsers
  };
};
