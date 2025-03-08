
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FormSelect = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option"
}: FormSelectProps) => {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" className="w-full bg-popover">
          {options.map(option => (
            <SelectItem key={option.value} value={option.value} className="cursor-pointer">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;
