
import { Check, Sparkles, Brain, Zap, Repeat } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "Guided Prompt Refinement",
      description:
        "Step-by-step assistance to craft the perfect prompt for any AI model, with contextual suggestions based on your goals.",
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Multi-LLM Optimization",
      description:
        "Tailor your prompts specifically for GPT-4, Claude, Gemini, and more with model-specific enhancements.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Instant Improvement",
      description:
        "Transform vague ideas into structured, detailed prompts that yield significantly better AI responses.",
    },
    {
      icon: <Repeat className="h-6 w-6 text-primary" />,
      title: "Save & Reuse",
      description:
        "Build a personal library of your best prompts, organized by category and purpose for quick access.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Designed for prompt engineering excellence
          </h2>
          <p className="text-gray-600 text-lg">
            Kolabz combines intuitive design with powerful functionality to
            help you generate prompts that get exceptional results from any AI model.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all-200 border border-gray-100 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-32 relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute right-1/4 top-0 w-1/4 h-1/4 rounded-full bg-primary/10 filter blur-2xl"></div>
            <div className="absolute left-1/3 bottom-0 w-1/5 h-1/5 rounded-full bg-primary/10 filter blur-xl"></div>
          </div>

          <div className="relative z-10 bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 neo-shadow">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  The science of effective prompting
                </h3>
                <p className="text-gray-600 mb-8">
                  Our platform is built on extensive research into what makes AI responses
                  most useful. We've distilled these insights into an intuitive system that
                  anyone can use.
                </p>
                <ul className="space-y-4">
                  {[
                    "Contextual awareness recommendations",
                    "Tone and style optimization",
                    "Model-specific formatting",
                    "Detail level calibration",
                    "Objective clarity enhancements",
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
              <div className="bg-gray-50 flex items-center justify-center p-8 md:p-12">
                <div className="bg-white rounded-xl shadow-sm p-6 max-w-sm w-full">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target AI Model
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>GPT-4</option>
                        <option>Claude 2</option>
                        <option>Gemini</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prompt Purpose
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option>Content Creation</option>
                        <option>Problem Solving</option>
                        <option>Creative Writing</option>
                        <option>Data Analysis</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tone
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Professional", "Friendly", "Academic"].map((tone) => (
                          <div
                            key={tone}
                            className={`text-center px-2 py-1.5 rounded text-xs cursor-pointer ${
                              tone === "Professional"
                                ? "bg-primary/10 text-primary font-medium"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {tone}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Detail Level
                      </label>
                      <div className="bg-gray-100 rounded-full h-2">
                        <div className="bg-primary h-full rounded-full w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Basic</span>
                        <span>Detailed</span>
                        <span>Expert</span>
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
