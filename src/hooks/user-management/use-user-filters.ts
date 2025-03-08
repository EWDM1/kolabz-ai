
import { useState } from "react";
import { AdminUser } from "@/components/admin/user-management/types";

export interface FilterValues {
  name: string;
  email: string;
  role: string;
  status: string;
}

export const useUserFilters = () => {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    name: "",
    email: "",
    role: "",
    status: ""
  });
  
  const [filterVisible, setFilterVisible] = useState(false);
  
  const handleFilterChange = (field: keyof FilterValues, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const resetFilters = () => {
    setFilterValues({
      name: "",
      email: "",
      role: "",
      status: ""
    });
  };
  
  const toggleFilterVisible = () => {
    setFilterVisible(prev => !prev);
  };
  
  const filterUsers = (users: AdminUser[]) => {
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
      
      return true;
    });
  };
  
  return {
    filterValues,
    handleFilterChange,
    resetFilters,
    filterVisible,
    toggleFilterVisible,
    filterUsers
  };
};
