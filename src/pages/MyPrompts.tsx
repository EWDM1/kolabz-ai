
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import { HelpCircle, LogOut, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Prompt } from "@/components/prompts/types";
import { PromptCategories } from "@/components/prompts/PromptCategories";
import { PromptFilters } from "@/components/prompts/PromptFilters";
import { PromptList } from "@/components/prompts/PromptList";

const MyPrompts = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
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
  
  const allTags = Array.from(new Set(
    prompts.flatMap(prompt => prompt.tags)
  )).sort();
  
  const promptCountByCategory = allTags.reduce((acc, tag) => {
    acc[tag] = prompts.filter(p => p.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);
  
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
  
  const hasActiveFilters = activeFilter !== "all" || sortBy !== "recent" || currentCategory !== "all";
  
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
              
                <PromptCategories 
                  categories={allTags}
                  activeCategory={currentCategory}
                  onCategoryChange={setCurrentCategory}
                  promptCountByCategory={promptCountByCategory}
                  totalPrompts={prompts.length}
                />
                
                <PromptFilters 
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>
              
              <div className="md:col-span-9">
                <PromptList 
                  prompts={prompts}
                  searchQuery={searchQuery}
                  activeFilter={activeFilter}
                  sortBy={sortBy}
                  currentCategory={currentCategory}
                  setPrompts={setPrompts}
                  setSearchQuery={setSearchQuery}
                  setActiveFilter={setActiveFilter}
                  setSortBy={setSortBy}
                  handleClearFilters={handleClearFilters}
                  handleCreateNewPrompt={handleCreateNewPrompt}
                  toggleFavorite={toggleFavorite}
                  handleDeletePrompt={handleDeletePrompt}
                />
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
