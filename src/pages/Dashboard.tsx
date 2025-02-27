
import { useState } from "react";
import { Link } from "react-router-dom";
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
  const { toast } = useToast();
  const { theme } = useTheme();

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
  };

  const handleDeletePrompt = (id: number) => {
    toast({
      title: "Prompt deleted",
      description: "The prompt has been deleted from your library",
    });
    // In a real app, this would remove the prompt from the database
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

            <div className="flex items-center space-x-2">
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
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
              <div className="p-4">
                <nav className="space-y-1">
                  <a
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted"
                  >
                    <ListChecks className="h-5 w-5" />
                    <span>My Prompts</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </a>
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
                  Subscription
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
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Manage Subscription
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <Tabs defaultValue="create">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="create">Create Prompt</TabsTrigger>
                  <TabsTrigger value="saved">
                    Saved Prompts <span className="ml-1 text-xs">{savedPrompts.length}</span>
                  </TabsTrigger>
                </TabsList>

                <div className="md:hidden">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-8 w-40"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <TabsContent value="create" className="space-y-6">
                <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                  <h2 className="text-2xl font-display font-bold mb-6">Create New Prompt</h2>
                  <PromptGenerator />
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Saved Prompts</CardTitle>
                        <CardDescription>
                          Browse and manage your saved prompts
                        </CardDescription>
                      </div>
                      <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Prompt
                      </Button>
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
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-lg">{prompt.title}</h3>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <span>Model: {prompt.model}</span>
                                  <span>•</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
