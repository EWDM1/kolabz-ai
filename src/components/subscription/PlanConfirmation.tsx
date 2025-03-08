
import { CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlanConfirmationProps {
  selectedPlan: string;
  loading: boolean;
  onConfirm: () => void;
}

const PlanConfirmation = ({ selectedPlan, loading, onConfirm }: PlanConfirmationProps) => {
  return (
    <div className="mt-8 p-6 bg-card border border-border rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">Confirm your plan change</h3>
          <p className="text-muted-foreground">
            {selectedPlan === "pro" ? (
              "You're selecting the Pro plan, perfect for individual use and small projects."
            ) : (
              "You're upgrading to the Elite plan with all premium features included."
            )}
          </p>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <CreditCard className="mr-2 h-4 w-4" />
            Your card ending in 4242 will be charged on Aug 12, 2023
          </div>
        </div>
        <Button 
          size="lg" 
          onClick={onConfirm}
          className="w-full md:w-auto"
          disabled={loading}
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Confirm Plan Change
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlanConfirmation;
