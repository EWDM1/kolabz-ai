
import { useMemo } from 'react';
import { AdminUser } from "@/components/admin/user-management/types";

export interface FilterValues {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

interface UseUserFiltersProps {
  allUsers: AdminUser[];
  filters: FilterValues;
}

interface UseUserFiltersResult {
  filteredUsers: AdminUser[];
}

export const useUserFilters = ({ allUsers, filters }: UseUserFiltersProps): UseUserFiltersResult => {
  // Apply filters to users
  const filteredUsers = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) return allUsers;
    
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

  return {
    filteredUsers
  };
};
