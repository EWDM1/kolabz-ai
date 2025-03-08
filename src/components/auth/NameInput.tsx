
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameInput = ({ value, onChange }: NameInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        placeholder="John Doe"
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
