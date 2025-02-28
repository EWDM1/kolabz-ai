
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Settings as SettingsIcon,
  LogOut,
  User,
  PlusCircle,
  Search,
  Edit,
  Trash,
  Eye,
  Filter,
  SlidersHorizontal,
  Download,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { LanguageSelector } from "@/components/LanguageSelector";

// Mock data for prompts
const mockPrompts = [
  {
    id: 1,
    title: "Marketing Campaign Strategy",
    model: "GPT-4",
    date: "2023-07-15",
    content: "Create a comprehensive marketing campaign strategy for a new product launch targeting millennials in the tech industry. Include social media approach, content marketing plan, and budget allocation recommendations.",
    tags: ["marketing", "strategy", "campaign"],
    isFavorite: true
  },
  {
    id: 2,
    title: "Research Literature Review",
    model: "Claude",
    date: "2023-07-12",
    content: "Conduct a thorough literature review on the effects of climate change on marine ecosystems in the Pacific Ocean over the last decade. Include key findings, methodology comparisons, and identify research gaps.",
    tags: ["research", "academic", "climate"],
    isFavorite: false
  },
  {
    id: 3,
    title: "Website UX Improvement",
    model: "GPT-4",
    date: "2023-07-10",
    content: "Analyze the following website design and provide specific recommendations for improving user experience, focusing on navigation, accessibility, and mobile responsiveness. Include wireframe suggestions.",
    tags: ["design", "ux", "website"],
    isFavorite: true
  },
  {
    id: 4,
    title: "Product Description Generator",
    model: "GPT-3.5",
    date: "2023-07-05",
    content: "Create compelling product descriptions for our new line of eco-friendly kitchen gadgets. Each description should be 150-200 words, highlight key features, and incorporate sustainability messaging.",
    tags: ["copywriting", "ecommerce", "products"],
    isFavorite: false
  },
  {
    id: 5,
    title: "Email Sequence for Course Launch",
    model: "GPT-4",
    date: "2023-07-02",
    content: "Design a 5-email sequence for launching our new online course on data analytics. Include subject lines, body copy, and strategic timing recommendations to maximize open rates and conversions.",
    tags: ["email", "marketing", "course"],
    isFavorite: true
  },
  {
    id: 6,
    title: "Code Refactoring Assistant",
    model: "Claude",
    date: "2023-06-28",
    content: "Analyze the following JavaScript code and suggest refactoring improvements for better performance, readability, and maintainability. Explain your recommendations and provide the refactored code.",
    tags: ["coding", "javascript", "refactoring"],
    isFavorite: false
  },
];

