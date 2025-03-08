
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PromptOptimizerForm from "./PromptOptimizerForm";
import PromptExampleList from "./PromptExampleList";

interface PromptOptimizerTabsProps {
  // Form props
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
  
  // Action props
  isGenerating: boolean;
  onGeneratePrompt: () => void;
  onClearForm: () => void;
  error: string;
}

const PromptOptimizerTabs = ({
  llm, setLlm,
  specialty, setSpecialty,
  tone, setTone,
  detailLevel, setDetailLevel,
  promptObjective, setPromptObjective,
  context, setContext,
  specificQuestions, setSpecificQuestions,
  constraints, setConstraints,
  isGenerating,
  onGeneratePrompt,
  onClearForm,
  error
}: PromptOptimizerTabsProps) => {
  const [activeTab, setActiveTab] = useState("build");

  const handleSelectExample = (example: string) => {
    setPromptObjective(example);
    setActiveTab("build");
  };

  return (
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
          onGeneratePrompt={onGeneratePrompt}
          onClearForm={onClearForm}
          error={error}
        />
      </TabsContent>
      
      <TabsContent value="examples" className="pt-4">
        <PromptExampleList onSelectExample={handleSelectExample} />
      </TabsContent>
    </Tabs>
  );
};

export default PromptOptimizerTabs;

