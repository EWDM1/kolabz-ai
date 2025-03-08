
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ObjectiveInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ObjectiveInput = ({ value, onChange }: ObjectiveInputProps) => {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="prompt-objective">What do you want the AI to do? <span className="text-primary">*</span></Label>
      <Textarea
        id="prompt-objective"
        placeholder="Be specific about your objective (e.g., 'Create a content calendar for a product launch')"
        className="min-h-[80px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ObjectiveInput;
