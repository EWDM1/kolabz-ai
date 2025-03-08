
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubscriptionPlan, PlanFeature } from "@/hooks/subscription/types";

// Form validation schema
export const planFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price_monthly: z.coerce.number().min(0, "Price must be positive"),
  price_annual: z.coerce.number().min(0, "Price must be positive"),
  currency: z.string().min(1, "Currency is required"),
  trial_days: z.coerce.number().min(0, "Trial days must be positive"),
  active: z.boolean().default(true),
  features: z.array(z.object({
    text: z.string().min(1, "Feature text is required"),
    included: z.boolean().default(true)
  }))
});

export type PlanFormValues = z.infer<typeof planFormSchema>;

export interface UsePlanFormProps {
  plan?: SubscriptionPlan;
  onSave: (plan: Partial<SubscriptionPlan>) => Promise<any>;
  onClose: () => void;
}

export const usePlanForm = ({ plan, onSave, onClose }: UsePlanFormProps) => {
  const [loading, setLoading] = useState(false);

  // Initialize form with default values or current plan values
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price_monthly: 0,
      price_annual: 0,
      currency: "usd",
      trial_days: 7,
      active: true,
      features: [{ text: "", included: true }]
    }
  });

  // Update form values when plan changes
  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        description: plan.description || "",
        price_monthly: plan.price_monthly,
        price_annual: plan.price_annual,
        currency: plan.currency,
        trial_days: plan.trial_days,
        active: plan.active,
        features: plan.features && plan.features.length > 0 
          ? plan.features 
          : [{ text: "", included: true }]
      });
    } else {
      form.reset({
        name: "",
        description: "",
        price_monthly: 0,
        price_annual: 0,
        currency: "usd",
        trial_days: 7,
        active: true,
        features: [{ text: "", included: true }]
      });
    }
  }, [plan, form]);

  // Handle form submission
  const onSubmit = async (values: PlanFormValues) => {
    try {
      setLoading(true);
      // Filter out empty features and ensure text is defined
      const filteredFeatures: PlanFeature[] = values.features
        .filter(feature => feature.text && feature.text.trim() !== "")
        .map(feature => ({
          text: feature.text,
          included: feature.included
        }));

      // Construct the plan data object
      const planData: Partial<SubscriptionPlan> = {
        ...values,
        features: filteredFeatures
      };
      
      // Include ID if editing an existing plan
      if (plan?.id) {
        planData.id = plan.id;
      }

      await onSave(planData);
      onClose();
    } catch (error) {
      console.error("Error saving plan:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new feature
  const addFeature = () => {
    const currentFeatures = form.getValues("features");
    form.setValue("features", [
      ...currentFeatures,
      { text: "", included: true }
    ]);
  };

  // Handle removing a feature
  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features");
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  return {
    form,
    loading,
    onSubmit,
    addFeature,
    removeFeature,
    isEditing: !!plan
  };
};
