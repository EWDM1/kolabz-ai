
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeProvider";

interface PromptDisplayProps {
  isEditing: boolean;
  optimizedPrompt: string;
  editablePrompt: string;
  onEditablePromptChange: (value: string) => void;
}

const PromptDisplay = ({
  isEditing,
  optimizedPrompt,
  editablePrompt,
  onEditablePromptChange,
}: PromptDisplayProps) => {
  const { theme } = useTheme();
  
  if (isEditing) {
    return (
      <Textarea
        value={editablePrompt}
        onChange={(e) => onEditablePromptChange(e.target.value)}
        className="min-h-[200px] font-mono text-sm"
      />
    );
  }
  
  return (
    <div
      className={`p-4 rounded-lg border ${
        theme === "dark"
          ? "border-gray-700 bg-gray-800/50"
          : "border-gray-200 bg-gray-50/80"
      }`}
    >
      <pre className="whitespace-pre-wrap text-sm font-mono">{optimizedPrompt}</pre>
    </div>
  );
};

export default PromptDisplay;
