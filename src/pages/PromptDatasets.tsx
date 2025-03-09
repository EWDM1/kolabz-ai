
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultLayout from "@/components/DefaultLayout";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Database, FileText, ListFilter, Sparkles } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const datasetCategories = [
  { id: "techniques", name: "Techniques", count: "24 datasets" },
  { id: "applications", name: "Applications", count: "18 datasets" },
  { id: "models", name: "Models", count: "15 datasets" },
  { id: "tools", name: "Tools & Frameworks", count: "12 datasets" },
  { id: "research", name: "Research Papers", count: "30 datasets" },
];

const featuredDatasets = [
  {
    id: "tech-001",
    name: "Chain-of-Thought Prompting",
    description: "Step-by-step reasoning techniques for complex problem solving",
    category: "techniques",
    popularity: "Popular",
  },
  {
    id: "app-003",
    name: "Customer Support Templates",
    description: "Pre-built templates for common customer service scenarios",
    category: "applications",
    popularity: "New",
  },
  {
    id: "mod-002",
    name: "GPT-4 Best Practices",
    description: "Optimization strategies for OpenAI's GPT-4 model",
    category: "models",
    popularity: "Popular",
  },
];

const PromptDatasets = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("featured");

  const handleSubscribe = () => {
    navigate("/checkout", { 
      state: { 
        planId: "pro",
        isAnnual: true
      } 
    });
  };

  return (
    <DefaultLayout>
      <div className="container max-w-6xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Prompt Datasets</h1>
          <p className="text-lg text-muted-foreground">
            Access pre-built prompt datasets to create powerful AI applications faster
          </p>
        </div>

        <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="all">All Datasets</TabsTrigger>
            </TabsList>

            <Button variant="outline" size="sm" className="gap-2">
              <ListFilter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <TabsContent value="featured">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredDatasets.map((dataset) => (
                <Card key={dataset.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="font-semibold">{dataset.name}</CardTitle>
                      <Badge variant={dataset.popularity === "New" ? "secondary" : "outline"}>
                        {dataset.popularity}
                      </Badge>
                    </div>
                    <CardDescription>{dataset.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Database className="h-3.5 w-3.5 mr-1" />
                      <span className="capitalize">{dataset.category}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {user ? (
                      <Button variant="default" className="w-full justify-between">
                        View Dataset <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="default" className="w-full justify-between" onClick={handleSubscribe}>
                        Subscribe to Access <Sparkles className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {datasetCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.count}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full justify-between">
                      Browse Category <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="flex items-center justify-center h-60 border rounded-md bg-muted/10">
              <div className="text-center">
                <FileText className="h-10 w-10 mb-4 mx-auto text-muted-foreground" />
                <h3 className="font-medium mb-1">All Datasets</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Premium feature - Subscribe to access all 99+ datasets
                </p>
                <Button onClick={handleSubscribe} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Subscribe Now
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default PromptDatasets;
