
import React from "react";
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { PlanFormValues } from "../hooks/usePlanForm";

interface PricingSectionProps {
  form: UseFormReturn<PlanFormValues>;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  form
}) => {
  return (
    <div className="space-y-4 md:col-span-2">
      <h3 className="text-lg font-medium">Pricing & Trial</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="price_monthly"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Price (in cents)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Enter price in cents (e.g., $9.99 = 999)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price_annual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Price (in cents)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Enter price in cents (e.g., $99.99 = 9999)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Input placeholder="usd" {...field} />
              </FormControl>
              <FormDescription>
                Three-letter ISO currency code (e.g., usd, eur)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trial_days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Free Trial Days</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Number of days for the free trial
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="active"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Active Plan</FormLabel>
              <FormDescription>
                Make this plan available to customers
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
