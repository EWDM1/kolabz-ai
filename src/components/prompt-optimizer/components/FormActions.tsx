
import React from "react";
import { Brain, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isGenerating: boolean;
  onGeneratePrompt: () => void;
  onClearForm: () => void;
  isFormEmpty: boolean;
}

const FormActions = ({
  isGenerating,
  onGeneratePrompt,
  onClearForm,
  isFormEmpty
}: FormActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onGeneratePrompt}
        className="flex-1" 
        size="lg"
        disabled={isFormEmpty || isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Brain className="mr-2 h-4 w-4" />
            Generate Optimized Prompt
          </>
        )}
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={onClearForm}
        disabled={isGenerating}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Clear Form
      </Button>
    </div>
  );
};

export default FormActions;
