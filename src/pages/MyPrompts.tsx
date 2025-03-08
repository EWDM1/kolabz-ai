
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import { 
  HelpCircle, 
  LogOut, 
  PlusCircle,
  X,
  Search,
  SlidersHorizontal,
  Download,
  Trash,
  Clock,
  Eye,
  Edit,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { LanguageSelector } from "@/components/LanguageSelector";

interface Prompt {
  id: number;
  title: string;
  content: string;
  model: string;
  date: string;
  tags: string[];
  favorite?: boolean;
}

const MyPrompts = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: 1,
      title: "Marketing Campaign Strategy",
      model: "GPT-4",
      date: "2023-07-15",
      content: "Create a comprehensive marketing campaign strategy for a new product launch targeting millennials that incorporates social media, influencer partnerships, and traditional marketing channels. Include specific KPIs for measuring success and a timeline for implementation.",
      tags: ["marketing", "strategy"],
      favorite: true
    },
    {
      id: 2,
      title: "Research Literature Review",
      model: "Claude",
      date: "2023-07-12",
      content: "Conduct a thorough literature review on the effects of climate change on marine ecosystems in the past decade. Synthesize key findings, identify gaps in current research, and suggest directions for future studies. Include references to relevant peer-reviewed publications.",
      tags: ["research", "academic", "climate"],
    },
    {
      id: 3,
      title: "Website UX Improvement",
      model: "GPT-4",
      date: "2023-07-10",
      content: "Analyze the following website design and provide specific recommendations for improving user experience, focusing on navigation structure, mobile responsiveness, and accessibility compliance. Prioritize suggestions based on potential impact and implementation difficulty.",
      tags: ["design", "ux"],
    },
    {
      id: 4,
      title: "Code Review: React Component",
      model: "Claude",
      date: "2023-07-08",
      content: "Review this React component for performance issues, potential bugs, and adherence to best practices. Provide specific code suggestions for improvements, explaining the reasoning behind each recommendation. Consider factors like state management, component lifecycle, and code reusability.",
      tags: ["coding", "react", "technical"],
      favorite: true
    },
    {
      id: 5,
      title: "Product Description Generator",
      model: "GPT-3.5",
      date: "2023-07-05",
      content: "Generate compelling product descriptions for an e-commerce store selling eco-friendly home goods. Each description should highlight unique features, benefits, materials used, and how the product contributes to sustainability. Include appropriate keywords for SEO.",
      tags: ["ecommerce", "content", "marketing"],
    },
    {
      id: 6,
      title: "Technical Documentation",
      model: "GPT-4",
      date: "2023-07-01",
      content: "Create clear and comprehensive documentation for a REST API, including endpoint descriptions, request/response formats, authentication requirements, error handling, and usage examples. Format the documentation in markdown suitable for inclusion in a developer portal.",
      tags: ["technical", "documentation", "api"],
    },
  ]);
  
  const getFilteredPrompts = () => {
    let filtered = [...prompts];
    
    if (searchQuery) {
      filtered = filtered.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (currentCategory !== "all") {
      filtered = filtered.filter(prompt => 
        prompt.tags.includes(currentCategory)
      );
    }
    
    switch (activeFilter) {
      case "favorites":
        filtered = filtered.filter(prompt => prompt.favorite);
        break;
      case "gpt4":
        filtered = filtered.filter(prompt => prompt.model === "GPT-4");
        break;
      case "claude":
        filtered = filtered.filter(prompt => prompt.model === "Claude");
        break;
    }
    
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    return filtered;
  };
  
  const filteredPrompts = getFilteredPrompts();
  
  const allTags = Array.from(new Set(
    prompts.flatMap(prompt => prompt.tags)
  )).sort();
  
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    window.location.href = "/login";
  };

  const toggleFavorite = (id: number) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === id 
        ? { ...prompt, favorite: !prompt.favorite } 
        : prompt
    ));
    
    const prompt = prompts.find(p => p.id === id);
    const newStatus = !prompt?.favorite;
    
    toast({
      title: newStatus ? "Added to favorites" : "Removed from favorites",
      description: `"${prompt?.title}" has been ${newStatus ? "added to" : "removed from"} your favorites`,
    });
  };
  
  const handleDeletePrompt = (id: number) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id));
    toast({
      title: "Prompt deleted",
      description: "The prompt has been removed from your library",
    });
  };
  
  const handleBulkDelete = () => {
    if (selectedPrompts.length === 0) return;
    
    setPrompts(prompts.filter(prompt => !selectedPrompts.includes(prompt.id)));
    toast({
      title: "Prompts deleted",
      description: `${selectedPrompts.length} prompts have been removed from your library`,
    });
    setSelectedPrompts([]);
  };
  
  const togglePromptSelection = (id: number) => {
    setSelectedPrompts(prev => 
      prev.includes(id) 
        ? prev.filter(promptId => promptId !== id)
        : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedPrompts.length === filteredPrompts.length) {
      setSelectedPrompts([]);
    } else {
      setSelectedPrompts(filteredPrompts.map(p => p.id));
    }
  };
  
  const handleExport = () => {
    const promptsToExport = selectedPrompts.length > 0 
      ? prompts.filter(p => selectedPrompts.includes(p.id)) 
      : filteredPrompts;
      
    const exportData = JSON.stringify(promptsToExport, null, 2);
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-prompts.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Prompts exported",
      description: `${promptsToExport.length} prompts have been exported as JSON`,
    });
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("all");
    setSortBy("recent");
    setCurrentCategory("all");
  };
  
  const handleCreateNewPrompt = () => {
    navigate("/dashboard");
    
    toast({
      title: "Create new prompt",
      description: "Opening prompt creator...",
    });
  };
  
  return (
    <div className="min-h-screen bg-background/95">
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

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2 cursor-pointer ml-2">
              <span className="text-sm font-medium hidden md:inline-block">
                {user?.name || "John Doe"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <DashboardSidebar 
              handleNavigation={handleNavigation}
              handleLogout={handleLogout}
              activePage="prompts"
            />
          </div>

          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <h1 className="text-2xl font-bold mb-2">My Prompts</h1>
            <p className="text-muted-foreground mb-6">
              Manage and organize your saved prompts
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3 space-y-6">
                <Button 
                  onClick={handleCreateNewPrompt}
                  className="w-full sm:hidden"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Prompt
                </Button>
              
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2">
                    <div className="space-y-1">
                      <button
                        onClick={() => setCurrentCategory("all")}
                        className={`w-full px-3 py-2 text-sm rounded-md flex justify-between items-center ${
                          currentCategory === "all" 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <span>All Prompts</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          {prompts.length}
                        </span>
                      </button>
                      
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setCurrentCategory(tag)}
                          className={`w-full px-3 py-2 text-sm rounded-md flex justify-between items-center ${
                            currentCategory === tag
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>#{tag}</span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {prompts.filter(p => p.tags.includes(tag)).length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Filter by</div>
                      <div className="space-y-1 pl-1">
                        <button
                          onClick={() => setActiveFilter("all")}
                          className={`block text-sm ${activeFilter === "all" ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          All prompts
                        </button>
                        <button
                          onClick={() => setActiveFilter("favorites")}
                          className={`block text-sm ${activeFilter === "favorites" ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Favorites
                        </button>
                        <button
                          onClick={() => setActiveFilter("gpt4")}
                          className={`block text-sm ${activeFilter === "gpt4" ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          GPT-4 only
                        </button>
                        <button
                          onClick={() => setActiveFilter("claude")}
                          className={`block text-sm ${activeFilter === "claude" ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Claude only
                        </button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Sort by</div>
                      <div className="space-y-1 pl-1">
                        <button
                          onClick={() => setSortBy("recent")}
                          className={`block text-sm ${sortBy === "recent" ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Most recent
                        </button>
                        <button
                          onClick={() => setSortBy("oldest")}
                          className={`block text-sm ${sortBy === "oldest" ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Oldest first
                        </button>
                        <button
                          onClick={() => setSortBy("alphabetical")}
                          className={`block text-sm ${sortBy === "alphabetical" ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          Alphabetical
                        </button>
                      </div>
                    </div>
                    
                    {(activeFilter !== "all" || sortBy !== "recent" || currentCategory !== "all") && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2" 
                        onClick={handleClearFilters}
                      >
                        <X className="mr-2 h-3 w-3" />
                        Clear Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-9">
                <div className="bg-card rounded-lg border border-border shadow-sm">
                  <div className="p-4 border-b border-border">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search prompts..." 
                          className="pl-9 w-full"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-10">
                              <SlidersHorizontal className="mr-2 h-4 w-4" />
                              Sort & Filter
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSortBy("recent")}>
                              Most recent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                              Oldest first
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                              Alphabetical
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                              All prompts
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setActiveFilter("favorites")}>
                              Favorites only
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setActiveFilter("gpt4")}>
                              GPT-4 only
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setActiveFilter("claude")}>
                              Claude only
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-10"
                          onClick={handleExport}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {selectedPrompts.length > 0 && (
                    <div className="bg-muted/50 border-b border-border px-4 py-2 flex justify-between items-center">
                      <div className="text-sm">
                        {selectedPrompts.length} {selectedPrompts.length === 1 ? "prompt" : "prompts"} selected
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleSelectAll}
                        >
                          {selectedPrompts.length === filteredPrompts.length ? "Deselect All" : "Select All"}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={handleBulkDelete}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Selected
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    {filteredPrompts.length > 0 ? (
                      <div className="space-y-4">
                        {filteredPrompts.map((prompt) => (
                          <div
                            key={prompt.id}
                            className={`border rounded-lg p-4 transition-all duration-200 ${
                              selectedPrompts.includes(prompt.id) 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50 hover:shadow-sm"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedPrompts.includes(prompt.id)}
                                    onChange={() => togglePromptSelection(prompt.id)}
                                    className="mr-3 h-4 w-4 rounded border-gray-300"
                                  />
                                  <h3 className="font-medium text-lg">{prompt.title}</h3>
                                  {prompt.favorite && (
                                    <button 
                                      onClick={() => toggleFavorite(prompt.id)}
                                      className="ml-2 text-yellow-500 hover:text-yellow-600"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                      </svg>
                                    </button>
                                  )}
                                  {!prompt.favorite && (
                                    <button 
                                      onClick={() => toggleFavorite(prompt.id)}
                                      className="ml-2 text-muted-foreground hover:text-yellow-500"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {prompt.date}
                                  </div>
                                  <div>|</div>
                                  <div>{prompt.model}</div>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleDeletePrompt(prompt.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground text-sm line-clamp-2 mt-2 mb-3">
                              {prompt.content}
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                              {prompt.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full flex items-center"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No prompts found</h3>
                        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                          {searchQuery || activeFilter !== "all" || currentCategory !== "all"
                            ? "No prompts match your current filters. Try adjusting or clearing your filters."
                            : "You haven't saved any prompts yet. Create your first prompt to get started."}
                        </p>
                        {searchQuery || activeFilter !== "all" || currentCategory !== "all" ? (
                          <Button onClick={handleClearFilters}>
                            Clear All Filters
                          </Button>
                        ) : (
                          <Button onClick={handleCreateNewPrompt}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Your First Prompt
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
  );
};

export default MyPrompts;