const MyPrompts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Get all unique tags from prompts
  const allTags = Array.from(
    new Set(mockPrompts.flatMap((prompt) => prompt.tags))
  ).sort();

  // Get all unique models from prompts
  const allModels = Array.from(
    new Set(mockPrompts.map((prompt) => prompt.model))
  ).sort();

  // Filter prompts based on search, model, tags, and favorites
  const filteredPrompts = mockPrompts.filter((prompt) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Model filter
    const matchesModel = !selectedModel || prompt.model === selectedModel;

    // Tags filter
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => prompt.tags.includes(tag));

    // Favorites filter
    const matchesFavorites = !showFavoritesOnly || prompt.isFavorite;

    return matchesSearch && matchesModel && matchesTags && matchesFavorites;
  });

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleToggleFavorite = (id: number) => {
    // In a real app, this would update the state and make an API call
    toast({
      title: "Favorite updated",
      description: "Your prompt has been updated.",
    });
  };

  const handleDeletePrompt = (id: number) => {
    // In a real app, this would delete the prompt via an API call
    toast({
      title: "Prompt deleted",
      description: "The prompt has been deleted from your library",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const handleClearFilters = () => {
    setSelectedModel(null);
    setSelectedTags([]);
    setShowFavoritesOnly(false);
  };

  const handleManageSubscription = () => {
    navigate("/manage-subscription");
  };

  return (
    <div className="min-h-screen bg-[#080c16] text-white">
      {/* Dashboard header */}
      <header className="border-b border-gray-800 bg-[#0a101e]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/df8a7871-32f3-4d83-826c-be5a1d06f2f1.png" 
              alt="Kolabz Logo" 
              className="h-8" 
            />
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search prompts..."
                className="pl-8 bg-[#131c2e] border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm font-medium hidden md:inline-block text-gray-300">
                John Doe
              </span>
              <div className="h-8 w-8 rounded-full bg-gray-700 text-gray-200 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Sidebar */}
        <div className="w-64 min-h-full bg-[#0a101e] border-r border-gray-800 flex-shrink-0 hidden md:block">
          <div className="py-6 px-4">
            <nav className="space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/my-prompts"
                className="flex items-center space-x-3 px-3 py-2 rounded-md bg-[#1a2235] text-blue-400 font-medium w-full"
              >
                <ListChecks className="h-5 w-5" />
                <span>My Prompts</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <SettingsIcon className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          <div className="px-4 pt-6 pb-8 border-t border-gray-800">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
              SUBSCRIPTION
            </h4>
            <div className="bg-[#131c2e] rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pro Plan</span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-xs text-gray-400 mb-3">
                Next billing on Aug 12, 2023
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs bg-[#1a2235] border-gray-700 text-gray-300 hover:bg-[#252e3f]" 
                onClick={handleManageSubscription}
              >
                Manage Subscription
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-[#080c16]">
          <div className="container mx-auto p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <ListChecks className="mr-2 h-5 w-5 text-blue-400" /> 
                  My Prompts
                </h1>
                <p className="text-gray-400">Manage and organize your saved prompts</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-64 lg:w-auto">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search prompts..."
                    className="pl-8 w-full bg-[#131c2e] border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Prompt
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-[#0a101e] border-gray-800 sticky top-6">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white flex items-center text-lg">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleClearFilters}
                        className="h-8 text-gray-400 hover:text-gray-300 hover:bg-[#131c2e]"
                      >
                        Clear
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Model filter */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                        <SlidersHorizontal className="h-4 w-4 mr-2" /> 
                        AI Models
                      </h3>
                      <div className="space-y-2">
                        {allModels.map((model) => (
                          <div key={model} className="flex items-center">
                            <button
                              onClick={() => setSelectedModel(selectedModel === model ? null : model)}
                              className={`flex items-center w-full py-1.5 px-2 rounded-md text-sm ${
                                selectedModel === model
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-300 hover:bg-[#131c2e]"
                              }`}
                            >
                              {selectedModel === model && (
                                <Check className="h-4 w-4 mr-2 flex-shrink-0" />
                              )}
                              <span>{model}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-gray-800" />

                    {/* Tags filter */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-300 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className={`cursor-pointer capitalize ${
                              selectedTags.includes(tag)
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-[#131c2e] text-gray-300 hover:bg-[#1a2235] border-gray-700"
                            }`}
                            onClick={() => handleToggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-gray-800" />

                    {/* Favorites filter */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-300">Show Favorites Only</h3>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="favorites"
                            checked={showFavoritesOnly}
                            onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
                            className="rounded bg-[#131c2e] border-gray-700 text-blue-600 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button 
                        className="w-full bg-[#131c2e] hover:bg-[#1a2235] text-gray-300 border border-gray-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Prompts
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Prompts list */}
              <div className="lg:col-span-3 space-y-6">
                {filteredPrompts.length > 0 ? (
                  <>
                    <div className="text-sm text-gray-400">
                      Showing {filteredPrompts.length} of {mockPrompts.length} prompts
                    </div>
                    
                    <div className="space-y-4">
                      {filteredPrompts.map((prompt) => (
                        <div
                          key={prompt.id}
                          className="border border-gray-800 rounded-lg p-4 hover:bg-[#0f1525] transition-all-200 bg-[#131c2e]"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                            <div>
                              <h3 className="font-medium text-lg text-white flex items-center">
                                {prompt.isFavorite && (
                                  <span className="text-yellow-400 mr-2">★</span>
                                )}
                                {prompt.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                                <span>Model: {prompt.model}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>Created: {prompt.date}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleToggleFavorite(prompt.id)}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-yellow-400 hover:bg-[#1a2235]"
                                title={prompt.isFavorite ? "Remove from favorites" : "Add to favorites"}
                              >
                                <span className="text-lg">{prompt.isFavorite ? "★" : "☆"}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-[#1a2235]">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-[#1a2235]">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/30"
                                onClick={() => handleDeletePrompt(prompt.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                            {prompt.content}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {prompt.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-[#1a2235] text-gray-300 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-[#0a101e] rounded-lg border border-gray-800 p-8 text-center">
                    <div className="w-16 h-16 bg-[#131c2e] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">No prompts found</h3>
                    <p className="text-gray-400 mb-4">
                      {searchQuery || selectedModel || selectedTags.length > 0 || showFavoritesOnly
                        ? "No prompts match your current filters"
                        : "You haven't saved any prompts yet"}
                    </p>
                    {searchQuery || selectedModel || selectedTags.length > 0 || showFavoritesOnly ? (
                      <Button 
                        variant="outline" 
                        onClick={handleClearFilters}
                        className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
                      >
                        Clear Filters
                      </Button>
                    ) : (
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <PlusCircle className="h-4 w-4 mr-2" />
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
  );
};

export default MyPrompts;
