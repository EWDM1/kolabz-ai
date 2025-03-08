
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MyDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  return (
    <SidebarLayout activeMenuItem="dashboard">
      <div className="flex flex-col space-y-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "User"}! Optimize your AI prompts with our tools.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Prompt Optimizer Tool Card */}
          <Card className="col-span-2 md:col-span-1">
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
                      [Role] Act as a data visualization expert.<br />
                      [Context] Design for a business intelligence tool.<br />
                      [Task] Create a comprehensive data visualization dashboard with:<br />
                      <ul className={`mt-1 pl-4 space-y-1 list-disc text-xs ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <li>4-5 key metrics as KPIs at the top</li>
                        <li>Time-series charts for trend analysis</li>
                        <li>Filtering capabilities by date range and categories</li>
                        <li>Mobile responsive design with accessibility features</li>
                      </ul>
                      [Format] Provide mockup description and technical implementation details.
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        Refine
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Refine Your Prompt</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="model">Target Model</Label>
                          <Input id="model" defaultValue="GPT-4" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prompt">Base Prompt</Label>
                          <Input id="prompt" defaultValue="Create a data visualization dashboard" />
                        </div>
                        <div className="flex justify-end pt-2">
                          <Button>Optimize</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
          
          {/* Account Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>Manage your profile and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="text-sm font-medium">
                  {user?.subscription?.plan || "Free Plan"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Prompts Created</span>
                <span className="text-sm font-medium">
                  {user?.stats?.promptsCreated || "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Usage</span>
                <span className="text-sm font-medium">
                  {user?.stats?.usage || "0%"}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link to="/my-settings">Settings</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/manage-subscription">Subscription</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
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
    </SidebarLayout>
  );
};

export default MyDashboard;
