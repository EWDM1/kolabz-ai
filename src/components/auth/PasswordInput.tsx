
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showForgotPassword?: boolean;
}

export const PasswordInput = ({ 
  value, 
  onChange, 
  showForgotPassword = false 
}: PasswordInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Password</Label>
        {showForgotPassword && (
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
