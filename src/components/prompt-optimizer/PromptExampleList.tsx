
import { useState } from "react";
import { MessageSquare, Filter } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface PromptExample {
  title: string;
  prompt: string;
  category: string;
}

const EXAMPLE_PROMPTS: PromptExample[] = [
  {
    title: "Market Research Report",
    prompt: "Analyze the electric vehicle market trends in Europe for Q2 2023",
    category: "Business"
  },
  {
    title: "Content Marketing Strategy",
    prompt: "Create a content calendar for a SaaS startup's product launch",
    category: "Marketing"
  },
  {
    title: "Code Debugging Help",
    prompt: "Fix this React useEffect hook that's causing infinite rendering",
    category: "Development"
  },
  {
    title: "Data Visualization Guide",
    prompt: "Suggest the best charts to represent customer retention data",
    category: "Analytics"
  },
  {
    title: "Email Campaign Template",
    prompt: "Write a welcome email sequence for new e-commerce customers",
    category: "Marketing"
  },
  {
    title: "Product Feature Analysis",
    prompt: "Compare the top 3 AI assistants on the market based on features, pricing and usability",
    category: "Business"
  },
  {
    title: "API Documentation Example",
    prompt: "Create an example documentation for a RESTful API endpoint that handles user authentication",
    category: "Development"
  },
  {
    title: "Data Mining Query",
    prompt: "Write a prompt to extract key insights from customer feedback surveys",
    category: "Analytics"
  }
];

// Get unique categories from the example prompts
const CATEGORIES = ["All", ...new Set(EXAMPLE_PROMPTS.map(example => example.category))];

interface PromptExampleListProps {
  onSelectExample: (prompt: string) => void;
}

const PromptExampleList = ({ onSelectExample }: PromptExampleListProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredExamples = selectedCategory === "All" 
    ? EXAMPLE_PROMPTS 
    : EXAMPLE_PROMPTS.filter(example => example.category === selectedCategory);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Example Prompts</h3>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExamples.map((example, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onSelectExample(example.prompt)}
          >
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">{example.title}</CardTitle>
                </div>
                <Badge variant="outline">{example.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground truncate">{example.prompt}</p>
            </CardContent>
            <CardFooter className="pt-0 pb-3">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                Use This Example
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredExamples.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground">No examples found for this category.</p>
          <Button 
            variant="link" 
            size="sm" 
            onClick={() => setSelectedCategory("All")}
          >
            View all examples
          </Button>
        </div>
      )}
    </div>
  );
};

export default PromptExampleList;
