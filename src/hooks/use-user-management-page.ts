import { useState, useCallback } from 'react';
import { AdminUser } from "@/components/admin/user-management/types";

export interface FilterValues {
  name: string;
  email: string;
  role: string;
  status: string;
}

export const useUserManagementPage = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    name: '',
    email: '',
    role: '',
    status: '',
  });
  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilterChange = useCallback((field: keyof FilterValues, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterValues({
      name: '',
      email: '',
      role: '',
      status: '',
    });
  }, []);

  const toggleFilterVisible = useCallback(() => {
    setFilterVisible(prev => !prev);
  }, []);

  const filterUsers = useCallback((users: AdminUser[]): AdminUser[] => {
    return users.filter(user => {
      const nameMatch = !filterValues.name || 
        user.name.toLowerCase().includes(filterValues.name.toLowerCase());
      
      const emailMatch = !filterValues.email || 
        user.email.toLowerCase().includes(filterValues.email.toLowerCase());
      
      const roleMatch = !filterValues.role || user.role === filterValues.role;
      
      const statusMatch = !filterValues.status || user.status === filterValues.status;
      
      return nameMatch && emailMatch && roleMatch && statusMatch;
    });
  }, [filterValues]);

  return {
    selectedUsers,
    setSelectedUsers,
    filterValues,
    handleFilterChange,
    resetFilters,
    filterVisible,
    toggleFilterVisible,
    filterUsers,
  };
};
