
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

// Updated examples that are more focused on best practices
const EXAMPLE_PROMPTS: PromptExample[] = [
  {
    title: "Structured Output",
    prompt: "Generate a JSON response with the top 5 AI use cases in healthcare, including fields for name, description, and implementation difficulty (1-5).",
    category: "Format"
  },
  {
    title: "Chain of Thought",
    prompt: "Solve this math problem step by step: If a store has a 30% off sale, and then offers an additional 15% off the discounted price, what is the total percentage discount?",
    category: "Technique"
  },
  {
    title: "Role Definition",
    prompt: "Act as an experienced cybersecurity expert and analyze potential vulnerabilities in this authentication flow: [describe flow]",
    category: "Technique"
  },
  {
    title: "Zero-Shot Learning",
    prompt: "Without examples, classify the following customer feedback statement into positive, negative, or neutral, and explain your reasoning.",
    category: "Technique"
  },
  {
    title: "Few-Shot Learning",
    prompt: "Task: Classify text as technical or non-technical\nExample 1: 'The API uses OAuth2 for authentication.' → Technical\nExample 2: 'I love the new website design!' → Non-technical\nClassify: 'The recursive function has exponential time complexity.'",
    category: "Technique"
  },
  {
    title: "Content Creation",
    prompt: "Write a concise product description for a smart water bottle that tracks hydration and syncs with mobile apps. Target audience is health-conscious professionals aged 25-40.",
    category: "Content"
  },
  {
    title: "Code Generation",
    prompt: "Create a React component for a responsive navigation bar that collapses into a hamburger menu on mobile devices. Use Tailwind CSS for styling.",
    category: "Development"
  },
  {
    title: "Personalized Learning",
    prompt: "I'm a beginner learning about machine learning. Explain how neural networks work in simple terms with an analogy that would help me understand the concept of backpropagation.",
    category: "Education"
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
