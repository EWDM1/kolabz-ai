
import { Check, Sparkles, Brain, Zap, Repeat } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: t("features.cards.refinement.title", "Guided Prompt Refinement"),
      description: t(
        "features.cards.refinement.description",
        "Step-by-step assistance to craft the perfect prompt for any AI model, with contextual suggestions based on your goals."
      ),
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: t("features.cards.optimization.title", "Multi-LLM Optimization"),
      description: t(
        "features.cards.optimization.description",
        "Tailor your prompts specifically for GPT-4, Claude, Gemini, and more with model-specific enhancements."
      ),
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: t("features.cards.improvement.title", "Instant Improvement"),
      description: t(
        "features.cards.improvement.description",
        "Transform vague ideas into structured, detailed prompts that yield significantly better AI responses."
      ),
    },
    {
      icon: <Repeat className="h-6 w-6 text-primary" />,
      title: t("features.cards.reuse.title", "Save & Reuse"),
      description: t(
        "features.cards.reuse.description",
        "Build a personal library of your best prompts, organized by category and purpose for quick access."
      ),
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-background to-background/95">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            {t("nav.features", "Features")}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t("features.title", "Designed for prompt engineering excellence")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("features.description", "Kolabz combines intuitive design with powerful functionality to help you generate prompts that get exceptional results from any AI model.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all-200 border border-border group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-32 relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute right-1/4 top-0 w-1/4 h-1/4 rounded-full bg-primary/10 filter blur-2xl"></div>
            <div className="absolute left-1/3 bottom-0 w-1/5 h-1/5 rounded-full bg-primary/10 filter blur-xl"></div>
          </div>

          <div className="relative z-10 bg-card rounded-2xl overflow-hidden shadow-xl border border-border">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  {t("features.science.title", "The science of effective prompting")}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {t("features.science.description", "Our platform is built on extensive research into what makes AI responses most useful. We've distilled these insights into an intuitive system that anyone can use.")}
                </p>
                <ul className="space-y-4">
                  {[
                    t("features.science.item1", "Contextual awareness recommendations"),
                    t("features.science.item2", "Tone and style optimization"),
                    t("features.science.item3", "Model-specific formatting"),
                    t("features.science.item4", "Detail level calibration"),
                    t("features.science.item5", "Objective clarity enhancements"),
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted flex items-center justify-center p-8 md:p-12">
                <div className="bg-card rounded-xl shadow-sm p-6 max-w-sm w-full">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t("features.ui.model", "Target AI Model")}
                      </label>
                      <select className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background">
                        <option>GPT-4</option>
                        <option>Claude 2</option>
                        <option>Gemini</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t("features.ui.purpose", "Prompt Purpose")}
                      </label>
                      <select className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background">
                        <option>{t("features.ui.content", "Content Creation")}</option>
                        <option>{t("features.ui.problem", "Problem Solving")}</option>
                        <option>{t("features.ui.creative", "Creative Writing")}</option>
                        <option>{t("features.ui.data", "Data Analysis")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t("features.ui.tone", "Tone")}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          t("features.ui.tone_prof", "Professional"), 
                          t("features.ui.tone_friend", "Friendly"), 
                          t("features.ui.tone_acad", "Academic")
                        ].map((tone) => (
                          <div
                            key={tone}
                            className={`text-center px-2 py-1.5 rounded text-xs cursor-pointer ${
                              tone === t("features.ui.tone_prof", "Professional")
                                ? "bg-primary/10 text-primary font-medium"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {tone}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t("features.ui.detail", "Detail Level")}
                      </label>
                      <div className="bg-muted rounded-full h-2">
                        <div className="bg-primary h-full rounded-full w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{t("features.ui.basic", "Basic")}</span>
                        <span>{t("features.ui.detailed", "Detailed")}</span>
                        <span>{t("features.ui.expert", "Expert")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
