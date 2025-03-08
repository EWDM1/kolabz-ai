
import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PromptOptimizerForm from "./PromptOptimizerForm";
import PromptExampleList from "./PromptExampleList";
import OptimizedPromptResult from "./OptimizedPromptResult";

interface PromptOptimizerToolProps {
  onSavePrompt?: (prompt: string) => void;
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

  // Handle selecting an example prompt
  const handleSelectExample = (example: string) => {
    setPromptObjective(example);
    setActiveTab("build");
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
        toast({
          title: "Success!",
          description: "Your optimized prompt has been generated"
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
  const handleSavePrompt = () => {
    if (onSavePrompt) {
      onSavePrompt(optimizedPrompt);
    }
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
