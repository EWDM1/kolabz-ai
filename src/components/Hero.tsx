
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
              <Button size="lg" asChild>
                <Link to="/signup">
                  {t("hero.getStarted", "Get Started")}
                </Link>
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

          {/* Right Column - Prompt Optimizer as Image */}
          <div className="animate-float">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-xl opacity-70 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                    : "/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png"}
                  alt="Prompt Optimizer Tool Interface"
                  className="w-full h-auto rounded-xl shadow-lg border border-border"
                />
                <div className="absolute inset-0 bg-card/50 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button asChild size="lg">
                    <Link to="/signup">
                      {t("hero.tryNow", "Try It Now")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {t("hero.promptOptimizerCaption", "Our AI-powered Prompt Optimizer makes crafting perfect prompts easy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
