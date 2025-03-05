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
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

const MyPrompts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my-prompts");
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleDeletePrompt = (id: number) => {
    toast({
      title: "Prompt deleted",
      description: "The prompt has been deleted from your library",
    });
  };

  const handleDuplicatePrompt = (id: number) => {
    toast({
      title: "Prompt duplicated",
      description: "The prompt has been duplicated in your library",
    });
  };

  const sortPrompts = (prompts: any[]) => {
    if (sortOrder === "newest") {
      return [...prompts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortOrder === "oldest") {
      return [...prompts].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortOrder === "nameAsc") {
      return [...prompts].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "nameDesc") {
      return [...prompts].sort((a, b) => b.title.localeCompare(a.title));
    }
    return prompts;
  };

  const filterPrompts = (prompts: any[]) => {
    if (filterCategory === "all") {
      return prompts;
    } else {
      return prompts.filter((prompt) => prompt.tags.includes(filterCategory));
    }
  };

  const savedPrompts = [
    {
      id: 1,
      title: "Marketing Campaign Strategy",
      model: "GPT-4",
      date: "2023-07-15",
      content:
        "Create a comprehensive marketing campaign strategy for a new product launch targeting millennials...",
      tags: ["marketing", "strategy"],
    },
    {
      id: 2,
      title: "Research Literature Review",
      model: "Claude",
      date: "2023-07-12",
      content:
        "Conduct a thorough literature review on the effects of climate change on marine ecosystems...",
      tags: ["research", "academic"],
    },
    {
      id: 3,
      title: "Website UX Improvement",
      model: "GPT-4",
      date: "2023-07-10",
      content:
        "Analyze the following website design and provide specific recommendations for improving user experience...",
      tags: ["design", "ux"],
    },
  ];

  const filteredPrompts = sortPrompts(
    filterPrompts(
      savedPrompts.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.tags.some((tag) => tag.includes(searchQuery.toLowerCase()))
      )
    )
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
            
            <LanguageSelector />
            <ThemeToggle />

            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => handleNavigation("/my-settings")}
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
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-prompts")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left bg-primary/10 text-primary font-medium"
                  >
                    <ListChecks className="h-5 w-5" />
                    <span>My Prompts</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-settings")}
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
                    onClick={() => handleNavigation("/manage-subscription")}
                  >
                    Manage Subscription
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>My Prompts</CardTitle>
                    <CardDescription>
                      Browse, filter, and manage your saved prompts
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Prompt
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-64 md:hidden">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search prompts..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => setFilterCategory("all")}>
                            <CheckCircle2
                              className={`h-4 w-4 mr-2 ${
                                filterCategory === "all" ? "text-primary" : "hidden"
                              }`}
                            />
                            All Categories
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setFilterCategory("marketing")}
                          >
                            <CheckCircle2
                              className={`h-4 w-4 mr-2 ${
                                filterCategory === "marketing"
                                  ? "text-primary"
                                  : "hidden"
                              }`}
                            />
                            Marketing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setFilterCategory("research")}
                          >
                            <CheckCircle2
                              className={`h-4 w-4 mr-2 ${
                                filterCategory === "research"
                                  ? "text-primary"
                                  : "hidden"
                              }`}
                            />
                            Research
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setFilterCategory("design")}
                          >
                            <CheckCircle2
                              className={`h-4 w-4 mr-2 ${
                                filterCategory === "design"
                                  ? "text-primary"
                                  : "hidden"
                              }`}
                            />
                            Design
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                            <CheckCircle2
                              className={`h-4 w-4 mr-2 ${
                                sortOrder === "newest" ? "text-primary" : "hidden"
                              }`}
                            />
                            Newest First
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                            <CheckCircle2
                              className={`h-4 w-4 mr-2 ${
                                sortOrder === "oldest" ? "text-primary" : "hidden"
                              }`}
                            />
                            Oldest First
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortOrder("nameAsc")}>
                            <CheckCircle2
                              className={`h-4 w-4 mr-2 ${
                                sortOrder === "nameAsc" ? "text-primary" : "hidden"
                              }`}
                            />
                            Name (A-Z)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortOrder("nameDesc")}>
                            <CheckCircle2
                              className={`h-4 w-4 mr-2 ${
                                sortOrder === "nameDesc" ? "text-primary" : "hidden"
                              }`}
                            />
                            Name (Z-A)
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPrompts;
