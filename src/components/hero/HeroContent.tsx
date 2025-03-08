
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface HeroContentProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroContent = ({ scrollToSection }: HeroContentProps) => {
  const { t } = useLanguage();

  return (
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
  );
};

export default HeroContent;
