
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SAVED_PROMPT_KEY } from "./usePromptForm";

interface GeneratePromptParams {
  llm: string;
  specialty: string;
  tone: string;
  detailLevel: string;
  promptObjective: string;
  context: string;
  specificQuestions: string;
  constraints: string;
}

export const usePromptGenerator = (setOptimizedPrompt: (prompt: string) => void) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generatePrompt = async (params: GeneratePromptParams) => {
    const { promptObjective } = params;
    if (!promptObjective.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      const { data, error } = await supabase.functions.invoke("optimize-prompt", {
        body: params
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

  return {
    generatePrompt,
    isGenerating,
    error
  };
};

