
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageContext";
import { CheckCircle, Info, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PromptGenerator = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
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
  const [customRole, setCustomRole] = useState("");
  const [customContext, setCustomContext] = useState("");
  const [customTask, setCustomTask] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGeneratePrompt = () => {
    if (!initialPrompt) return;

    setGeneratingPrompt(true);
    
    // In a real app, this would make an API call to generate the prompt
    setTimeout(() => {
      // Generate prompt using the universal prompt structure from the knowledge base
      const rolePrefix = customRole.trim() ? `[Role] ${customRole}` : getRolePrefix();
      const contextPrefix = customContext.trim() ? `[Context] ${customContext}` : getContextPrefix();
      const taskDescription = customTask.trim() ? `[Task] ${customTask}` : getTaskDescription();
      const formatInstructions = getFormatInstructions();
      const constraintsSection = getConstraintsSection();
      
      setOptimizedPrompt(
        `${rolePrefix}\n${contextPrefix}\n${taskDescription}\n${formatInstructions}${constraintsSection ? `\n${constraintsSection}` : ""}\n\n${initialPrompt}`
      );
      
      setGeneratingPrompt(false);
      setPromptGenerated(true);
    }, 1500);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(optimizedPrompt);
      setCopied(true);
      
      toast({
        title: t("generator.copy_success", "Copied to clipboard"),
        description: t("generator.copy_description", "The optimized prompt has been copied to your clipboard"),
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: t("generator.copy_error", "Failed to copy"),
        description: t("generator.copy_error_description", "Could not copy text to clipboard"),
        variant: "destructive",
      });
    }
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
      case "gpt4o":
        context = t("generator.context.gpt4o", "You are GPT-4o, an advanced multimodal AI model capable of understanding both text and images with high accuracy.");
        break;
      case "gpt35":
        context = t("generator.context.gpt35", "You are GPT-3.5, an AI language model that excels at providing concise and relevant information.");
        break;
      case "claude3":
        context = t("generator.context.claude3", "You are Claude 3, an AI assistant with advanced reasoning and ethical guardrails.");
        break;
      case "claude3opus":
        context = t("generator.context.claude3opus", "You are Claude 3 Opus, Anthropic's most sophisticated AI model with exceptional reasoning abilities.");
        break;
      case "claude3sonnet":
        context = t("generator.context.claude3sonnet", "You are Claude 3 Sonnet, a balanced AI assistant with strong capabilities and faster response times.");
        break;
      case "claude3haiku":
        context = t("generator.context.claude3haiku", "You are Claude 3 Haiku, a streamlined AI optimized for quick responses and practical tasks.");
        break;
      case "claude2":
        context = t("generator.context.claude", "You are Claude 2, an AI assistant with Constitutional AI that focuses on helpful, harmless, and honest responses.");
        break;
      case "gemini":
        context = t("generator.context.gemini", "You are Gemini, a multimodal AI model with strong reasoning capabilities.");
        break;
      case "geminiultra":
        context = t("generator.context.geminiultra", "You are Gemini Ultra, Google's most capable AI model with expert-level understanding across many domains.");
        break;
      case "geminipro":
        context = t("generator.context.geminipro", "You are Gemini Pro, a versatile model balanced for various tasks requiring reasoning and language understanding.");
        break;
      case "llama3":
        context = t("generator.context.llama3", "You are Llama 3, Meta's state-of-the-art open-source model designed for helpful and safe instruction-following.");
        break;
      case "llama370b":
        context = t("generator.context.llama370b", "You are Llama 3 70B, Meta's most capable open-source model with advanced reasoning and language capabilities.");
        break;
      case "llama38b":
        context = t("generator.context.llama38b", "You are Llama 3 8B, Meta's compact yet powerful open-source model designed for efficiency.");
        break;
      case "mistral7b":
        context = t("generator.context.mistral7b", "You are Mistral 7B, a compact but powerful open-source language model.");
        break;
      case "mistral":
        context = t("generator.context.mistral", "You are Mistral Large, a state-of-the-art model with excellent reasoning abilities and factual accuracy.");
        break;
      case "deepseek":
        context = t("generator.context.deepseek", "You are DeepSeek, a powerful language model with particular strength in code generation and mathematics.");
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

  const getExampleRole = () => {
    switch (promptPurpose) {
      case "content-creation":
        return "Act as an expert content creator with deep knowledge of digital marketing";
      case "data-analysis":
        return "Act as a senior data scientist specialized in predictive analytics";
      case "creative-writing":
        return "Act as a bestselling novelist with expertise in science fiction";
      case "technical":
        return "Act as a software engineer with 10+ years of experience in cloud architecture";
      case "marketing":
        return "Act as a CMO of a Fortune 500 company with experience in brand storytelling";
      default:
        return "Act as an expert in this field";
    }
  };
  
  const getExampleContext = () => {
    switch (promptPurpose) {
      case "content-creation":
        return "You're creating content for a tech-savvy audience that needs both depth and clarity";
      case "data-analysis":
        return "You're analyzing quarterly sales data to identify trends and provide actionable insights";
      case "creative-writing":
        return "You're writing for an audience that enjoys immersive, character-driven narratives";
      case "technical":
        return "You're documenting a complex system for both beginner and advanced developers";
      case "marketing":
        return "You're creating marketing materials for a product launch targeting millennials";
      default:
        return "Consider the audience needs detailed but accessible information";
    }
  };
  
  const getExampleTask = () => {
    switch (promptPurpose) {
      case "content-creation":
        return "Create a comprehensive guide that explains the concept, benefits, and implementation steps";
      case "data-analysis":
        return "Analyze the data to identify key patterns, explain their significance, and recommend actions";
      case "creative-writing":
        return "Write a compelling story with a clear beginning, middle, and end that explores the theme";
      case "technical":
        return "Explain how this technology works, its advantages, limitations, and provide code examples";
      case "marketing":
        return "Develop a compelling value proposition and messaging that highlights benefits over features";
      default:
        return "Provide a thorough analysis with evidence-based conclusions";
    }
  };
  
  const getExampleConstraints = () => {
    switch (promptPurpose) {
      case "content-creation":
        return "Keep reading level at grade 8-10, avoid jargon, stay under 1000 words, include 3-5 actionable tips";
      case "data-analysis":
        return "Focus on 3 key insights only, include visualizations descriptions, avoid technical statistics terminology";
      case "creative-writing":
        return "Maintain a hopeful tone, 500-800 words, no explicit content, suitable for young adult readers";
      case "technical":
        return "Must include code examples in Python, explain concepts before code, avoid deprecated methods";
      case "marketing":
        return "Use active voice, emotional appeal, keep sentences under 15 words, focus on benefits not features";
      default:
        return "Keep it concise, use simple language, include examples, avoid speculation";
    }
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
            <optgroup label="OpenAI">
              <option value="gpt4">GPT-4</option>
              <option value="gpt4o">GPT-4o</option>
              <option value="gpt35">GPT-3.5</option>
            </optgroup>
            <optgroup label="Anthropic">
              <option value="claude3opus">Claude 3 Opus</option>
              <option value="claude3sonnet">Claude 3 Sonnet</option>
              <option value="claude3haiku">Claude 3 Haiku</option>
              <option value="claude2">Claude 2</option>
            </optgroup>
            <optgroup label="Google">
              <option value="geminiultra">Gemini Ultra</option>
              <option value="geminipro">Gemini Pro</option>
              <option value="gemini">Gemini</option>
            </optgroup>
            <optgroup label="Meta">
              <option value="llama370b">Llama 3 (70B)</option>
              <option value="llama38b">Llama 3 (8B)</option>
              <option value="llama3">Llama 3</option>
            </optgroup>
            <optgroup label="Mistral AI">
              <option value="mistral">Mistral Large</option>
              <option value="mistral7b">Mistral 7B</option>
            </optgroup>
            <optgroup label="Others">
              <option value="deepseek">DeepSeek</option>
              <option value="cohere">Cohere Command</option>
              <option value="falcon">Falcon</option>
            </optgroup>
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
        <div className="grid gap-4 md:grid-cols-1">
          <div>
            <Label htmlFor="customRole">{t("generator.custom_role", "Role (optional)")}</Label>
            <Textarea
              id="customRole"
              placeholder={getExampleRole()}
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className={`w-full h-20 mt-1.5 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-background border-input'
              }`}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {t("generator.role_description", "Define who the AI should act as (e.g., 'Act as a data scientist specialized in healthcare')")}
            </p>
          </div>
          
          <div>
            <Label htmlFor="customContext">{t("generator.custom_context", "Context (optional)")}</Label>
            <Textarea
              id="customContext"
              placeholder={getExampleContext()}
              value={customContext}
              onChange={(e) => setCustomContext(e.target.value)}
              className={`w-full h-20 mt-1.5 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-background border-input'
              }`}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {t("generator.context_description", "Provide background information to guide the response (e.g., 'This is for a technical audience with basic AI knowledge')")}
            </p>
          </div>
          
          <div>
            <Label htmlFor="customTask">{t("generator.custom_task", "Task (optional)")}</Label>
            <Textarea
              id="customTask"
              placeholder={getExampleTask()}
              value={customTask}
              onChange={(e) => setCustomTask(e.target.value)}
              className={`w-full h-20 mt-1.5 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-background border-input'
              }`}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {t("generator.task_description", "Clearly define what you want the AI to do (e.g., 'Create a 5-point summary of the key concepts in machine learning')")}
            </p>
          </div>
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
              <p className="mt-1 text-xs text-muted-foreground">
                {promptStyle === "step-by-step" 
                  ? t("generator.style_description.step", "Guides the AI to break down complex problems into steps (e.g., 'Think step by step')")
                  : promptStyle === "few-shot" 
                  ? t("generator.style_description.few_shot", "Provides examples to guide the AI's output format (e.g., 'Example 1: input → output')")
                  : t("generator.style_description.standard", "Direct instructions without special techniques")}
              </p>
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
              <p className="mt-1 text-xs text-muted-foreground">
                {t("generator.format_description", "Specify how you want the information structured in the response")}
              </p>
            </div>
            
            <div>
              <Label htmlFor="constraints">{t("generator.constraints", "Constraints (optional)")}</Label>
              <Textarea
                id="constraints"
                placeholder={getExampleConstraints()}
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                className={`w-full h-20 mt-1.5 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-background border-input'
                }`}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {t("generator.constraints_description", "Set limits or requirements (e.g., 'Maximum 500 words, avoid technical jargon, include 3 examples')")}
              </p>
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
          
          <div className="mt-4 flex justify-between items-start">
            <div>
              <h4 className="text-sm font-medium mb-2">{t("generator.tips.title", "Tips for better results")}</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• {t("generator.tips.specific", "Be specific with your instructions")}</li>
                <li>• {t("generator.tips.examples", "Include examples when possible")}</li>
                <li>• {t("generator.tips.constraints", "Set clear constraints (length, tone, etc.)")}</li>
                <li>• {t("generator.tips.iterate", "Iterate and refine for best results")}</li>
              </ul>
            </div>
            <Button 
              onClick={copyToClipboard} 
              variant="secondary" 
              size="sm"
              className="flex items-center gap-1.5"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? t("generator.copied", "Copied!") : t("generator.copy", "Copy")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;
