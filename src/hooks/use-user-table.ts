
import { useState, useEffect, useMemo } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/components/admin/user-management/types";
import { UserRole } from "@/components/admin/feature-management/types";

interface FilterValues {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

export const useUserTable = (filters?: FilterValues) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
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
      
      setAllUsers(formattedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to users
  const filteredUsers = useMemo(() => {
    if (!filters) return allUsers;
    
    return allUsers.filter(user => {
      // Filter by name (case insensitive)
      if (filters.name && !user.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      
      // Filter by email (case insensitive)
      if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
        return false;
      }
      
      // Filter by role
      if (filters.role && user.role !== filters.role) {
        return false;
      }
      
      // Filter by status
      if (filters.status && user.status !== filters.status) {
        return false;
      }
      
      return true;
    });
  }, [allUsers, filters]);

  // Update users when filters change
  useEffect(() => {
    setUsers(filteredUsers);
  }, [filteredUsers]);

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
