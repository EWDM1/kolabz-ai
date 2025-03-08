
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Hero = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [targetModel, setTargetModel] = useState("GPT-4");
  const [promptBase, setPromptBase] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  
  // Example prompt template when user clicks on an example
  const useExamplePrompt = (example: string) => {
    setPromptBase(example);
    // In a real app, this would trigger the optimization
    handleOptimizePrompt(example);
  };
  
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
  
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute right-0 top-1/3 w-1/3 h-1/3 rounded-full bg-primary/20 filter blur-3xl"></div>
        <div className="absolute left-1/4 bottom-1/4 w-1/4 h-1/4 rounded-full bg-primary/10 filter blur-2xl"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4 animate-slide-up delay-100">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            {t("hero.tagline", "Craft perfect prompts in seconds")}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-slide-up delay-200 mb-4 max-w-3xl">
            {t("hero.title", "Master AI Prompts")} <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              {t("hero.titleAccent", "With Precision")}
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground animate-slide-up delay-300 max-w-2xl">
            {t("hero.description", "Kolabz empowers you to generate optimized prompts for any AI model. Create, refine, and save prompts that get better results, every time.")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg border border-border p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-center">Prompt Optimizer</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="target-model">Target AI Model</Label>
              <Input 
                id="target-model"
                value={targetModel}
                onChange={(e) => setTargetModel(e.target.value)}
                placeholder="e.g., GPT-4, Claude, Gemini, etc."
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="prompt-base">Your Base Prompt</Label>
              <Textarea 
                id="prompt-base"
                value={promptBase}
                onChange={(e) => setPromptBase(e.target.value)}
                placeholder="Enter your prompt here. Be specific about what you want the AI to do."
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <h3 className="font-medium text-sm mb-2">Example Prompts (Click to use)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button 
                  onClick={() => useExamplePrompt("Create a data visualization dashboard for sales analytics")}
                  className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors"
                >
                  Create a data visualization dashboard
                </button>
                <button 
                  onClick={() => useExamplePrompt("Write a blog post about productivity tips for remote workers")}
                  className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors"
                >
                  Write a blog post about productivity
                </button>
                <button 
                  onClick={() => useExamplePrompt("Develop a marketing strategy for a new mobile app")}
                  className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors"
                >
                  Develop a marketing strategy
                </button>
                <button 
                  onClick={() => useExamplePrompt("Create a Python script to analyze CSV data")}
                  className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors"
                >
                  Create a Python script
                </button>
              </div>
            </div>
            
            <Button 
              onClick={() => handleOptimizePrompt(promptBase)}
              className="w-full" 
              size="lg"
              disabled={!promptBase.trim()}
            >
              Optimize Prompt
            </Button>
            
            {optimizedPrompt && (
              <div className="mt-6 space-y-4">
                <h3 className="font-bold">Optimized Prompt:</h3>
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
                    Copy to Clipboard
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => scrollToSection('pricing')}
                  >
                    See Plans & Pricing
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
      </div>
    </section>
  );
};

export default Hero;
