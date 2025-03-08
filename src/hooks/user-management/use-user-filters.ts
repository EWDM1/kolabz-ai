
import { useState, useCallback } from 'react';
import { AdminUser } from "@/components/admin/user-management/types";

export interface FilterValues {
  role: string;
  status: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const initialFilterValues: FilterValues = {
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
      // Filter by role
      if (filterValues.role && user.role !== filterValues.role) {
        return false;
      }
      
      // Filter by status
      if (filterValues.status && user.status !== filterValues.status) {
        return false;
      }
      
      // Filter by date (creation date)
      const userCreatedDate = new Date(user.createdAt);
      
      if (filterValues.dateRange.from && userCreatedDate < filterValues.dateRange.from) {
        return false;
      }
      
      if (filterValues.dateRange.to) {
        const toDateEnd = new Date(filterValues.dateRange.to);
        toDateEnd.setHours(23, 59, 59, 999);
        
        if (userCreatedDate > toDateEnd) {
          return false;
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
