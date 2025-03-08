
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const useAuthForm = (mode: "login" | "signup") => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAdmin, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  // Get return URL from location state, if provided
  const returnUrl = location.state?.returnUrl || "/dashboard";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError(""); // Clear error when input changes
  };

  const validateForm = () => {
    if (mode === "signup" && !formData.name.trim()) {
      setFormError("Name is required");
      return false;
    }
    
    if (!formData.email.trim()) {
      setFormError("Email is required");
      return false;
    }
    
    if (!formData.password.trim()) {
      setFormError("Password is required");
      return false;
    }
    
    if (mode === "signup" && formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      if (mode === "login") {
        const success = await login(formData.email, formData.password);
        if (success) {
          // First check if the user is a superadmin, then check if they're an admin
          if (isSuperAdmin) {
            navigate("/admin/dashboard");
          } else if (isAdmin) {
            navigate("/admin");
          } else {
            // For regular users, navigate to the return URL
            navigate(returnUrl);
          }
          
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
        } else {
          setFormError("Invalid email or password");
        }
      } else {
        const success = await register(formData.email, formData.password, formData.name);
        if (success) {
          if (returnUrl === "/checkout") {
            // For checkout flow, go directly to checkout
            navigate(returnUrl);
          } else {
            // Default redirect
            navigate("/dashboard");
          }
          
          toast({
            title: "Account created",
            description: "Your account has been successfully created.",
          });
        } else {
          setFormError("Registration failed. Email may already be in use.");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setFormError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    formError,
    isLoading,
    handleChange,
    handleSubmit
  };
};
