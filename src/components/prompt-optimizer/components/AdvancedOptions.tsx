
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdvancedOptionsProps {
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
  context: string;
  setContext: (value: string) => void;
  specificQuestions: string;
  setSpecificQuestions: (value: string) => void;
  constraints: string;
  setConstraints: (value: string) => void;
}

const AdvancedOptions = ({
  showAdvanced,
  setShowAdvanced,
  context,
  setContext,
  specificQuestions,
  setSpecificQuestions,
  constraints,
  setConstraints
}: AdvancedOptionsProps) => {
  return (
    <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced} className="w-full border rounded-md p-2">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium py-2 px-2 hover:bg-muted/50 rounded">
        <span>Advanced Options</span>
        {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="context-input">Context (Optional)</Label>
          <Input
            id="context-input"
            placeholder="Add background information or constraints"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="specific-questions">Specific Questions (Optional)</Label>
          <Textarea
            id="specific-questions"
            placeholder="Add specific questions you want answered (one per line)"
            className="min-h-[80px]"
            value={specificQuestions}
            onChange={(e) => setSpecificQuestions(e.target.value)}
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="constraints-input">Constraints (Optional)</Label>
          <Input
            id="constraints-input"
            placeholder="e.g., 'Keep it under 500 words' or 'Avoid technical jargon'"
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AdvancedOptions;
