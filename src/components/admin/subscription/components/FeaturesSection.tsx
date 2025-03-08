
import React from "react";
import { 
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PlanFormValues } from "../hooks/usePlanForm";

interface FeaturesSectionProps {
  form: UseFormReturn<PlanFormValues>;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  form,
  onAddFeature,
  onRemoveFeature
}) => {
  return (
    <div className="space-y-4 md:col-span-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Features</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddFeature}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {form.watch("features").map((feature, index) => (
        <div key={index} className="flex items-start gap-2">
          <FormField
            control={form.control}
            name={`features.${index}.text`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Feature description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`features.${index}.included`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemoveFeature(index)}
            disabled={form.watch("features").length === 1}
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
