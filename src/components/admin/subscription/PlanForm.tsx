
import React, { useState, useEffect } from "react";
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
import { useSubscriptionPlans } from "@/hooks/subscription/use-subscription-plans";

interface PlanFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (plan: Partial<SubscriptionPlan>) => Promise<any>;
  plan?: SubscriptionPlan;
  planId?: string;
  onSaveSuccess?: (id: string) => void;
}

export function PlanForm({
  open = true,
  onOpenChange = () => {},
  onSave,
  plan,
  planId,
  onSaveSuccess
}: PlanFormProps) {
  const [isDialogMode, setIsDialogMode] = useState(false);
  const { plans, loading: plansLoading, savePlan } = useSubscriptionPlans();
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | undefined>(plan);
  const [loadingPlan, setLoadingPlan] = useState(false);

  // Set dialog mode based on whether open and onOpenChange props are used
  useEffect(() => {
    setIsDialogMode(open !== undefined && onOpenChange !== undefined);
  }, [open, onOpenChange]);

  // If planId is provided, find the plan in the plans list
  useEffect(() => {
    if (planId && plans.length > 0) {
      const foundPlan = plans.find(p => p.id === planId);
      setCurrentPlan(foundPlan);
    }
  }, [planId, plans]);

  const handleSave = async (planData: Partial<SubscriptionPlan>) => {
    try {
      setLoadingPlan(true);
      // Use provided onSave or fallback to the savePlan from useSubscriptionPlans
      const saveFunction = onSave || savePlan;
      const savedPlan = await saveFunction(planData);
      
      // Call onSaveSuccess if provided
      if (onSaveSuccess && savedPlan?.id) {
        onSaveSuccess(savedPlan.id);
      }
      
      return savedPlan;
    } finally {
      setLoadingPlan(false);
    }
  };

  const {
    form,
    loading,
    onSubmit,
    addFeature,
    removeFeature,
    isEditing
  } = usePlanForm({
    plan: currentPlan,
    onSave: handleSave,
    onClose: () => {
      if (isDialogMode) {
        onOpenChange(false);
      }
    }
  });

  // If we're loading the plan data and not in dialog mode, show a loading state
  if ((plansLoading || loadingPlan) && !isDialogMode && !currentPlan) {
    return (
      <div className="p-8 text-center">
        <p>Loading plan...</p>
      </div>
    );
  }

  const formContent = (
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

        <div className="flex justify-end gap-2">
          {isDialogMode ? null : (
            <Button 
              type="submit" 
              disabled={loading}
              className="ml-auto"
            >
              {loading ? "Saving..." : "Save Plan"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );

  // If we're in dialog mode, wrap in Dialog, otherwise return the form directly
  if (isDialogMode) {
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

          {formContent}

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={form.handleSubmit(onSubmit)} 
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Return the form directly for non-dialog mode
  return (
    <div className="p-6">
      {formContent}
    </div>
  );
}
