
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TechniquesDataset from "@/components/datasets/TechniquesDataset";
import ApplicationsDataset from "@/components/datasets/ApplicationsDataset";
import ModelsDataset from "@/components/datasets/ModelsDataset";
import ToolsDataset from "@/components/datasets/ToolsDataset";
import PapersDataset from "@/components/datasets/PapersDataset";
import GlossaryDataset from "@/components/datasets/GlossaryDataset";
import TutorialsDataset from "@/components/datasets/TutorialsDataset";
import CaseStudiesDataset from "@/components/datasets/CaseStudiesDataset";

const DatasetPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Prompt Engineering Datasets</h1>
          <p className="text-muted-foreground mb-8">
            Structured collections of prompt engineering knowledge from promptingguide.ai
          </p>

          <Tabs defaultValue="techniques" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
              <TabsTrigger value="techniques">Techniques</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
              <TabsTrigger value="papers">Papers</TabsTrigger>
              <TabsTrigger value="glossary">Glossary</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="casestudies">Case Studies</TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader>
                <CardTitle>Prompt Engineering Dataset Builder</CardTitle>
                <CardDescription>
                  Browse, filter, and export structured datasets for AI prompt engineering knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="techniques">
                  <TechniquesDataset />
                </TabsContent>
                <TabsContent value="applications">
                  <ApplicationsDataset />
                </TabsContent>
                <TabsContent value="models">
                  <ModelsDataset />
                </TabsContent>
                <TabsContent value="tools">
                  <ToolsDataset />
                </TabsContent>
                <TabsContent value="papers">
                  <PapersDataset />
                </TabsContent>
                <TabsContent value="glossary">
                  <GlossaryDataset />
                </TabsContent>
                <TabsContent value="tutorials">
                  <TutorialsDataset />
                </TabsContent>
                <TabsContent value="casestudies">
                  <CaseStudiesDataset />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DatasetPage;
