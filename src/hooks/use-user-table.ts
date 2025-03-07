
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/components/admin/user-management/types";
import { UserRole } from "@/components/admin/feature-management/types";

export const useUserTable = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
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
          .map(r => r.role as UserRole);
        
        // Determine the highest role
        let highestRole: UserRole = 'user';
        if (userRoles.includes('superadmin')) highestRole = 'superadmin';
        else if (userRoles.includes('admin')) highestRole = 'admin';
        
        // Find auth data for this user
        const authUser = authUsers.find(au => au.id === user.id);
        
        // Format the last login time
        let lastActive = 'Never';
        if (authUser?.last_sign_in_at) {
          const lastSignIn = new Date(authUser.last_sign_in_at);
          const now = new Date();
          const diffDays = Math.floor((now.getTime() - lastSignIn.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays < 1) {
            lastActive = `Today, ${lastSignIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          } else if (diffDays === 1) {
            lastActive = `Yesterday, ${lastSignIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          } else if (diffDays < 7) {
            lastActive = `${diffDays} days ago`;
          } else {
            lastActive = lastSignIn.toLocaleDateString();
          }
        }
        
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
      
      setUsers(formattedUsers);
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
    users,
    loading,
    error,
    fetchUsers
  };
};
