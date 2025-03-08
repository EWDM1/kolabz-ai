
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SAVED_PROMPT_KEY } from "./hooks/usePromptForm";

import FormSelect from "./components/FormSelect";
import AdvancedOptions from "./components/AdvancedOptions";
import FormActions from "./components/FormActions";
import { 
  LLM_OPTIONS, 
  SPECIALTY_OPTIONS, 
  TONE_OPTIONS, 
  DETAIL_OPTIONS 
} from "./constants/form-options";

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
      <FormSelect 
        id="llm-select"
        label="Target AI Model"
        options={LLM_OPTIONS}
        value={llm}
        onChange={setLlm}
        placeholder="Select AI model"
      />

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
        <FormSelect 
          id="specialty-select"
          label="Area of Specialty"
          options={SPECIALTY_OPTIONS}
          value={specialty}
          onChange={setSpecialty}
          placeholder="Select specialty"
        />
        
        <FormSelect 
          id="tone-select"
          label="Tone"
          options={TONE_OPTIONS}
          value={tone}
          onChange={setTone}
          placeholder="Select tone"
        />
        
        <FormSelect 
          id="detail-select"
          label="Detail Level"
          options={DETAIL_OPTIONS}
          value={detailLevel}
          onChange={setDetailLevel}
          placeholder="Select detail level"
        />
      </div>
      
      <AdvancedOptions 
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
        context={context}
        setContext={setContext}
        specificQuestions={specificQuestions}
        setSpecificQuestions={setSpecificQuestions}
        constraints={constraints}
        setConstraints={setConstraints}
      />
      
      <FormActions 
        isGenerating={isGenerating}
        onGeneratePrompt={onGeneratePrompt}
        onClearForm={handleClearForm}
        isFormEmpty={!promptObjective.trim()}
      />
      
      {error && (
        <div className="text-sm text-destructive mt-2 p-2 bg-destructive/10 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default PromptOptimizerForm;
