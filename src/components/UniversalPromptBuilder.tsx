
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, ClipboardCopy } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface ModelTemplate {
  name: string;
  useCase: string;
  structure: string;
  example: string;
}

const UniversalPromptBuilder = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('builder');
  
  // Form state
  const [role, setRole] = useState('');
  const [context, setContext] = useState('');
  const [task, setTask] = useState('');
  const [format, setFormat] = useState('');
  const [examples, setExamples] = useState('');
  const [constraints, setConstraints] = useState('');
  const [output, setOutput] = useState('');
  
  // Selected model template
  const [selectedModel, setSelectedModel] = useState('gpt4');
  
  // Generated prompt
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  
  // Model templates
  const modelTemplates: Record<string, ModelTemplate> = {
    gpt4: {
      name: 'OpenAI (GPT-4)',
      useCase: 'Complex reasoning with chain-of-thought',
      structure: '[Role] Act as a physics tutor.\n[Context] Explain to a high school student.\n[Task] Describe why the sky appears blue, using step-by-step reasoning.\n[Format] Bullet points with emojis for engagement.\n[Output]: Why is the sky blue?',
      example: '1. 🌞 Sunlight contains all colors (white light).\n2. 🌍 Earth\'s atmosphere scatters shorter wavelengths (blue) more than others.\n3. 👀 Our eyes perceive this scattered blue light as the sky\'s color.'
    },
    gemini: {
      name: 'Google Gemini',
      useCase: 'Multimodal task (image + text)',
      structure: '[Role] Act as a historian and art critic.\n[Context] Analyze this image of the "Starry Night" painting: [image link].\n[Task] Explain its historical significance and artistic techniques.\n[Format] 3 paragraphs (history, technique, legacy).\n[Output]: Provide your analysis.',
      example: '1. **Historical Context**: Painted by Van Gogh in 1889 during his asylum stay...\n2. **Technique**: Bold swirls represent turbulent emotions...\n3. **Legacy**: Influenced modern expressionism...'
    },
    claude: {
      name: 'Anthropic Claude 3',
      useCase: 'Ethical analysis with Constitutional AI',
      structure: '[Role] Act as an ethics advisor.\n[Context] A company wants to use AI for hiring.\n[Task] Identify 3 risks of bias and solutions.\n[Format] JSON with "risk" and "solution" keys.\n[Output]: Provide your analysis.',
      example: '```json\n[\n  { "risk": "Training data lacks diversity", "solution": "Audit datasets for representation" },\n  { "risk": "Over-reliance on resume keywords", "solution": "Add skill-based assessments" }\n]\n```'
    },
    llama: {
      name: 'Meta Llama 3',
      useCase: 'Open-source coding assistance',
      structure: '[Role] Act as a Python DevOps engineer.\n[Context] Use the `requests` library.\n[Task] Write a script to check if a website is online, with retries every 10 seconds.\n[Format] Code + brief explanation.\n[Output]: Provide the script.',
      example: '```python\nimport requests, time\ndef check_website(url, max_retries=3):\n  for _ in range(max_retries):\n    try:\n      response = requests.get(url)\n      return True if response.status_code == 200 else False\n    except:\n      time.sleep(10)\n  return False\n```'
    }
  };
  
  // Generate the universal prompt
  const generatePrompt = () => {
    let prompt = '';
    
    if (role) prompt += `[Role] ${role}\n`;
    if (context) prompt += `[Context] ${context}\n`;
    if (task) prompt += `[Task] ${task}\n`;
    if (format) prompt += `[Format] ${format}\n`;
    if (examples) prompt += `[Examples] ${examples}\n`;
    if (constraints) prompt += `[Constraints] ${constraints}\n`;
    if (output) prompt += `[Output]: ${output}`;
    
    setGeneratedPrompt(prompt);
    setActiveTab('preview');
    
    toast({
      title: t("prompt.generated", "Prompt Generated"),
      description: t("prompt.preview_ready", "Your universal prompt is ready. Switch to the Preview tab to see it.")
    });
  };
  
  // Copy prompt to clipboard
  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: t("prompt.copied", "Copied to Clipboard"),
      description: t("prompt.copy_success", "Your prompt has been copied to clipboard.")
    });
  };
  
  // Download prompt as text file
  const downloadPrompt = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedPrompt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'universal-prompt.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: t("prompt.downloaded", "Download Started"),
      description: t("prompt.download_success", "Your prompt has been downloaded as a text file.")
    });
  };
  
  // Load a model template
  const loadTemplate = (model: string) => {
    setSelectedModel(model);
    const template = modelTemplates[model];
    
    // Extract sections from the template structure
    const sections = template.structure.split('\n');
    
    // Reset all fields
    setRole('');
    setContext('');
    setTask('');
    setFormat('');
    setExamples('');
    setConstraints('');
    setOutput('');
    
    // Fill in the fields based on the template
    sections.forEach(section => {
      if (section.startsWith('[Role]')) {
        setRole(section.replace('[Role] ', ''));
      } else if (section.startsWith('[Context]')) {
        setContext(section.replace('[Context] ', ''));
      } else if (section.startsWith('[Task]')) {
        setTask(section.replace('[Task] ', ''));
      } else if (section.startsWith('[Format]')) {
        setFormat(section.replace('[Format] ', ''));
      } else if (section.startsWith('[Examples]')) {
        setExamples(section.replace('[Examples] ', ''));
      } else if (section.startsWith('[Constraints]')) {
        setConstraints(section.replace('[Constraints] ', ''));
      } else if (section.startsWith('[Output]')) {
        setOutput(section.replace('[Output]: ', ''));
      }
    });
    
    toast({
      title: t("prompt.template_loaded", "Template Loaded"),
      description: t("prompt.template_success", `Loaded ${template.name} template for ${template.useCase}.`)
    });
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t("prompt.universal_title", "Universal AI Prompt Builder")}</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="builder">{t("prompt.builder", "Prompt Builder")}</TabsTrigger>
          <TabsTrigger value="preview">{t("prompt.preview", "Preview")}</TabsTrigger>
          <TabsTrigger value="templates">{t("prompt.templates", "Templates")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="builder">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("prompt.structure", "Prompt Structure")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="role">{t("prompt.role", "Role")} ({t("prompt.optional", "optional")})</Label>
                  <Input
                    id="role"
                    placeholder={t("prompt.role_placeholder", "e.g., Act as an expert mathematician")}
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("prompt.role_hint", "Define the AI's persona or expertise.")}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="context">{t("prompt.context", "Context")} ({t("prompt.optional", "optional")})</Label>
                  <Textarea
                    id="context"
                    placeholder={t("prompt.context_placeholder", "e.g., This answer should be suitable for a beginner")}
                    rows={2}
                    value={context}
                    onChange={e => setContext(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("prompt.context_hint", "Provide background information or constraints.")}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="task">{t("prompt.task", "Task")} <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="task"
                    placeholder={t("prompt.task_placeholder", "e.g., Explain quantum computing using simple analogies")}
                    rows={2}
                    value={task}
                    onChange={e => setTask(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("prompt.task_hint", "Define what the AI should do.")}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="format">{t("prompt.format", "Format")} ({t("prompt.optional", "optional")})</Label>
                  <Textarea
                    id="format"
                    placeholder={t("prompt.format_placeholder", "e.g., A bullet-point list with 5 key points")}
                    rows={2}
                    value={format}
                    onChange={e => setFormat(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("prompt.format_hint", "Specify output structure: bullet points, JSON, etc.")}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("prompt.advanced", "Advanced Options")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="examples">{t("prompt.examples", "Examples")} ({t("prompt.optional", "optional")})</Label>
                  <Textarea
                    id="examples"
                    placeholder={t("prompt.examples_placeholder", "e.g., Input: X, Output: Y")}
                    rows={2}
                    value={examples}
                    onChange={e => setExamples(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("prompt.examples_hint", "Provide 1-2 examples to guide the AI's response.")}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="constraints">{t("prompt.constraints", "Constraints")} ({t("prompt.optional", "optional")})</Label>
                  <Textarea
                    id="constraints"
                    placeholder={t("prompt.constraints_placeholder", "e.g., Keep response under 100 words, avoid technical jargon")}
                    rows={2}
                    value={constraints}
                    onChange={e => setConstraints(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("prompt.constraints_hint", "Add limitations like word count or style.")}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="output">{t("prompt.output", "Output")} <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="output"
                    placeholder={t("prompt.output_placeholder", "e.g., Why is the sky blue?")}
                    rows={2}
                    value={output}
                    onChange={e => setOutput(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("prompt.output_hint", "Your specific question or request.")}
                  </p>
                </div>
                
                <Button
                  className="w-full mt-4"
                  onClick={generatePrompt}
                  disabled={!task || !output}
                >
                  {t("prompt.generate", "Generate Prompt")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>{t("prompt.generated_prompt", "Generated Prompt")}</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedPrompt ? (
                <>
                  <div className="bg-muted p-4 rounded-md whitespace-pre-wrap mb-4">
                    {generatedPrompt}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      onClick={copyPrompt}
                      className="gap-2"
                    >
                      <Copy size={16} />
                      {t("prompt.copy", "Copy to Clipboard")}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={downloadPrompt}
                      className="gap-2"
                    >
                      <Download size={16} />
                      {t("prompt.download", "Download as Text")}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <ClipboardCopy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {t("prompt.no_prompt", "No Prompt Generated Yet")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("prompt.go_build", "Go to the Prompt Builder tab to create your prompt.")}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab('builder')}
                  >
                    {t("prompt.go_builder", "Go to Builder")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(modelTemplates).map(([key, template]) => (
              <Card key={key} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle>{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>{t("prompt.use_case", "Use Case")}</Label>
                    <p className="text-sm text-muted-foreground">{template.useCase}</p>
                  </div>
                  
                  <div>
                    <Label>{t("prompt.template_structure", "Template Structure")}</Label>
                    <div className="bg-muted p-3 rounded-md text-xs whitespace-pre-wrap mt-1">
                      {template.structure}
                    </div>
                  </div>
                  
                  <div>
                    <Label>{t("prompt.example_output", "Example Output")}</Label>
                    <div className="bg-muted p-3 rounded-md text-xs whitespace-pre-wrap mt-1">
                      {template.example}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => loadTemplate(key)}
                    className="w-full"
                  >
                    {t("prompt.use_template", "Use This Template")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UniversalPromptBuilder;
