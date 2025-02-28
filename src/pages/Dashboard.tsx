
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
import { Textarea } from "@/components/ui/textarea";
import { LanguageSelector } from "@/components/LanguageSelector";

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
    navigate("/login");
  };

  const handleDeletePrompt = (id: number) => {
    toast({
      title: "Prompt deleted",
      description: "The prompt has been deleted from your library",
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
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
                className="flex items-center space-x-3 px-3 py-2 rounded-md bg-[#1a2235] text-blue-400 font-medium w-full"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/my-prompts"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
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
            <Tabs defaultValue="create" className="w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <TabsList className="bg-[#131c2e]">
                  <TabsTrigger 
                    value="create" 
                    className="data-[state=active]:bg-[#1a2235] data-[state=active]:text-blue-400"
                  >
                    Create Prompt
                  </TabsTrigger>
                  <TabsTrigger 
                    value="saved"
                    className="data-[state=active]:bg-[#1a2235] data-[state=active]:text-blue-400"
                  >
                    Saved Prompts <span className="ml-1 text-xs">{savedPrompts.length}</span>
                  </TabsTrigger>
                </TabsList>

                <div className="md:hidden w-full">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-8 w-full bg-[#131c2e] border-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <TabsContent value="create" className="space-y-6 mt-2">
                <div className="bg-[#0a101e] rounded-lg border border-gray-800 p-6">
                  <h2 className="text-2xl font-bold mb-6">Create New Prompt</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Target AI Model
                        </label>
                        <select 
                          className="w-full bg-[#131c2e] border border-gray-700 rounded-md p-2 text-gray-200"
                        >
                          <option value="gpt4">GPT-4</option>
                          <option value="gpt35">GPT-3.5</option>
                          <option value="claude">Claude</option>
                          <option value="gemini">Gemini</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Prompt Purpose
                        </label>
                        <select 
                          className="w-full bg-[#131c2e] border border-gray-700 rounded-md p-2 text-gray-200"
                        >
                          <option value="content">Content Creation</option>
                          <option value="coding">Code Generation</option>
                          <option value="data">Data Analysis</option>
                          <option value="creative">Creative Writing</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Initial Prompt
                      </label>
                      <Textarea 
                        className="w-full bg-[#131c2e] border border-gray-700 rounded-md p-3 text-gray-200 min-h-[180px]"
                        placeholder="Enter your initial prompt idea here..."
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Generate Optimized Prompt
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6 mt-2">
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <CardTitle className="text-white">Saved Prompts</CardTitle>
                        <CardDescription className="text-gray-400">
                          Browse and manage your saved prompts
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" className="bg-[#131c2e] hover:bg-[#1a2235] text-gray-200 border-gray-700">
                          View All Prompts
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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
                            className="border border-gray-800 rounded-lg p-4 hover:bg-[#0f1525] transition-all-200 bg-[#131c2e]"
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                              <div>
                                <h3 className="font-medium text-lg text-white">{prompt.title}</h3>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                                  <span>Model: {prompt.model}</span>
                                  <span className="hidden sm:inline">•</span>
                                  <span>Created: {prompt.date}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
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
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-[#131c2e] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2 text-white">No prompts found</h3>
                        <p className="text-gray-400 mb-4">
                          {searchQuery
                            ? `No results matching "${searchQuery}"`
                            : "You haven't saved any prompts yet"}
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
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
