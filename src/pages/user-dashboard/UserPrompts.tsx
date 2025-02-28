
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Settings as SettingsIcon,
  LogOut,
  User,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Clock,
  Tags,
  Folders,
  Star,
  Copy,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const UserPrompts = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const promptData = [
    {
      id: 1,
      title: "Product Description Generator",
      category: "E-commerce",
      created: "2 days ago",
      tags: ["product", "marketing", "description"],
      favorite: true,
    },
    {
      id: 2,
      title: "SEO Blog Post Outline",
      category: "Content",
      created: "3 days ago",
      tags: ["blog", "seo", "outline"],
      favorite: false,
    },
    {
      id: 3,
      title: "Customer Support Email",
      category: "Support",
      created: "1 week ago",
      tags: ["email", "support", "template"],
      favorite: true,
    },
    {
      id: 4,
      title: "Social Media Caption",
      category: "Marketing",
      created: "1 week ago",
      tags: ["social", "caption", "engagement"],
      favorite: false,
    },
    {
      id: 5,
      title: "Sales Outreach Sequence",
      category: "Sales",
      created: "2 weeks ago",
      tags: ["sales", "outreach", "email"],
      favorite: false,
    },
    {
      id: 6,
      title: "Website Landing Page Copy",
      category: "Web",
      created: "3 weeks ago",
      tags: ["website", "landing", "copy"],
      favorite: true,
    },
    {
      id: 7,
      title: "Interview Questions Generator",
      category: "HR",
      created: "1 month ago",
      tags: ["interview", "questions", "hiring"],
      favorite: false,
    },
    {
      id: 8,
      title: "Technical Documentation Template",
      category: "Development",
      created: "1 month ago",
      tags: ["documentation", "technical", "template"],
      favorite: false,
    },
  ];

  const filters = [
    { id: "all", label: "All Prompts", count: promptData.length },
    { id: "favorites", label: "Favorites", count: promptData.filter(p => p.favorite).length },
    { id: "recent", label: "Recent", count: 5 },
  ];

  const categories = [
    { id: "content", label: "Content", count: 2 },
    { id: "marketing", label: "Marketing", count: 2 },
    { id: "sales", label: "Sales", count: 1 },
    { id: "support", label: "Support", count: 1 },
    { id: "ecommerce", label: "E-commerce", count: 1 },
    { id: "development", label: "Development", count: 1 },
  ];

  const filteredPrompts = promptData
    .filter(prompt => {
      if (selectedFilter === "favorites") return prompt.favorite;
      if (selectedFilter === "recent") {
        return prompt.created.includes("day") || prompt.created.includes("week");
      }
      return true;
    })
    .filter(prompt => {
      if (!searchQuery) return true;
      return prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
             prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    });

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const handleCreatePrompt = () => {
    toast({
      title: "Create new prompt",
      description: "This feature is coming soon.",
    });
  };

  const handleDeletePrompt = (promptId: number) => {
    toast({
      title: "Prompt deleted",
      description: "The prompt has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleDuplicatePrompt = (promptId: number) => {
    toast({
      title: "Prompt duplicated",
      description: "A copy of the prompt has been created.",
    });
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
                to="/user-dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/user-prompts"
                className="flex items-center space-x-3 px-3 py-2 rounded-md bg-blue-600 text-white w-full"
              >
                <ListChecks className="h-5 w-5" />
                <span>My Prompts</span>
              </Link>
              <Link
                to="/user-settings"
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
                asChild
              >
                <Link to="/user-subscription">Manage Subscription</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-[#080c16]">
          <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">My Prompts</h1>
                <p className="text-gray-400">
                  Manage and organize your AI prompt library
                </p>
              </div>
              <Button className="mt-4 md:mt-0" onClick={handleCreatePrompt}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Prompt
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters sidebar on desktop */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-[#0a101e] rounded-lg border border-gray-800 p-4 mb-6">
                  <h3 className="text-sm font-medium mb-3">Filters</h3>
                  <div className="space-y-1">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-left text-sm ${
                          selectedFilter === filter.id
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-[#131c2e]"
                        }`}
                        onClick={() => setSelectedFilter(filter.id)}
                      >
                        <span>{filter.label}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#1a2235]">
                          {filter.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0a101e] rounded-lg border border-gray-800 p-4">
                  <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-left text-sm text-gray-300 hover:bg-[#131c2e]"
                      >
                        <span>{category.label}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#1a2235]">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main content area */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex w-full sm:w-auto space-x-2">
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search prompts..."
                        className="pl-9 bg-[#0a101e] border-gray-800 text-white w-full sm:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon" className="bg-[#0a101e] border-gray-800">
                      <Filter className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>

                  {/* Mobile filters dropdown */}
                  <div className="lg:hidden w-full">
                    <select 
                      className="w-full bg-[#0a101e] border border-gray-800 rounded-md py-2 px-3 text-gray-300"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                      {filters.map((filter) => (
                        <option key={filter.id} value={filter.id}>
                          {filter.label} ({filter.count})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredPrompts.length > 0 ? (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {filteredPrompts.map((prompt) => (
                      <div 
                        key={prompt.id} 
                        className="bg-[#0a101e] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all"
                      >
                        <div className="px-4 py-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-medium text-white">{prompt.title}</h3>
                            <div className="flex items-center">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-gray-400 hover:text-yellow-400"
                                onClick={() => {
                                  toast({
                                    title: prompt.favorite ? "Removed from favorites" : "Added to favorites",
                                    description: prompt.favorite 
                                      ? "Prompt removed from your favorites" 
                                      : "Prompt added to your favorites",
                                  });
                                }}
                              >
                                <Star className={`h-4 w-4 ${prompt.favorite ? "text-yellow-400 fill-yellow-400" : ""}`} />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[180px] bg-[#131c2e] border-gray-700 text-gray-300">
                                  <DropdownMenuItem className="cursor-pointer hover:bg-[#1a2235]">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="cursor-pointer hover:bg-[#1a2235]"
                                    onClick={() => handleDuplicatePrompt(prompt.id)}
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-gray-700" />
                                  <DropdownMenuItem 
                                    className="cursor-pointer text-red-400 hover:bg-[#1a2235] hover:text-red-400"
                                    onClick={() => handleDeletePrompt(prompt.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-xs text-gray-400 mb-4">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{prompt.created}</span>
                            <span className="mx-2">•</span>
                            <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded-sm">
                              {prompt.category}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {prompt.tags.map((tag, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-1 bg-[#131c2e] text-gray-400 rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <Button className="w-full" variant="outline">
                            Use Prompt
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#0a101e] rounded-lg border border-gray-800 p-8 text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10 text-blue-400 mb-4">
                      <ListChecks className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No prompts found</h3>
                    <p className="text-gray-400 mb-4">
                      {searchQuery 
                        ? `No prompts match your search "${searchQuery}"`
                        : "You don't have any prompts in this category yet"
                      }
                    </p>
                    <Button onClick={handleCreatePrompt}>Create New Prompt</Button>
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

export default UserPrompts;
