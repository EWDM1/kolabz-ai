import { useState } from "react";
import { Brain, ChevronDown, ChevronUp, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

const LLM_OPTIONS = [
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-3.5", label: "GPT-3.5" },
  { value: "claude", label: "Claude" },
  { value: "gemini", label: "Gemini" },
  { value: "deepseek", label: "DeepSeek" },
  { value: "llama", label: "Llama" },
  { value: "mistral", label: "Mistral" }
];

const SPECIALTY_OPTIONS = [
  { value: "writing", label: "Content Writing" },
  { value: "code", label: "Programming/Code" },
  { value: "data", label: "Data Analysis" },
  { value: "creative", label: "Creative Writing" },
  { value: "business", label: "Business Strategy" },
  { value: "marketing", label: "Marketing" },
  { value: "academic", label: "Academic Research" },
  { value: "customer", label: "Customer Service" }
];

const TONE_OPTIONS = [
  { value: "formal", label: "Formal" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "humorous", label: "Humorous" },
  { value: "authoritative", label: "Authoritative" }
];

const DETAIL_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" }
];

interface PromptOptimizerFormProps {
  llm: string;
  setLlm: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  detailLevel: string;
  setDetailLevel: (value: string) => void;
  promptObjective: string;
  setPromptObjective: (value: string) => void;
  context: string;
  setContext: (value: string) => void;
  specificQuestions: string;
  setSpecificQuestions: (value: string) => void;
  constraints: string;
  setConstraints: (value: string) => void;
  isGenerating: boolean;
  onGeneratePrompt: () => void;
  error: string;
  onClearForm?: () => void;
}

const PromptOptimizerForm = ({
  llm,
  setLlm,
  specialty,
  setSpecialty,
  tone,
  setTone,
  detailLevel,
  setDetailLevel,
  promptObjective,
  setPromptObjective,
  context,
  setContext,
  specificQuestions,
  setSpecificQuestions,
  constraints,
  setConstraints,
  isGenerating,
  onGeneratePrompt,
  error,
  onClearForm
}: PromptOptimizerFormProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { toast } = useToast();

  const handleClearForm = () => {
    if (onClearForm) {
      onClearForm();
    } else {
      setLlm("gpt-4");
      setSpecialty("");
      setTone("");
      setDetailLevel("");
      setPromptObjective("");
      setContext("");
      setSpecificQuestions("");
      setConstraints("");
      
      localStorage.removeItem("kolabz_last_optimized_prompt");
      localStorage.removeItem("kolabz_prompt_form_state");
    }
    
    toast({
      title: "Form Cleared",
      description: "All form fields have been reset and saved data cleared"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1.5">
        <Label htmlFor="llm-select">Target AI Model</Label>
        <Select value={llm} onValueChange={setLlm}>
          <SelectTrigger id="llm-select" className="w-full">
            <SelectValue placeholder="Select AI model" />
          </SelectTrigger>
          <SelectContent position="popper" className="w-full bg-popover">
            {LLM_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="prompt-objective">What do you want the AI to do? <span className="text-primary">*</span></Label>
        <Textarea
          id="prompt-objective"
          placeholder="Be specific about your objective (e.g., 'Create a content calendar for a product launch')"
          className="min-h-[80px]"
          value={promptObjective}
          onChange={(e) => setPromptObjective(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="specialty-select">Area of Specialty</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty-select" className="w-full">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent position="popper" className="w-full bg-popover">
              {SPECIALTY_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="tone-select">Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone-select" className="w-full">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent position="popper" className="w-full bg-popover">
              {TONE_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="detail-select">Detail Level</Label>
          <Select value={detailLevel} onValueChange={setDetailLevel}>
            <SelectTrigger id="detail-select" className="w-full">
              <SelectValue placeholder="Select detail level" />
            </SelectTrigger>
            <SelectContent position="popper" className="w-full bg-popover">
              {DETAIL_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
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
      
      <div className="flex gap-2">
        <Button 
          onClick={onGeneratePrompt}
          className="flex-1" 
          size="lg"
          disabled={!promptObjective.trim() || isGenerating}
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
          onClick={handleClearForm}
          disabled={isGenerating}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Form
        </Button>
      </div>
      
      {error && (
        <div className="text-sm text-destructive mt-2 p-2 bg-destructive/10 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default PromptOptimizerForm;
