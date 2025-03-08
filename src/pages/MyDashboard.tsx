
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  Sparkles,
  HelpCircle,
  ArrowRight,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MyDashboard = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const [targetModel, setTargetModel] = useState("GPT-4");
  const [promptBase, setPromptBase] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  
  // Example prompt template when user clicks on an example
  const useExamplePrompt = (example: string) => {
    setPromptBase(example);
    // In a real app, this would trigger the optimization
    handleOptimizePrompt(example);
  };
  
  // Function to optimize prompt (simulated)
  const handleOptimizePrompt = (prompt: string) => {
    // This would normally call an API to optimize the prompt
    // For now, we'll just simulate the response
    if (prompt.toLowerCase().includes("data visualization")) {
      setOptimizedPrompt(`[Role] Act as a data visualization expert.\n[Context] Design for a business intelligence tool.\n[Task] Create a comprehensive data visualization dashboard with:\n- 4-5 key metrics as KPIs at the top\n- Time-series charts for trend analysis\n- Filtering capabilities by date range and categories\n- Mobile responsive design with accessibility features\n[Format] Provide mockup description and technical implementation details.`);
    } else if (prompt.toLowerCase().includes("blog")) {
      setOptimizedPrompt(`[Role] Act as a professional content writer.\n[Context] Writing for a business audience.\n[Task] Create a compelling blog post that:\n- Has an attention-grabbing headline\n- Includes 3-5 actionable insights\n- Uses data to support key points\n- Ends with a clear call-to-action\n[Format] Provide a full article with H2 and H3 subheadings.`);
    } else {
      setOptimizedPrompt(`[Role] Act as an expert in the requested field.\n[Context] Professional setting appropriate to the topic.\n[Task] Address the prompt with detailed, actionable information.\n[Format] Structured response with clear sections and examples.`);
    }
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    // In a real app, this would call an auth logout function
  };

  return (
    <div className="min-h-screen bg-background/95">
      {/* Dashboard header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            {theme === 'dark' ? (
              <img 
                src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            ) : (
              <img 
                src="/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            )}
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm font-medium hidden md:inline-block">
                {user?.name || "John Doe"}
              </span>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left bg-primary/10 text-primary font-medium"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>My Dashboard</span>
                  </button>
                  <Link
                    to="/my-prompts"
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>My Prompts</span>
                  </Link>
                  <Link
                    to="/manage-subscription"
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Subscription</span>
                  </Link>
                  <Link
                    to="/my-settings"
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>

              <div className="p-4 border-t border-border">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  SUBSCRIPTION
                </h4>
                <div className="bg-primary/10 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{user?.subscription?.plan || "Pro Plan"}</span>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Next billing on Aug 12, 2023
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs bg-card" asChild>
                    <Link to="/manage-subscription">
                      Manage Subscription
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <h1 className="text-2xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground mb-6">
              Welcome back, {user?.name || "John Doe"}! Optimize your AI prompts with our tools.
            </p>
            
            <div className="flex justify-center">
              {/* Prompt Optimizer Tool Card */}
              <Card className="max-w-3xl w-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Prompt Optimizer</CardTitle>
                      <CardDescription>Create and optimize AI prompts for better results</CardDescription>
                    </div>
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="target-model">Target AI Model</Label>
                      <Input 
                        id="target-model"
                        value={targetModel}
                        onChange={(e) => setTargetModel(e.target.value)}
                        placeholder="e.g., GPT-4, Claude, Gemini, etc."
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="prompt-base">Your Base Prompt</Label>
                      <Textarea 
                        id="prompt-base"
                        value={promptBase}
                        onChange={(e) => setPromptBase(e.target.value)}
                        placeholder="Enter your prompt here. Be specific about what you want the AI to do."
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                    
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                      <h3 className="font-medium text-sm mb-2">Example Prompts (Click to use)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <button 
                          onClick={() => useExamplePrompt("Create a data visualization dashboard for sales analytics")}
                          className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors"
                        >
                          Create a data visualization dashboard
                        </button>
                        <button 
                          onClick={() => useExamplePrompt("Write a blog post about productivity tips for remote workers")}
                          className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors"
                        >
                          Write a blog post about productivity
                        </button>
                        <button 
                          onClick={() => useExamplePrompt("Develop a marketing strategy for a new mobile app")}
                          className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors"
                        >
                          Develop a marketing strategy
                        </button>
                        <button 
                          onClick={() => useExamplePrompt("Create a Python script to analyze CSV data")}
                          className="text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors"
                        >
                          Create a Python script
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleOptimizePrompt(promptBase)}
                      className="w-full" 
                      size="lg"
                      disabled={!promptBase.trim()}
                    >
                      Optimize Prompt
                    </Button>
                    
                    {optimizedPrompt && (
                      <div className="mt-6 space-y-4">
                        <h3 className="font-bold">Optimized Prompt:</h3>
                        <div className={`p-4 rounded-lg border ${
                          theme === 'dark' 
                            ? 'border-gray-700 bg-gray-800/50' 
                            : 'border-gray-200 bg-gray-50/80'
                        }`}>
                          <pre className="whitespace-pre-wrap text-sm">{optimizedPrompt}</pre>
                        </div>
                        
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(optimizedPrompt);
                              toast({
                                title: "Copied!",
                                description: "Prompt copied to clipboard",
                              });
                            }}
                          >
                            Copy to Clipboard
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {}}
                          >
                            Save Prompt
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/my-prompts">
                      View All Saved Prompts
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Help & Support Footer */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Need help?</span>
                </div>
                <Button variant="link" size="sm" asChild>
                  <Link to="/help-support">Visit Help & Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
