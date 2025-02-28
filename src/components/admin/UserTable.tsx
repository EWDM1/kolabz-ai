
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash, CheckCircle, XCircle } from "lucide-react";
import { User, UserRole } from "@/components/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export interface AdminUser extends User {
  status: "active" | "inactive";
  lastLogin?: string;
  lastActive?: string;
}

interface UserTableProps {
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onEdit?: (user: AdminUser) => void;
  onDelete?: (userId: string) => void;
}

export function UserTable({ 
  selectedUsers,
  setSelectedUsers,
  onEdit,
  onDelete 
}: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
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
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case "superadmin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "user":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  if (loading) {
    return <div className="py-8 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-destructive">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8 w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button size="sm" onClick={fetchUsers}>
          Refresh
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b">
                <th className="py-3 px-4 text-left font-medium">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(users.map(user => user.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    checked={selectedUsers.length === users.length && users.length > 0}
                  />
                </th>
                <th className="py-3 px-4 text-left font-medium">User</th>
                <th className="py-3 px-4 text-left font-medium">Email</th>
                <th className="py-3 px-4 text-left font-medium">Role</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Last Active</th>
                <th className="py-3 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleRowSelection(user.id)}
                      />
                    </td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.status === "inactive" ? (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                          <XCircle className="h-4 w-4" />
                          Inactive
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{user.lastActive}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                            onClick={() => onEdit(user)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                            onClick={() => onDelete(user.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No users found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
