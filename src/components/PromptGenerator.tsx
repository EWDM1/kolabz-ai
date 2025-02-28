
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";
import { CheckCircle, Info } from "lucide-react";

const PromptGenerator = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [promptGenerated, setPromptGenerated] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");
  const [targetModel, setTargetModel] = useState("gpt4");
  const [promptPurpose, setPromptPurpose] = useState("content-creation");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [promptStyle, setPromptStyle] = useState("standard");
  const [constraints, setConstraints] = useState("");
  const [formatOption, setFormatOption] = useState("paragraph");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGeneratePrompt = () => {
    if (!initialPrompt) return;

    setGeneratingPrompt(true);
    
    // In a real app, this would make an API call to generate the prompt
    setTimeout(() => {
      // Generate prompt using the universal prompt structure from the knowledge base
      const rolePrefix = getRolePrefix();
      const contextPrefix = getContextPrefix();
      const taskDescription = getTaskDescription();
      const formatInstructions = getFormatInstructions();
      const constraintsSection = getConstraintsSection();
      
      setOptimizedPrompt(
        `${rolePrefix}\n${contextPrefix}\n${taskDescription}\n${formatInstructions}${constraintsSection ? `\n${constraintsSection}` : ""}\n\n${initialPrompt}`
      );
      
      setGeneratingPrompt(false);
      setPromptGenerated(true);
    }, 1500);
  };

  const getRolePrefix = () => {
    // Generate the role prefix based on the prompt purpose
    let role = "";
    switch (promptPurpose) {
      case "content-creation":
        role = t("generator.role.content", "content creator");
        break;
      case "data-analysis":
        role = t("generator.role.data", "data analyst");
        break;
      case "creative-writing":
        role = t("generator.role.creative", "creative writer");
        break;
      case "technical":
        role = t("generator.role.technical", "technical writer");
        break;
      case "marketing":
        role = t("generator.role.marketing", "marketing expert");
        break;
      default:
        role = t("generator.role.expert", "expert");
    }
    
    // Format from universal prompt structure: [Role] Act as a [role]
    return `[Role] ${t("generator.act_as", "Act as a")} ${role}.`;
  };
  
  const getContextPrefix = () => {
    // Add context based on the target model
    let context = "";
    switch (targetModel) {
      case "gpt4":
        context = t("generator.context.gpt4", "You are GPT-4, an advanced AI language model capable of detailed analysis and creative content generation.");
        break;
      case "gpt35":
        context = t("generator.context.gpt35", "You are GPT-3.5, an AI language model that excels at providing concise and relevant information.");
        break;
      case "claude":
        context = t("generator.context.claude", "You are Claude, an AI assistant with Constitutional AI that focuses on helpful, harmless, and honest responses.");
        break;
      case "gemini":
        context = t("generator.context.gemini", "You are Gemini, a multimodal AI model with strong reasoning capabilities.");
        break;
      default:
        context = t("generator.context.default", "You are an advanced AI assistant.");
    }
    
    // Format from universal prompt structure: [Context] [Provide background information]
    return `[Context] ${context}`;
  };
  
  const getTaskDescription = () => {
    // Generate task description based on the prompt purpose
    let task = "";
    
    switch (promptPurpose) {
      case "content-creation":
        task = t("generator.task.content", "Create comprehensive content about the following topic with well-researched information.");
        break;
      case "data-analysis":
        task = t("generator.task.data", "Analyze the following data or information and provide insights with clear explanations.");
        break;
      case "creative-writing":
        task = t("generator.task.creative", "Write an engaging and imaginative piece based on the following idea.");
        break;
      case "technical":
        task = t("generator.task.technical", "Document the following technical concept with clear explanations and accurate details.");
        break;
      case "marketing":
        task = t("generator.task.marketing", "Develop compelling marketing material for the following product or service.");
        break;
      default:
        task = t("generator.task.default", "Provide information about the following topic.");
    }
    
    // Format from universal prompt structure: [Task] [Define the goal clearly]
    return `[Task] ${task}`;
  };
  
  const getFormatInstructions = () => {
    // Generate format instructions based on the format option
    let format = "";
    
    switch (formatOption) {
      case "bullet":
        format = t("generator.format.bullet", "Use bullet points for clarity and organization.");
        break;
      case "numbered":
        format = t("generator.format.numbered", "Use numbered lists to show sequence or priority.");
        break;
      case "paragraph":
        format = t("generator.format.paragraph", "Format your response in well-structured paragraphs.");
        break;
      case "code":
        format = t("generator.format.code", "Include code examples with comments explaining key parts.");
        break;
      case "json":
        format = t("generator.format.json", "Format output as valid JSON with clear structure.");
        break;
      default:
        format = t("generator.format.default", "Use a clear and structured format.");
    }
    
    // Format from universal prompt structure: [Format] [Specify output structure]
    return `[Format] ${format}`;
  };
  
  const getConstraintsSection = () => {
    // If custom constraints are provided, include them
    if (constraints.trim()) {
      // Format from universal prompt structure: [Constraints] [List limitations]
      return `[Constraints] ${constraints}`;
    }
    return "";
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className={`p-3 rounded-md text-sm ${
          theme === 'dark'
            ? 'bg-blue-900/30 border border-blue-800'
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center gap-2 mb-1 text-blue-600 dark:text-blue-400">
            <Info size={16} />
            <span className="font-medium">{t("generator.info.title", "Prompt Engineering Guide")}</span>
          </div>
          <p>{t("generator.info.description", "This tool helps you create optimized prompts using the universal structure recommended for most LLMs: Role, Context, Task, Format, and Constraints.")}</p>
        </div>
      </div>

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

      <div>
        <button 
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`text-sm font-medium flex items-center gap-1 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}
        >
          {showAdvanced ? "Hide" : "Show"} Advanced Options
        </button>
        
        {showAdvanced && (
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="promptStyle">{t("generator.prompt_style", "Prompt Style")}</Label>
              <select
                id="promptStyle"
                value={promptStyle}
                onChange={(e) => setPromptStyle(e.target.value)}
                className={`w-full mt-1.5 px-3 py-2 text-sm rounded-md border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-background border-input'
                }`}
              >
                <option value="standard">{t("generator.style.standard", "Standard")}</option>
                <option value="step-by-step">{t("generator.style.step", "Chain of Thought")}</option>
                <option value="few-shot">{t("generator.style.few_shot", "Few-Shot Learning")}</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="formatOption">{t("generator.output_format", "Output Format")}</Label>
              <select
                id="formatOption"
                value={formatOption}
                onChange={(e) => setFormatOption(e.target.value)}
                className={`w-full mt-1.5 px-3 py-2 text-sm rounded-md border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-background border-input'
                }`}
              >
                <option value="paragraph">{t("generator.format_option.paragraph", "Paragraphs")}</option>
                <option value="bullet">{t("generator.format_option.bullet", "Bullet Points")}</option>
                <option value="numbered">{t("generator.format_option.numbered", "Numbered List")}</option>
                <option value="code">{t("generator.format_option.code", "Code Examples")}</option>
                <option value="json">{t("generator.format_option.json", "JSON")}</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="constraints">{t("generator.constraints", "Constraints (optional)")}</Label>
              <Textarea
                id="constraints"
                placeholder={t("generator.constraints_placeholder", "E.g., word count, tone, specific requirements...")}
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                className={`w-full h-20 mt-1.5 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-background border-input'
                }`}
              />
            </div>
          </div>
        )}
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
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <h3 className="font-semibold">{t("generator.optimized", "Optimized Prompt")}</h3>
            </div>
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
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">{t("generator.tips.title", "Tips for better results")}</h4>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• {t("generator.tips.specific", "Be specific with your instructions")}</li>
              <li>• {t("generator.tips.examples", "Include examples when possible")}</li>
              <li>• {t("generator.tips.constraints", "Set clear constraints (length, tone, etc.)")}</li>
              <li>• {t("generator.tips.iterate", "Iterate and refine for best results")}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;
