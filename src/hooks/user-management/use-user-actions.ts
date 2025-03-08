
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useUserActions = () => {
  const navigate = useNavigate();

  // Edit user function
  const handleEditUser = useCallback((userId: string) => {
    navigate(`/admin/users/edit/${userId}`);
  }, [navigate]);

  return {
    handleEditUser,
    navigate
  };
};
