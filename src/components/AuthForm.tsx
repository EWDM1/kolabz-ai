
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast({
            title: "Login successful",
            description: "Welcome back! You're now logged in.",
          });
          navigate(from, { replace: true });
        }
      } else {
        // Check for valid input first
        if (!formData.name || formData.name.length < 2) {
          toast({
            variant: "destructive",
            title: "Invalid name",
            description: "Please enter a valid name (at least 2 characters).",
          });
          return;
        }
        
        const success = await register(formData.email, formData.password, formData.name);
        if (success) {
          toast({
            title: "Account created",
            description: "Your account has been created successfully.",
          });
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        variant: "destructive",
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{mode === "login" ? "Welcome back" : "Create an account"}</h1>
        <p className="text-muted-foreground">
          {mode === "login"
            ? "Enter your credentials to access your account"
            : "Enter your information to create an account"}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              minLength={2}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {mode === "login" && (
              <a href="#" className="text-sm text-primary hover:text-primary/90">
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            minLength={6}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "login" ? "Signing in..." : "Creating account..."}
            </>
          ) : (
            mode === "login" ? "Sign in" : "Create account"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-primary hover:text-primary/90">
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:text-primary/90">
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
