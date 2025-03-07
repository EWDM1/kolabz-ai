
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useRedirectForSuperAdmin } from '@/components/AuthContext';

const Dashboard = () => {
  // Use the custom hook for redirection logic
  useRedirectForSuperAdmin();
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Regular dashboard content for non-superadmin users
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <p className="mt-4 text-muted-foreground">
        Welcome to your dashboard! Here you can manage your activities.
      </p>
    </div>
  );
};

export default Dashboard;
