
import { useTheme } from "@/components/ThemeProvider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PromptOptimizerCard = () => {
  const { theme } = useTheme();
  
  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle>Prompt Optimizer</CardTitle>
        <CardDescription>Create and optimize AI prompts for better results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className={`p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'border-gray-700 bg-gray-800' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex justify-between">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Target Model</span>
                <span className="text-xs font-medium text-primary">GPT-4</span>
              </div>
              <div className="mt-1 font-medium text-sm text-foreground">Create a data visualization dashboard</div>
            </div>
            
            <div className={`p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'border-gray-700' 
                : 'border-gray-200'
            }`}>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Optimized Prompt</span>
              <div className="mt-1 text-sm leading-relaxed text-foreground">
                Design a comprehensive data visualization dashboard with the following specifications:
                <ul className={`mt-1 pl-4 space-y-1 list-disc text-xs ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>Include 4-5 key metrics as KPIs at the top</li>
                  <li>Create time-series charts for trend analysis</li>
                  <li>Add filtering capabilities by date range and categories</li>
                  <li>Design with accessibility and mobile responsiveness in mind</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors`}>
              Copy
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Refine
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to="/my-prompts">
            Create New Prompt
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptOptimizerCard;
