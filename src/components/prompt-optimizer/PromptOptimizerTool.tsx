
import { useState, useEffect } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PromptOptimizerForm from "./PromptOptimizerForm";
import PromptExampleList from "./PromptExampleList";
import OptimizedPromptResult from "./OptimizedPromptResult";
import { Prompt } from "@/components/prompts/types";

// Local storage key
const SAVED_PROMPT_KEY = "kolabz_last_optimized_prompt";
const SAVED_FORM_STATE_KEY = "kolabz_prompt_form_state";

interface PromptOptimizerToolProps {
  onSavePrompt?: (prompt: string) => void;
}

interface FormState {
  llm: string;
  specialty: string;
  tone: string;
  detailLevel: string;
  promptObjective: string;
  context: string;
  specificQuestions: string;
  constraints: string;
}

const PromptOptimizerTool = ({ onSavePrompt }: PromptOptimizerToolProps) => {
  const { toast } = useToast();

  // Form state
  const [llm, setLlm] = useState("gpt-4");
  const [specialty, setSpecialty] = useState("");
  const [tone, setTone] = useState("");
  const [detailLevel, setDetailLevel] = useState("");
  const [promptObjective, setPromptObjective] = useState("");
  const [context, setContext] = useState("");
  const [specificQuestions, setSpecificQuestions] = useState("");
  const [constraints, setConstraints] = useState("");
  
  // UI state
  const [activeTab, setActiveTab] = useState("build");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  // Load saved state from localStorage on component mount
  useEffect(() => {
    // Load the last generated prompt
    const savedPrompt = localStorage.getItem(SAVED_PROMPT_KEY);
    if (savedPrompt) {
      setOptimizedPrompt(savedPrompt);
    }

    // Load form state
    const savedFormState = localStorage.getItem(SAVED_FORM_STATE_KEY);
    if (savedFormState) {
      try {
        const parsedState = JSON.parse(savedFormState) as FormState;
        setLlm(parsedState.llm || "gpt-4");
        setSpecialty(parsedState.specialty || "");
        setTone(parsedState.tone || "");
        setDetailLevel(parsedState.detailLevel || "");
        setPromptObjective(parsedState.promptObjective || "");
        setContext(parsedState.context || "");
        setSpecificQuestions(parsedState.specificQuestions || "");
        setConstraints(parsedState.constraints || "");
      } catch (err) {
        console.error("Error parsing saved form state:", err);
      }
    }
  }, []);

  // Save form state to localStorage whenever it changes
  useEffect(() => {
    const formState: FormState = {
      llm,
      specialty,
      tone,
      detailLevel,
      promptObjective,
      context,
      specificQuestions,
      constraints
    };
    
    localStorage.setItem(SAVED_FORM_STATE_KEY, JSON.stringify(formState));
  }, [llm, specialty, tone, detailLevel, promptObjective, context, specificQuestions, constraints]);

  // Handle selecting an example prompt
  const handleSelectExample = (example: string) => {
    setPromptObjective(example);
    setActiveTab("build");
  };

  // Handle clearing the form
  const handleClearForm = () => {
    // Reset all form fields to default values
    setLlm("gpt-4");
    setSpecialty("");
    setTone("");
    setDetailLevel("");
    setPromptObjective("");
    setContext("");
    setSpecificQuestions("");
    setConstraints("");
    setOptimizedPrompt("");
    
    // Clear local storage
    localStorage.removeItem(SAVED_PROMPT_KEY);
    localStorage.removeItem(SAVED_FORM_STATE_KEY);
  };

  // Handle generating the prompt
  const handleGeneratePrompt = async () => {
    if (!promptObjective.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      const { data, error } = await supabase.functions.invoke("optimize-prompt", {
        body: {
          llm,
          specialty,
          tone,
          detailLevel,
          promptObjective,
          context,
          specificQuestions,
          constraints
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to generate prompt");
      }

      if (data && data.optimizedPrompt) {
        setOptimizedPrompt(data.optimizedPrompt);
        // Save to localStorage
        localStorage.setItem(SAVED_PROMPT_KEY, data.optimizedPrompt);
        
        toast({
          title: "Success!",
          description: "Your optimized prompt has been generated and saved"
        });
      } else if (data && data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("No response from the server");
      }
    } catch (err: any) {
      console.error("Error generating prompt:", err);
      setError(err.message || "Failed to generate prompt");
      toast({
        title: "Error",
        description: err.message || "Failed to generate prompt",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle saving the prompt to library
  const handleSavePrompt = (prompt: string) => {
    // Save to localStorage
    localStorage.setItem(SAVED_PROMPT_KEY, prompt);
    
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="build" className="flex-1">Build Prompt</TabsTrigger>
            <TabsTrigger value="examples" className="flex-1">Example Prompts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="build" className="pt-4">
            <PromptOptimizerForm
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
          </TabsContent>
          
          <TabsContent value="examples" className="pt-4">
            <PromptExampleList onSelectExample={handleSelectExample} />
          </TabsContent>
        </Tabs>
        
        {optimizedPrompt && (
          <OptimizedPromptResult 
            optimizedPrompt={optimizedPrompt} 
            onSavePrompt={handleSavePrompt}
          />
        )}
      </CardContent>
      
      <CardFooter className="border-t border-border pt-4">
        <div className="text-xs text-muted-foreground">
          Optimized for {llm} using DeepSeek AI
        </div>
      </CardFooter>
    </Card>
  );
};

export default PromptOptimizerTool;
