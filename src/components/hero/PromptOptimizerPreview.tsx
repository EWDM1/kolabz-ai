
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";

interface PromptOptimizerPreviewProps {
  scrollToSection: (sectionId: string) => void;
}

const PromptOptimizerPreview = ({ scrollToSection }: PromptOptimizerPreviewProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [targetModel, setTargetModel] = useState("GPT-4");
  const [promptBase, setPromptBase] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  
  // Function to optimize prompt (simulated)
  const handleOptimizePrompt = (prompt: string) => {
    // This would normally call an API to optimize the prompt
    // For now, we'll just simulate the response
    if (prompt.toLowerCase().includes("data visualization")) {
      setOptimizedPrompt(`[Role] Act as a data visualization expert.\n[Context] Design for a business intelligence tool.\n[Task] Create a comprehensive data visualization dashboard with:\n- 4-5 key metrics as KPIs at the top\n- Time-series charts for trend analysis\n- Filtering capabilities by date range and categories\n- Mobile responsive design with accessibility features\n[Format] Provide mockup description and technical implementation details.`);
    } else if (prompt.toLowerCase().includes("blog")) {
      setOptimizedPrompt(`[Role] Act as a professional content writer.\n[Context] Writing for a business audience.\n[Task] Create a compelling blog post that:\n- Has an attention-grabbing headline\n- Includes 3-5 actionable insights\n- Uses data to support key points\n- Ends with a clear call-to-action\n[Format] Provide a full article with H2 and H3 subheadings.`);
    } else {
      setOptimizedPrompt(`[Role] Act as an expert in the requested field.\n[Context] Professional setting appropriate to the topic.\n[Task] Address the prompt with detailed, actionable information.\n[Format] Structured response with clear sections and examples.`);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">{t("hero.promptOptimizer", "Prompt Optimizer")}</h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="target-model">{t("hero.targetModel", "Target AI Model")}</Label>
          <Input 
            id="target-model"
            value={targetModel}
            onChange={(e) => setTargetModel(e.target.value)}
            placeholder="e.g., GPT-4, Claude, Gemini, etc."
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="prompt-base">{t("hero.basePrompt", "Your Base Prompt")}</Label>
          <Textarea 
            id="prompt-base"
            value={promptBase}
            onChange={(e) => setPromptBase(e.target.value)}
            placeholder="Enter your prompt here. Be specific about what you want the AI to do."
            className="mt-1 min-h-[100px]"
          />
        </div>
        
        <Button 
          onClick={() => handleOptimizePrompt(promptBase)}
          className="w-full" 
          size="lg"
          disabled={!promptBase.trim()}
        >
          {t("hero.optimize", "Optimize Prompt")}
        </Button>
        
        {optimizedPrompt && (
          <div className="mt-6 space-y-4">
            <h3 className="font-bold">{t("hero.optimizedPrompt", "Optimized Prompt:")}</h3>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'border-gray-700 bg-gray-800/50' 
                : 'border-gray-200 bg-gray-50/80'
            }`}>
              <pre className="whitespace-pre-wrap text-sm">{optimizedPrompt}</pre>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(optimizedPrompt);
                }}
              >
                {t("hero.copy", "Copy to Clipboard")}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => scrollToSection('pricing')}
              >
                {t("hero.plans", "See Plans & Pricing")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {t("hero.security", "Secure payments via Stripe • 7-day free trial • Cancel anytime")}
        </p>
      </div>
    </div>
  );
};

export default PromptOptimizerPreview;
