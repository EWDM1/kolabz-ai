
import { useState } from "react";
import { 
  Bot, 
  Copy, 
  Sparkles, 
  FileEdit, 
  BookOpen, 
  MessageSquare, 
  Brain,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";

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

const EXAMPLE_PROMPTS = [
  {
    title: "Market Research Report",
    prompt: "Analyze the electric vehicle market trends in Europe for Q2 2023"
  },
  {
    title: "Content Marketing Strategy",
    prompt: "Create a content calendar for a SaaS startup's product launch"
  },
  {
    title: "Code Debugging Help",
    prompt: "Fix this React useEffect hook that's causing infinite rendering"
  },
  {
    title: "Data Visualization Guide",
    prompt: "Suggest the best charts to represent customer retention data"
  }
];

interface PromptOptimizerToolProps {
  onSavePrompt?: (prompt: string) => void;
}

const PromptOptimizerTool = ({ onSavePrompt }: PromptOptimizerToolProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  // Form state
  const [llm, setLlm] = useState("gpt-4");
  const [specialty, setSpecialty] = useState("");
  const [tone, setTone] = useState("");
  const [detailLevel, setDetailLevel] = useState("");
  const [promptObjective, setPromptObjective] = useState("");
  const [context, setContext] = useState("");
  const [specificQuestions, setSpecificQuestions] = useState("");
  const [constraints, setConstraints] = useState("");
  
  // Output state
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState("");
  
  // Handle Examples
  const useExamplePrompt = (example: string) => {
    setPromptObjective(example);
  };
  
  // Generate the optimized prompt
  const handleGeneratePrompt = () => {
    // In a real app, this would call an API to process the inputs
    // For now, we'll just build a structured prompt based on the inputs
    
    const specialtyText = specialty ? SPECIALTY_OPTIONS.find(opt => opt.value === specialty)?.label || specialty : "";
    const toneText = tone ? TONE_OPTIONS.find(opt => opt.value === tone)?.label || tone : "";
    const detailText = detailLevel ? DETAIL_OPTIONS.find(opt => opt.value === detailLevel)?.label || detailLevel : "";
    
    const formattedPrompt = `[Role] Act as a ${specialtyText || "knowledgeable"} expert${toneText ? ` with a ${toneText} tone` : ""}.

[Context] ${context || "Provide comprehensive information that is accurate and helpful."}

[Task] ${promptObjective}

[Format] Provide a ${detailText || "detailed"} response that addresses all aspects of the request${specificQuestions ? ` including answers to these specific questions:\n- ${specificQuestions.split("\n").join("\n- ")}` : ""}.

${constraints ? `[Constraints] ${constraints}` : ""}`;

    setOptimizedPrompt(formattedPrompt);
    setEditablePrompt(formattedPrompt);
  };
  
  // Handle copy to clipboard
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(isEditing ? editablePrompt : optimizedPrompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard"
    });
  };
  
  // Handle editing the prompt
  const handleEditPrompt = () => {
    if (isEditing) {
      // Save edited prompt
      setOptimizedPrompt(editablePrompt);
      setIsEditing(false);
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };
  
  // Handle saving the prompt
  const handleSavePrompt = () => {
    if (onSavePrompt) {
      onSavePrompt(isEditing ? editablePrompt : optimizedPrompt);
    }
    
    toast({
      title: "Saved!",
      description: "Prompt saved to your library"
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
        {/* LLM Selection */}
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
                    <Bot className="h-4 w-4" />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Two column layout for prompt customization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Main prompt settings */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="specialty-select">Area of Specialty</Label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger id="specialty-select" className="w-full">
                  <SelectValue placeholder="Select specialty area" />
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
            
            <div className="space-y-1.5">
              <Label htmlFor="context-input">Context (Optional)</Label>
              <Input
                id="context-input"
                placeholder="Add background information or constraints"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
          </div>
          
          {/* Column 2: Advanced prompt details */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="prompt-objective">Prompt Objective</Label>
              <Textarea
                id="prompt-objective"
                placeholder="What do you want the AI to do? Be specific."
                className="min-h-[80px]"
                value={promptObjective}
                onChange={(e) => setPromptObjective(e.target.value)}
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
          </div>
        </div>
        
        {/* Example Prompts */}
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
          <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Example Prompts (Click to use)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <button 
                key={index}
                onClick={() => useExamplePrompt(example.prompt)}
                className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{example.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Generate Prompt Button */}
        <Button 
          onClick={handleGeneratePrompt}
          className="w-full" 
          size="lg"
          disabled={!promptObjective.trim()}
        >
          <Brain className="mr-2 h-4 w-4" />
          Generate Optimized Prompt
        </Button>
        
        {/* Results Section */}
        {optimizedPrompt && (
          <div className="mt-6 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Optimized Prompt:
            </h3>
            
            {isEditing ? (
              <Textarea
                value={editablePrompt}
                onChange={(e) => setEditablePrompt(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            ) : (
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-gray-800/50' 
                  : 'border-gray-200 bg-gray-50/80'
              }`}>
                <pre className="whitespace-pre-wrap text-sm font-mono">{optimizedPrompt}</pre>
              </div>
            )}
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCopyPrompt}
                className="flex items-center gap-1.5"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy to Clipboard
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEditPrompt}
                className="flex items-center gap-1.5"
              >
                <FileEdit className="h-3.5 w-3.5" />
                {isEditing ? "Save Edits" : "Edit Prompt"}
              </Button>
              
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleSavePrompt}
                className="flex items-center gap-1.5 ml-auto"
              >
                Save Prompt
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-border pt-4 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Optimized for {LLM_OPTIONS.find(opt => opt.value === llm)?.label || llm}
        </div>
        
        <Button variant="ghost" size="sm" className="text-xs" asChild>
          <a href="/prompt-library" className="flex items-center gap-1.5">
            View Prompt Library
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptOptimizerTool;
