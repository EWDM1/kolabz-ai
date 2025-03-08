
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/components/auth/useAuthForm";
import { NameInput } from "@/components/auth/NameInput";
import { EmailInput } from "@/components/auth/EmailInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { FormError } from "@/components/auth/FormError";
import { AuthFooter } from "@/components/auth/AuthFooter";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const { 
    formData, 
    formError, 
    isLoading, 
    handleChange, 
    handleSubmit 
  } = useAuthForm(mode);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-muted-foreground">
          {mode === "login"
            ? "Enter your credentials to access your account"
            : "Enter your information to create an account"}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormError error={formError} />
        
        {mode === "signup" && (
          <NameInput value={formData.name} onChange={handleChange} />
        )}

        <EmailInput value={formData.email} onChange={handleChange} />

        <PasswordInput 
          value={formData.password} 
          onChange={handleChange} 
          showForgotPassword={mode === "login"} 
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? mode === "login"
              ? "Signing in..."
              : "Creating account..."
            : mode === "login"
            ? "Sign in"
            : "Create account"}
        </Button>
      </form>

      <AuthFooter mode={mode} />
    </div>
  );
};

export default AuthForm;
