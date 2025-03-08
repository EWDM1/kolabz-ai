
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, MinusCircle } from "lucide-react";
import { 
  SubscriptionPlan, 
  PlanFeature 
} from "@/hooks/subscription/use-subscription-plans";

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

interface PlanFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (plan: Partial<SubscriptionPlan>) => Promise<any>;
  plan?: SubscriptionPlan;
}

export function PlanForm({
  open,
  onOpenChange,
  onSave,
  plan
}: PlanFormProps) {
  const [loading, setLoading] = useState(false);

  // Initialize form with default values or current plan values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
  const onSubmit = async (values: FormValues) => {
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
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan ? "Edit Plan" : "Add New Plan"}</DialogTitle>
          <DialogDescription>
            {plan
              ? "Make changes to the subscription plan."
              : "Create a new subscription plan."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
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

              {/* Pricing */}
              <div className="space-y-4 md:col-span-2">
                <Separator />
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

              {/* Features */}
              <div className="space-y-4 md:col-span-2">
                <Separator />
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Features</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
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
                      onClick={() => removeFeature(index)}
                      disabled={form.watch("features").length === 1}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Plan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
