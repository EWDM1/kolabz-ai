
import { AlertCircle } from "lucide-react";

interface TestModeAlertProps {
  testMode: boolean;
  canAccessTestMode: boolean;
}

const TestModeAlert = ({ testMode, canAccessTestMode }: TestModeAlertProps) => {
  if (!testMode || !canAccessTestMode) return null;
  
  return (
    <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300 p-4 rounded-lg mb-6 flex items-start gap-3">
      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="font-medium">Stripe Test Mode Active</h3>
        <p className="text-sm mt-1">
          You're currently in test mode. No real charges will be made when changing plans.
        </p>
      </div>
    </div>
  );
};

export default TestModeAlert;
