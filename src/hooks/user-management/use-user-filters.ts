
import { useState, useCallback } from 'react';
import { AdminUser } from "@/components/admin/user-management/types";

export interface FilterValues {
  name: string;
  email: string;
  role: string;
  status: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const initialFilterValues: FilterValues = {
  name: '',
  email: '',
  role: '',
  status: '',
  dateRange: {
    from: undefined,
    to: undefined
  }
};

export const useUserFilters = () => {
  const [filterValues, setFilterValues] = useState<FilterValues>(initialFilterValues);
  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilterChange = useCallback((key: keyof FilterValues, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterValues(initialFilterValues);
  }, []);

  const toggleFilterVisible = useCallback(() => {
    setFilterVisible(prev => !prev);
  }, []);

  const filterUsers = useCallback((users: AdminUser[]) => {
    return users.filter(user => {
      // Filter by name
      if (filterValues.name && !user.name.toLowerCase().includes(filterValues.name.toLowerCase())) {
        return false;
      }
      
      // Filter by email
      if (filterValues.email && !user.email.toLowerCase().includes(filterValues.email.toLowerCase())) {
        return false;
      }
      
      // Filter by role
      if (filterValues.role && user.role !== filterValues.role) {
        return false;
      }
      
      // Filter by status
      if (filterValues.status && user.status !== filterValues.status) {
        return false;
      }
      
      // Filter by date (last active date)
      if (user.lastActive) {
        const userActiveDate = new Date(user.lastActive);
        
        if (filterValues.dateRange.from && userActiveDate < filterValues.dateRange.from) {
          return false;
        }
        
        if (filterValues.dateRange.to) {
          const toDateEnd = new Date(filterValues.dateRange.to);
          toDateEnd.setHours(23, 59, 59, 999);
          
          if (userActiveDate > toDateEnd) {
            return false;
          }
        }
      }
      
      return true;
    });
  }, [filterValues]);

  return {
    filterValues,
    handleFilterChange,
    resetFilters,
    filterVisible,
    toggleFilterVisible,
    filterUsers
  };
};
