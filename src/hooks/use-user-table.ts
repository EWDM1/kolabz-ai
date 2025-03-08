
import { useState, useEffect } from 'react';
import { useUserData } from './user-management/use-user-data';
import { useUserFilters, FilterValues } from './user-management/use-user-filters';
import { AdminUser } from "@/components/admin/user-management/types";

export const useUserTable = (filters?: FilterValues) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const { allUsers, loading, error, fetchUsers } = useUserData();
  const { filteredUsers } = useUserFilters({ allUsers, filters: filters || {} });

  // Update users when filters change
  useEffect(() => {
    setUsers(filteredUsers);
  }, [filteredUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers
  };
};
