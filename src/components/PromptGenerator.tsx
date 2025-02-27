
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Save, RefreshCw, Sparkles } from "lucide-react";

const PromptGenerator = () => {
  const [goal, setGoal] = useState("");
  const [topic, setTopic] = useState("");
  const [model, setModel] = useState("gpt-4");
  const [tone, setTone] = useState("professional");
  const [detailLevel, setDetailLevel] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!goal) {
      toast({
        title: "Missing information",
        description: "Please describe your prompt goal",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call to generate prompt
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock prompt generation
    const prefixes = {
      professional: "Create a comprehensive and detailed",
      casual: "In a friendly and approachable way, develop a",
      academic: "Develop a scholarly analysis and thorough",
    };

    const details = {
      low: "with the key points clearly outlined.",
      medium: "with adequate detail and relevant examples.",
      high: "with extensive depth, nuanced analysis, and comprehensive examples.",
    };

    const modelAdaptations = {
      "gpt-4": "Organize the response with clear headings and logical flow.",
      "claude": "Include both analytical insights and creative perspectives.",
      "gemini": "Emphasize visual and structural clarity in the output.",
      "deepseek": "Provide concise, accurate information with factual grounding and technical precision.",
    };

    const generatedText = `${prefixes[tone as keyof typeof prefixes]} ${goal} about ${topic || "the specified subject"} ${details[detailLevel as keyof typeof details]} ${modelAdaptations[model as keyof typeof modelAdaptations]}`;

    setGeneratedPrompt(generatedText);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard",
    });
  };

  const handleSave = () => {
    // This would save to user's library in a real app
    toast({
      title: "Prompt saved",
      description: "The prompt has been saved to your library",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Craft Your Prompt</CardTitle>
          <CardDescription>
            Provide a few details to generate an optimized prompt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Target AI Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="gemini">Gemini</SelectItem>
                <SelectItem value="deepseek">DeepSeek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Prompt Goal</Label>
            <Textarea
              id="goal"
              placeholder="What do you want the AI to do? (e.g., 'Create a marketing plan', 'Explain quantum computing')"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic (optional)</Label>
            <Input
              id="topic"
              placeholder="Specific topic or domain"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailLevel">Detail Level</Label>
            <Select value={detailLevel} onValueChange={setDetailLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select detail level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Basic</SelectItem>
                <SelectItem value="medium">Intermediate</SelectItem>
                <SelectItem value="high">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerate} 
            className="w-full relative overflow-hidden group"
            disabled={loading}
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Optimized Prompt
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary group-hover:translate-y-0 translate-y-12 transition-transform duration-300"></span>
          </Button>
        </CardFooter>
      </Card>

      <Card className={`transition-all duration-300 ${generatedPrompt ? "opacity-100" : "opacity-50"}`}>
        <CardHeader>
          <CardTitle>Generated Prompt</CardTitle>
          <CardDescription>
            Your optimized prompt for {model}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 min-h-[200px] border border-gray-200">
            {generatedPrompt ? (
              <p className="whitespace-pre-wrap">{generatedPrompt}</p>
            ) : (
              <div className="text-gray-400 flex flex-col items-center justify-center h-full">
                <Sparkles className="h-6 w-6 mb-2" />
                <p>Generate a prompt to see the result</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={!generatedPrompt}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!generatedPrompt}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PromptGenerator;
