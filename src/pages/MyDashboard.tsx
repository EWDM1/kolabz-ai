
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

const MyDashboard = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { user } = useAuth();
  
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
                    <span>Dashboard</span>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Prompt Optimizer Tool Card */}
              <Card className="col-span-1 lg:col-span-2 lg:col-span-1">
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
                      {user?.subscription?.plan || "Pro Plan"}
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
