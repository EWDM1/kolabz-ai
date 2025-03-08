
import React from "react";
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PlanFormValues } from "../hooks/usePlanForm";

interface BasicInfoSectionProps {
  form: UseFormReturn<PlanFormValues>;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  form
}) => {
  return (
    <div className="space-y-4 md:col-span-2">
      <h3 className="text-lg font-medium">Basic Information</h3>
      
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Pro Plan" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Perfect for small teams"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
