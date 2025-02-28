
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Settings,
  LogOut,
  User,
  PlusCircle,
  Search,
  Edit,
  Trash,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PromptGenerator from "@/components/PromptGenerator";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Mock saved prompts data
  const savedPrompts = [
    {
      id: 1,
      title: "Marketing Campaign Strategy",
      model: "GPT-4",
      date: "2023-07-15",
      content: "Create a comprehensive marketing campaign strategy for a new product launch targeting millennials...",
      tags: ["marketing", "strategy"],
    },
    {
      id: 2,
      title: "Research Literature Review",
      model: "Claude",
      date: "2023-07-12",
      content: "Conduct a thorough literature review on the effects of climate change on marine ecosystems...",
      tags: ["research", "academic"],
    },
    {
      id: 3,
      title: "Website UX Improvement",
      model: "GPT-4",
      date: "2023-07-10",
      content: "Analyze the following website design and provide specific recommendations for improving user experience...",
      tags: ["design", "ux"],
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    // In a real app, this would redirect to login page
    navigate("/login");
  };

  const handleDeletePrompt = (id: number) => {
    toast({
      title: "Prompt deleted",
      description: "The prompt has been deleted from your library",
    });
    // In a real app, this would remove the prompt from the database
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSettings = () => {
    navigate("/mysettings");
  };

  const handleManageSubscription = () => {
    navigate("/manage-subscription");
  };

  const filteredPrompts = savedPrompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.includes(searchQuery.toLowerCase()))
  );

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
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search prompts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ThemeToggle />

            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={handleSettings}
            >
              <span className="text-sm font-medium hidden md:inline-block">
                John Doe
              </span>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-4 lg:gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left bg-primary/10 text-primary font-medium"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-prompts")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <ListChecks className="h-5 w-5" />
                    <span>My Prompts</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/mysettings")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
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
                <div className="bg-muted rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Pro Plan</span>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Next billing on Aug 12, 2023
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs" 
                    onClick={handleManageSubscription}
                  >
                    Manage Subscription
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            {activeTab === "settings" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" defaultValue="john@example.com" />
                      </div>
                    </div>
                    <Button>Update Profile</Button>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button>Change Password</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="create" className="w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                  <TabsList className="flex-shrink-0">
                    <TabsTrigger value="create">Create Prompt</TabsTrigger>
                    <TabsTrigger value="saved">
                      Saved Prompts <span className="ml-1 text-xs">{savedPrompts.length}</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="md:hidden w-full">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-8 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <TabsContent value="create" className="space-y-6 mt-2">
                  <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                    <h2 className="text-2xl font-display font-bold mb-6">Create New Prompt</h2>
                    <PromptGenerator />
                  </div>
                </TabsContent>

                <TabsContent value="saved" className="space-y-6 mt-2">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                          <CardTitle>Saved Prompts</CardTitle>
                          <CardDescription>
                            Browse and manage your saved prompts
                          </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button size="sm" onClick={() => navigate("/my-prompts")}>
                            View All Prompts
                          </Button>
                          <Button size="sm">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            New Prompt
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filteredPrompts.length > 0 ? (
                        <div className="space-y-4">
                          {filteredPrompts.map((prompt) => (
                            <div
                              key={prompt.id}
                              className="border border-border rounded-lg p-4 hover:shadow-sm transition-all-200 bg-card"
                            >
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                                <div>
                                  <h3 className="font-medium text-lg">{prompt.title}</h3>
                                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                    <span>Model: {prompt.model}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>Created: {prompt.date}</span>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                    onClick={() => handleDeletePrompt(prompt.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                                {prompt.content}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {prompt.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No prompts found</h3>
                          <p className="text-muted-foreground mb-4">
                            {searchQuery
                              ? `No results matching "${searchQuery}"`
                              : "You haven't saved any prompts yet"}
                          </p>
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create New Prompt
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
