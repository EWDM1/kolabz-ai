
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { SubscriptionPlan } from "@/hooks/subscription/types";
import { usePlanForm } from "./hooks/usePlanForm";
import { BasicInfoSection } from "./components/BasicInfoSection";
import { PricingSection } from "./components/PricingSection";
import { FeaturesSection } from "./components/FeaturesSection";

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
  const {
    form,
    loading,
    onSubmit,
    addFeature,
    removeFeature,
    isEditing
  } = usePlanForm({
    plan,
    onSave,
    onClose: () => onOpenChange(false)
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Plan" : "Add New Plan"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to the subscription plan."
              : "Create a new subscription plan."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <BasicInfoSection form={form} />

              {/* Pricing & Trial */}
              <Separator className="md:col-span-2" />
              <PricingSection form={form} />

              {/* Features */}
              <Separator className="md:col-span-2" />
              <FeaturesSection 
                form={form}
                onAddFeature={addFeature}
                onRemoveFeature={removeFeature}
              />
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
