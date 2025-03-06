
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/LanguageContext';
import DatasetBuilder from '@/components/DatasetBuilder';
import UniversalPromptBuilder from '@/components/UniversalPromptBuilder';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PromptingTools = () => {
  const [activeTab, setActiveTab] = useState<string>("universal");
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {t("tools.title", "Prompting Tools")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("tools.description", "Specialized tools to help you craft perfect prompts and organize your AI knowledge.")}
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="universal">
                  {t("tools.universal_prompt", "Universal Prompt")}
                </TabsTrigger>
                <TabsTrigger value="datasets">
                  {t("tools.datasets", "Datasets")}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="universal">
              <UniversalPromptBuilder />
            </TabsContent>
            
            <TabsContent value="datasets">
              <DatasetBuilder />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PromptingTools;
