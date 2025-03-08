
import { useState, useCallback, useEffect } from 'react';
import { AdminUser } from "@/components/admin/user-management/types";
import { useToast } from "@/hooks/use-toast";

// Mocked data since we're not actually connecting to Supabase in this example
const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '2023-04-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    lastActive: '2023-04-14T15:30:00Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user', // Changed from moderator to match AdminUser type
    status: 'inactive',
    lastActive: '2023-03-25T08:15:00Z'
  }
];

export const useUserData = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users function - currently mocked
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set mock data
      setUsers(mockUsers);
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
