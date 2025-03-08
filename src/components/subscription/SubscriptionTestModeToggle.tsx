
import React from "react";
import { Button } from "@/components/ui/button";

interface SubscriptionTestModeToggleProps {
  testMode: boolean;
  onToggle: () => void;
}

const SubscriptionTestModeToggle = ({ 
  testMode, 
  onToggle 
}: SubscriptionTestModeToggleProps) => {
  return (
    <div className="mb-6">
      <Button
        variant={testMode ? "outline" : "ghost"}
        size="sm"
        onClick={onToggle}
        className={testMode ? "border-orange-300 text-orange-600" : ""}
      >
        {testMode ? "Test Mode" : "Live Mode"}
      </Button>
      {testMode && (
        <p className="text-xs text-orange-600 mt-1">
          You are in test mode. No real charges will be made.
        </p>
      )}
    </div>
  );
};

export default SubscriptionTestModeToggle;
