
import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import OptimizedPromptResult from "./OptimizedPromptResult";
import { usePromptForm } from "./hooks/usePromptForm";
import { usePromptGenerator } from "./hooks/usePromptGenerator";
import PromptOptimizerTabs from "./PromptOptimizerTabs";

interface PromptOptimizerToolProps {
  onSavePrompt?: (prompt: string) => void;
}

const PromptOptimizerTool = ({ onSavePrompt }: PromptOptimizerToolProps) => {
  const { toast } = useToast();
  
  // Use our custom hooks
  const { 
    llm, setLlm,
    specialty, setSpecialty,
    tone, setTone,
    detailLevel, setDetailLevel,
    promptObjective, setPromptObjective,
    context, setContext,
    specificQuestions, setSpecificQuestions,
    constraints, setConstraints,
    optimizedPrompt, setOptimizedPrompt,
    handleClearForm
  } = usePromptForm();
  
  const { 
    generatePrompt, 
    isGenerating, 
    error 
  } = usePromptGenerator(setOptimizedPrompt);
  
  // Handle generating the prompt
  const handleGeneratePrompt = async () => {
    await generatePrompt({
      llm,
      specialty,
      tone,
      detailLevel,
      promptObjective,
      context,
      specificQuestions,
      constraints
    });
  };

  // Handle saving the prompt to library
  const handleSavePrompt = (prompt: string) => {
    // Save to localStorage
    localStorage.setItem("kolabz_last_optimized_prompt", prompt);
    
    // Call the onSavePrompt prop if provided (e.g., for saving to a database)
    if (onSavePrompt) {
      onSavePrompt(prompt);
    }
    
    // Display a toast notification
    toast({
      title: "Prompt Saved",
      description: "Your prompt has been saved locally and will be available when you return"
    });
  };

  return (
    <Card className="max-w-4xl w-full mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Prompt Optimizer</CardTitle>
            <CardDescription>Create structured prompts tailored to any AI model</CardDescription>
          </div>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <PromptOptimizerTabs
          llm={llm}
          setLlm={setLlm}
          specialty={specialty}
          setSpecialty={setSpecialty}
          tone={tone}
          setTone={setTone}
          detailLevel={detailLevel}
          setDetailLevel={setDetailLevel}
          promptObjective={promptObjective}
          setPromptObjective={setPromptObjective}
          context={context}
          setContext={setContext}
          specificQuestions={specificQuestions}
          setSpecificQuestions={setSpecificQuestions}
          constraints={constraints}
          setConstraints={setConstraints}
          isGenerating={isGenerating}
          onGeneratePrompt={handleGeneratePrompt}
          onClearForm={handleClearForm}
          error={error}
        />
        
        {optimizedPrompt && (
          <OptimizedPromptResult 
            optimizedPrompt={optimizedPrompt} 
            onSavePrompt={handleSavePrompt}
          />
        )}
      </CardContent>
      
      <CardFooter className="border-t border-border pt-4">
        <div className="text-xs text-muted-foreground">
          Optimized for {llm}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PromptOptimizerTool;
