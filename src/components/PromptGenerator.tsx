
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";

const PromptGenerator = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [promptGenerated, setPromptGenerated] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");
  const [targetModel, setTargetModel] = useState("gpt4");
  const [promptPurpose, setPromptPurpose] = useState("content-creation");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");

  const handleGeneratePrompt = () => {
    if (!initialPrompt) return;

    setGeneratingPrompt(true);
    
    // In a real app, this would make an API call to generate the prompt
    setTimeout(() => {
      setOptimizedPrompt(
        `${t("generator.output.create", "Create a comprehensive")} ${promptPurpose === "content-creation" ? t("generator.output.content", "content piece") : t("generator.output.analysis", "analysis")} ${t("generator.output.about", "about")} ${initialPrompt} ${t("generator.output.structure", "with the following structure")}:\n\n1. ${t("generator.output.intro", "Introduction that explains the core concepts")}\n2. ${t("generator.output.detailed", "Detailed explanation with examples")}\n3. ${t("generator.output.practical", "Practical applications or implications")}\n4. ${t("generator.output.conclusion", "Conclusion with key takeaways")}\n\n${t("generator.output.include", "Include relevant data points and ensure information is accurate and up-to-date.")}`
      );
      setGeneratingPrompt(false);
      setPromptGenerated(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="targetModel">{t("generator.target_model", "Target AI Model")}</Label>
          <select
            id="targetModel"
            value={targetModel}
            onChange={(e) => setTargetModel(e.target.value)}
            className={`w-full mt-1.5 px-3 py-2 text-sm rounded-md border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-background border-input'
            }`}
          >
            <option value="gpt4">GPT-4</option>
            <option value="gpt35">GPT-3.5</option>
            <option value="claude">Claude</option>
            <option value="gemini">Gemini</option>
          </select>
        </div>

        <div>
          <Label htmlFor="promptPurpose">{t("generator.prompt_purpose", "Prompt Purpose")}</Label>
          <select
            id="promptPurpose"
            value={promptPurpose}
            onChange={(e) => setPromptPurpose(e.target.value)}
            className={`w-full mt-1.5 px-3 py-2 text-sm rounded-md border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-background border-input'
            }`}
          >
            <option value="content-creation">{t("generator.purpose.content", "Content Creation")}</option>
            <option value="data-analysis">{t("generator.purpose.data", "Data Analysis")}</option>
            <option value="creative-writing">{t("generator.purpose.creative", "Creative Writing")}</option>
            <option value="technical">{t("generator.purpose.technical", "Technical Documentation")}</option>
            <option value="marketing">{t("generator.purpose.marketing", "Marketing")}</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="initialPrompt">{t("generator.initial_prompt", "Your Initial Prompt")}</Label>
        <Textarea
          id="initialPrompt"
          placeholder={t("generator.placeholder", "Enter your initial prompt idea here...")}
          value={initialPrompt}
          onChange={(e) => setInitialPrompt(e.target.value)}
          className={`w-full h-32 mt-1.5 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-background border-input'
          }`}
        />
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleGeneratePrompt} 
          disabled={!initialPrompt || generatingPrompt}
        >
          {generatingPrompt ? t("generator.generating", "Generating...") : t("generator.generate", "Generate Optimized Prompt")}
        </Button>
      </div>

      {promptGenerated && (
        <div className={`mt-8 border rounded-lg ${
          theme === 'dark'
            ? 'border-gray-700 bg-gray-800/50'
            : 'border-gray-200 bg-gray-50'
        } p-4`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{t("generator.optimized", "Optimized Prompt")}</h3>
            <Button variant="outline" size="sm">
              {t("generator.refine", "Refine")}
            </Button>
          </div>
          <div className={`p-3 rounded-md ${
            theme === 'dark'
              ? 'bg-gray-900 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}>
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {optimizedPrompt}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;
