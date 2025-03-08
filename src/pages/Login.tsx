
import { Link, useLocation } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/components/LanguageContext";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { user, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Check if we have a returnUrl in the location state
  const returnUrl = location.state?.returnUrl || '/';
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (isSuperAdmin) {
        navigate("/admin/dashboard");
      } else if (isAdmin) {
        navigate("/admin");
      } else {
        navigate(returnUrl);
      }
    }
  }, [user, isAdmin, isSuperAdmin, navigate, returnUrl]);
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link to="/" className="mb-8 inline-block">
          <img 
            src="/lovable-uploads/69364710-57d5-42d2-b6ca-740993198589.png" 
            alt="Kolabz Icon" 
            className="h-16" 
          />
        </Link>
        <div className="w-full max-w-md space-y-8">
          <div className="relative z-10 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <AuthForm mode="login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
