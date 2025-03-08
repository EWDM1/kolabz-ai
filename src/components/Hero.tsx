
import HeroContent from "@/components/hero/HeroContent";
import PromptOptimizerPreview from "@/components/hero/PromptOptimizerPreview";
import HeroBackground from "@/components/hero/HeroBackground";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const Hero = () => {
  const { scrollToSection } = useSmoothScroll();
  
  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-24 overflow-hidden">
      <HeroBackground />

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Hero content */}
          <HeroContent scrollToSection={scrollToSection} />

          {/* Right Column - Prompt Optimizer Tool */}
          <PromptOptimizerPreview scrollToSection={scrollToSection} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
