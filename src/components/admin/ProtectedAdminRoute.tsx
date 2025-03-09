
import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAdmin, loading } = useAuth();
  
  // If authentication is still loading, show a loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  // If user is not an admin, redirect to dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  // If user is an admin, render the admin page
  return <>{children}</>;
}
