
import { useState, useEffect } from "react";
import { AdminUser } from "@/components/admin/user-management/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserData = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch users from Supabase
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (usersError) throw usersError;
      
      // Fetch roles for each user
      const userIds = usersData.map(user => user.id);
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .in("user_id", userIds);
      
      if (rolesError) throw rolesError;
      
      // Map roles to users
      const userRoles: Record<string, string[]> = {};
      rolesData?.forEach(role => {
        if (!userRoles[role.user_id]) {
          userRoles[role.user_id] = [];
        }
        userRoles[role.user_id].push(role.role);
      });
      
      // Format users with their highest role
      const formattedUsers: AdminUser[] = usersData.map(user => {
        // Determine the highest role (superadmin > admin > user)
        let highestRole = "user";
        const roles = userRoles[user.id] || [];
        
        if (roles.includes("superadmin")) {
          highestRole = "superadmin";
        } else if (roles.includes("admin")) {
          highestRole = "admin";
        }
        
        // Format last active date
        const lastActive = user.last_sign_in_at 
          ? new Date(user.last_sign_in_at).toLocaleDateString()
          : "Never";
        
        return {
          id: user.id,
          name: user.name || user.email.split("@")[0],
          email: user.email,
          role: highestRole,
          status: user.status || "active",
          lastActive,
          created_at: user.created_at,
          updated_at: user.updated_at
        };
      });
      
      setUsers(formattedUsers);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, fetchUsers };
};
