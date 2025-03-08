
import React from "react";
import SubscriptionTestModeToggle from "@/components/subscription/SubscriptionTestModeToggle";

interface TestModeSectionProps {
  testMode: boolean;
  onToggle: () => void;
  canAccessTestMode: boolean;
}

export const TestModeSection = ({ 
  testMode, 
  onToggle, 
  canAccessTestMode 
}: TestModeSectionProps) => {
  if (!canAccessTestMode) return null;
  
  return (
    <SubscriptionTestModeToggle 
      testMode={testMode} 
      onToggle={onToggle} 
    />
  );
};
