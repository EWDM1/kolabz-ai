
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface PromptExample {
  title: string;
  prompt: string;
}

const EXAMPLE_PROMPTS: PromptExample[] = [
  {
    title: "Market Research Report",
    prompt: "Analyze the electric vehicle market trends in Europe for Q2 2023"
  },
  {
    title: "Content Marketing Strategy",
    prompt: "Create a content calendar for a SaaS startup's product launch"
  },
  {
    title: "Code Debugging Help",
    prompt: "Fix this React useEffect hook that's causing infinite rendering"
  },
  {
    title: "Data Visualization Guide",
    prompt: "Suggest the best charts to represent customer retention data"
  }
];

interface PromptExampleListProps {
  onSelectExample: (prompt: string) => void;
}

const PromptExampleList = ({ onSelectExample }: PromptExampleListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      {EXAMPLE_PROMPTS.map((example, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => onSelectExample(example.prompt)}
        >
          <CardHeader className="py-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">{example.title}</CardTitle>
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
  );
};

export default PromptExampleList;
