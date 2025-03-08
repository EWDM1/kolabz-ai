
import React from "react";

interface FormErrorProps {
  error: string;
}

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
      {error}
    </div>
  );
};
