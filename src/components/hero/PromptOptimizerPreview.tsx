
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";

interface PromptOptimizerPreviewProps {
  scrollToSection: (sectionId: string) => void;
}

const PromptOptimizerPreview = ({ scrollToSection }: PromptOptimizerPreviewProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const handleGetStarted = () => {
    scrollToSection('pricing');
  };
  
  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 animate-fade-in relative">
      {/* Semi-transparent overlay with clickable button */}
      <div 
        className="absolute inset-0 bg-background/50 backdrop-blur-[1px] rounded-xl z-10 flex items-center justify-center cursor-pointer"
        onClick={handleGetStarted}
      >
        <div className="bg-primary text-primary-foreground font-medium rounded-full px-6 py-3 hover:bg-primary/90 transition-colors">
          {t("hero.getStarted", "Get Started")}
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">{t("hero.promptOptimizer", "Prompt Optimizer")}</h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="target-model">{t("hero.targetModel", "Target AI Model")}</Label>
          <Input 
            id="target-model"
            value="GPT-4"
            disabled
            placeholder="e.g., GPT-4, Claude, Gemini, etc."
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="prompt-base">{t("hero.basePrompt", "Your Base Prompt")}</Label>
          <Textarea 
            id="prompt-base"
            disabled
            placeholder="Enter your prompt here. Be specific about what you want the AI to do."
            className="mt-1 min-h-[100px]"
          />
        </div>
        
        <Button 
          className="w-full" 
          size="lg"
          disabled
        >
          {t("hero.optimize", "Optimize Prompt")}
        </Button>
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
