
import { useState, useEffect } from 'react';
import { useUserData } from './user-management/use-user-data';
import { useUserFilters, FilterValues } from './user-management/use-user-filters';
import { AdminUser } from "@/components/admin/user-management/types";

export const useUserTable = (initialFilters?: FilterValues) => {
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const { users, loading, fetchUsers } = useUserData();
  const { filterUsers, filterValues } = useUserFilters();

  // Update filtered users when users or filters change
  useEffect(() => {
    const filtered = filterUsers(users);
    setFilteredUsers(filtered);
  }, [users, filterValues, filterUsers]);

  return {
    users: filteredUsers,
    allUsers: users,
    loading,
    fetchUsers
  };
};
