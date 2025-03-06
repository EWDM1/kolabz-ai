
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  createDatasetId,
  validateEntry,
  crossReferenceDatasets,
  mergeDatasets,
  TechniqueEntry,
  ApplicationEntry,
  ModelEntry,
  ToolEntry,
  PaperEntry,
  GlossaryEntry,
  GuideEntry,
  CaseStudyEntry
} from '@/utils/datasetUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Download, Upload, Trash2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const DatasetBuilder = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('techniques');
  
  // Dataset states
  const [techniques, setTechniques] = useState<TechniqueEntry[]>([]);
  const [applications, setApplications] = useState<ApplicationEntry[]>([]);
  const [models, setModels] = useState<ModelEntry[]>([]);
  const [tools, setTools] = useState<ToolEntry[]>([]);
  const [papers, setPapers] = useState<PaperEntry[]>([]);
  const [glossary, setGlossary] = useState<GlossaryEntry[]>([]);
  const [guides, setGuides] = useState<GuideEntry[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudyEntry[]>([]);
  
  // Form states (for adding new entries)
  const [newTechnique, setNewTechnique] = useState<Partial<TechniqueEntry>>({
    name: '',
    description: '',
    use_cases: [],
    examples: [],
    best_practices: [],
    related_techniques: []
  });
  
  // More form states would be added for other dataset types
  
  const exportDatasets = useCallback(() => {
    // Cross-reference datasets
    const updatedTechniques = crossReferenceDatasets(
      techniques,
      techniques,
      'related_techniques'
    ) as TechniqueEntry[];
    
    const updatedApplications = crossReferenceDatasets(
      applications,
      techniques,
      'related_techniques'
    ) as ApplicationEntry[];
    
    // Prepare data export
    const exportData = {
      techniques: updatedTechniques,
      applications: updatedApplications,
      models,
      tools,
      papers,
      glossary,
      guides,
      caseStudies
    };
    
    // Create download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `promptingguide-datasets-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    linkElement.remove();
    
    toast({
      title: t("dataset.export_success", "Export Successful"),
      description: t("dataset.export_complete", "All datasets have been exported successfully.")
    });
  }, [techniques, applications, models, tools, papers, glossary, guides, caseStudies, toast, t]);
  
  const importDatasets = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Update datasets with imported data, merging with existing data
        if (importedData.techniques) {
          setTechniques(prev => mergeDatasets([prev, importedData.techniques]));
        }
        
        if (importedData.applications) {
          setApplications(prev => mergeDatasets([prev, importedData.applications]));
        }
        
        if (importedData.models) {
          setModels(prev => mergeDatasets([prev, importedData.models]));
        }
        
        if (importedData.tools) {
          setTools(prev => mergeDatasets([prev, importedData.tools]));
        }
        
        if (importedData.papers) {
          setPapers(prev => mergeDatasets([prev, importedData.papers]));
        }
        
        if (importedData.glossary) {
          // Glossary doesn't have IDs, so handle differently
          const uniqueTerms = new Set([...glossary.map(g => g.term), ...importedData.glossary.map((g: GlossaryEntry) => g.term)]);
          const mergedGlossary = Array.from(uniqueTerms).map(term => {
            const existing = glossary.find(g => g.term === term);
            const imported = importedData.glossary.find((g: GlossaryEntry) => g.term === term);
            return existing || imported;
          });
          setGlossary(mergedGlossary);
        }
        
        if (importedData.guides) {
          setGuides(prev => mergeDatasets([prev, importedData.guides]));
        }
        
        if (importedData.caseStudies) {
          setCaseStudies(prev => mergeDatasets([prev, importedData.caseStudies]));
        }
        
        toast({
          title: t("dataset.import_success", "Import Successful"),
          description: t("dataset.import_complete", "Datasets have been imported and merged with existing data.")
        });
      } catch (error) {
        console.error('Error importing data:', error);
        toast({
          variant: "destructive",
          title: t("dataset.import_error", "Import Failed"),
          description: t("dataset.import_invalid", "The selected file contains invalid data.")
        });
      }
    };
    
    reader.readAsText(file);
    // Reset the input
    event.target.value = '';
  }, [glossary, toast, t]);
  
  const addTechnique = useCallback(() => {
    if (!newTechnique.name || !newTechnique.description) {
      toast({
        variant: "destructive",
        title: t("dataset.validation_error", "Validation Error"),
        description: t("dataset.required_fields", "Please fill in all required fields.")
      });
      return;
    }
    
    const technique: TechniqueEntry = {
      id: createDatasetId('technique', techniques.length),
      name: newTechnique.name,
      description: newTechnique.description,
      use_cases: newTechnique.use_cases || [],
      examples: newTechnique.examples || [],
      best_practices: newTechnique.best_practices || [],
      related_techniques: newTechnique.related_techniques || []
    };
    
    setTechniques(prev => [...prev, technique]);
    
    // Reset form
    setNewTechnique({
      name: '',
      description: '',
      use_cases: [],
      examples: [],
      best_practices: [],
      related_techniques: []
    });
    
    toast({
      title: t("dataset.technique_added", "Technique Added"),
      description: t("dataset.technique_success", `"${technique.name}" has been added successfully.`)
    });
  }, [newTechnique, techniques, toast, t]);
  
  // Additional handlers for other dataset types would be implemented similarly
  
  // Helper to handle array input changes
  const handleArrayInput = (
    value: string,
    field: string,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const items = value.split('\n').filter(item => item.trim());
    setter((prev: any) => ({
      ...prev,
      [field]: items
    }));
  };
  
  // UI for the component
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t("dataset.builder_title", "AI Prompt Dataset Builder")}</h1>
      
      <div className="flex justify-between mb-6">
        <div className="space-x-2">
          <Button 
            onClick={exportDatasets}
            className="gap-2"
          >
            <Download size={16} />
            {t("dataset.export", "Export Datasets")}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => document.getElementById('import-file')?.click()}
            className="gap-2"
          >
            <Upload size={16} />
            {t("dataset.import", "Import Datasets")}
          </Button>
          <input
            id="import-file"
            type="file"
            accept=".json"
            onChange={importDatasets}
            className="hidden"
          />
        </div>
        
        <div>
          <Button 
            variant="secondary"
            onClick={() => {
              // Reset all datasets
              if (window.confirm(t("dataset.confirm_reset", "Are you sure you want to reset all datasets? This cannot be undone."))) {
                setTechniques([]);
                setApplications([]);
                setModels([]);
                setTools([]);
                setPapers([]);
                setGlossary([]);
                setGuides([]);
                setCaseStudies([]);
                
                toast({
                  title: t("dataset.reset_success", "Reset Complete"),
                  description: t("dataset.reset_message", "All datasets have been reset.")
                });
              }
            }}
            className="gap-2"
          >
            <Trash2 size={16} />
            {t("dataset.reset", "Reset All")}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="techniques">{t("dataset.techniques", "Techniques")}</TabsTrigger>
          <TabsTrigger value="applications">{t("dataset.applications", "Applications")}</TabsTrigger>
          <TabsTrigger value="models">{t("dataset.models", "Models")}</TabsTrigger>
          <TabsTrigger value="tools">{t("dataset.tools", "Tools")}</TabsTrigger>
          <TabsTrigger value="papers">{t("dataset.papers", "Papers")}</TabsTrigger>
          <TabsTrigger value="glossary">{t("dataset.glossary", "Glossary")}</TabsTrigger>
          <TabsTrigger value="guides">{t("dataset.guides", "Guides")}</TabsTrigger>
          <TabsTrigger value="caseStudies">{t("dataset.case_studies", "Case Studies")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="techniques">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dataset.add_technique", "Add New Technique")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="technique-name">{t("dataset.name", "Name")}</Label>
                      <Input
                        id="technique-name"
                        value={newTechnique.name}
                        onChange={(e) => setNewTechnique({...newTechnique, name: e.target.value})}
                        placeholder={t("dataset.technique_name_placeholder", "e.g., Chain-of-Thought Prompting")}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="technique-description">{t("dataset.description", "Description")}</Label>
                      <Textarea
                        id="technique-description"
                        value={newTechnique.description}
                        onChange={(e) => setNewTechnique({...newTechnique, description: e.target.value})}
                        placeholder={t("dataset.technique_desc_placeholder", "Brief explanation of the technique")}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="technique-use-cases">{t("dataset.use_cases", "Use Cases")}</Label>
                      <Textarea
                        id="technique-use-cases"
                        value={newTechnique.use_cases?.join('\n')}
                        onChange={(e) => handleArrayInput(e.target.value, 'use_cases', setNewTechnique)}
                        placeholder={t("dataset.use_cases_placeholder", "One use case per line")}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="technique-examples">{t("dataset.examples", "Examples")}</Label>
                      <Textarea
                        id="technique-examples"
                        value={newTechnique.examples?.join('\n')}
                        onChange={(e) => handleArrayInput(e.target.value, 'examples', setNewTechnique)}
                        placeholder={t("dataset.examples_placeholder", "One example per line")}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="technique-best-practices">{t("dataset.best_practices", "Best Practices")}</Label>
                      <Textarea
                        id="technique-best-practices"
                        value={newTechnique.best_practices?.join('\n')}
                        onChange={(e) => handleArrayInput(e.target.value, 'best_practices', setNewTechnique)}
                        placeholder={t("dataset.best_practices_placeholder", "One practice per line")}
                        rows={3}
                      />
                    </div>
                    
                    <Button
                      onClick={addTechnique}
                      className="w-full gap-2"
                    >
                      <PlusCircle size={16} />
                      {t("dataset.add", "Add Technique")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dataset.techniques_list", "Techniques List")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {techniques.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      {t("dataset.no_techniques", "No techniques added yet. Add your first technique using the form.")}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {techniques.map((technique) => (
                        <Card key={technique.id} className="p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{technique.name}</h3>
                            <span className="text-xs text-muted-foreground">{technique.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{technique.description}</p>
                          
                          {technique.use_cases.length > 0 && (
                            <div className="mt-2">
                              <h4 className="text-xs font-medium">{t("dataset.use_cases", "Use Cases")}</h4>
                              <ul className="text-xs list-disc pl-4 mt-1">
                                {technique.use_cases.map((useCase, i) => (
                                  <li key={i}>{useCase}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="flex justify-end mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (window.confirm(t("dataset.confirm_delete", "Are you sure you want to delete this technique?"))) {
                                  setTechniques(techniques.filter(t => t.id !== technique.id));
                                  toast({
                                    title: t("dataset.deleted", "Technique Deleted"),
                                    description: t("dataset.delete_success", `"${technique.name}" has been removed.`)
                                  });
                                }
                              }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Similar TabsContent components would be implemented for other dataset types */}
        
        <TabsContent value="applications">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">
              {t("dataset.coming_soon", "Applications Dataset Builder Coming Soon")}
            </h3>
            <p className="text-muted-foreground">
              {t("dataset.applications_coming", "This section is under development. Please check back later.")}
            </p>
          </div>
        </TabsContent>
        
        {/* Placeholder tabs for other dataset types */}
        <TabsContent value="models">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">
              {t("dataset.coming_soon", "Models Dataset Builder Coming Soon")}
            </h3>
            <p className="text-muted-foreground">
              {t("dataset.models_coming", "This section is under development. Please check back later.")}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="tools">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">
              {t("dataset.coming_soon", "Tools Dataset Builder Coming Soon")}
            </h3>
            <p className="text-muted-foreground">
              {t("dataset.tools_coming", "This section is under development. Please check back later.")}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="papers">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">
              {t("dataset.coming_soon", "Papers Dataset Builder Coming Soon")}
            </h3>
            <p className="text-muted-foreground">
              {t("dataset.papers_coming", "This section is under development. Please check back later.")}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="glossary">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">
              {t("dataset.coming_soon", "Glossary Dataset Builder Coming Soon")}
            </h3>
            <p className="text-muted-foreground">
              {t("dataset.glossary_coming", "This section is under development. Please check back later.")}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">
              {t("dataset.coming_soon", "Guides Dataset Builder Coming Soon")}
            </h3>
            <p className="text-muted-foreground">
              {t("dataset.guides_coming", "This section is under development. Please check back later.")}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="caseStudies">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">
              {t("dataset.coming_soon", "Case Studies Dataset Builder Coming Soon")}
            </h3>
            <p className="text-muted-foreground">
              {t("dataset.case_studies_coming", "This section is under development. Please check back later.")}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatasetBuilder;
