
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";

const Hero = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Hero content */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4 animate-slide-up delay-100">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              {t("hero.tagline", "Craft perfect prompts in seconds")}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-slide-up delay-200 mb-6">
              {t("hero.title", "Master AI Prompts")} <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                {t("hero.titleAccent", "With Precision")}
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground animate-slide-up delay-300 mb-8 max-w-xl">
              {t("hero.description", "Kolabz empowers you to generate optimized prompts for any AI model. Create, refine, and save prompts that get better results, every time.")}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" onClick={() => scrollToSection('pricing')}>
                {t("hero.getStarted", "Get Started")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('pricing')}>
                {t("hero.pricing", "See Pricing")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <span className="mr-2">★★★★★</span>
              <span>{t("hero.testimonial", "Trusted by 10,000+ creators and businesses")}</span>
            </div>
          </div>

          {/* Right Column - Prompt Optimizer Tool (Non-functional) */}
          <div className="bg-card rounded-xl shadow-lg border border-border p-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">{t("hero.promptOptimizer", "Prompt Optimizer")}</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="target-model" className="block text-sm font-medium leading-none mb-1">{t("hero.targetModel", "Target AI Model")}</label>
                <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                  GPT-4
                </div>
              </div>
              
              <div>
                <label htmlFor="prompt-base" className="block text-sm font-medium leading-none mb-1">{t("hero.basePrompt", "Your Base Prompt")}</label>
                <div className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  Create a data visualization dashboard for sales analytics
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <h3 className="font-medium text-sm mb-2">{t("hero.examples", "Example Prompts")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="text-left text-sm p-2 rounded bg-primary/10 transition-colors">
                    {t("hero.example1", "Create a data visualization dashboard")}
                  </div>
                  <div className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors">
                    {t("hero.example2", "Write a blog post about productivity")}
                  </div>
                  <div className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors">
                    {t("hero.example3", "Develop a marketing strategy")}
                  </div>
                  <div className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors">
                    {t("hero.example4", "Create a Python script")}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => scrollToSection('pricing')}
              >
                {t("hero.optimize", "Try Prompt Optimizer")}
              </Button>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-bold">{t("hero.optimizedPrompt", "Optimized Prompt:")}</h3>
                <div className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-gray-200 bg-gray-50/80'
                }`}>
                  <pre className="whitespace-pre-wrap text-sm">[Role] Act as a data visualization expert.
[Context] Design for a business intelligence tool.
[Task] Create a comprehensive data visualization dashboard with:
- 4-5 key metrics as KPIs at the top
- Time-series charts for trend analysis
- Filtering capabilities by date range and categories
- Mobile responsive design with accessibility features
[Format] Provide mockup description and technical implementation details.</pre>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled
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
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                {t("hero.security", "Secure payments via Stripe • 7-day free trial • Cancel anytime")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
