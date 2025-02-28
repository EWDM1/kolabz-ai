
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
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const UserDashboard = () => {
  const { toast } = useToast();
  const [promptCount] = useState(12);
  const [recentPrompts] = useState([
    {
      id: 1,
      title: "Product Description Generator",
      category: "E-commerce",
      created: "2 days ago",
    },
    {
      id: 2,
      title: "SEO Blog Post Outline",
      category: "Content",
      created: "3 days ago",
    },
    {
      id: 3,
      title: "Customer Support Email",
      category: "Support",
      created: "1 week ago",
    },
    {
      id: 4,
      title: "Social Media Caption",
      category: "Marketing",
      created: "1 week ago",
    },
  ]);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
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
                className="flex items-center space-x-3 px-3 py-2 rounded-md bg-blue-600 text-white w-full"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/user-prompts"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
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
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-gray-400">
                Here's an overview of your prompts and recent activity.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
              <Card className="bg-[#0a101e] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Total Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{promptCount}</div>
                  <p className="text-gray-400 text-sm mt-1">Across all categories</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#0a101e] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Usage This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">43/100</div>
                  <p className="text-gray-400 text-sm mt-1">Prompt generations</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#0a101e] border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-blue-400">Pro Plan</div>
                  <p className="text-gray-400 text-sm mt-1">Renews on Aug 12, 2023</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs bg-[#1a2235] border-gray-700 text-gray-300 hover:bg-[#252e3f]"
                    asChild
                  >
                    <Link to="/user-subscription">Manage</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-bold mb-4 md:mb-0">Recent Prompts</h2>
              <div className="flex w-full md:w-auto space-x-2">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search prompts..."
                    className="pl-9 bg-[#0a101e] border-gray-800 text-white w-full md:w-64"
                  />
                </div>
                <Button variant="outline" size="icon" className="bg-[#0a101e] border-gray-800">
                  <Filter className="h-4 w-4 text-gray-400" />
                </Button>
                <Button asChild>
                  <Link to="/user-prompts">
                    <Plus className="h-4 w-4 mr-2" />
                    New Prompt
                  </Link>
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs uppercase text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {recentPrompts.map((prompt) => (
                    <tr key={prompt.id} className="hover:bg-[#0f1525]">
                      <td className="px-4 py-3 text-white">{prompt.title}</td>
                      <td className="px-4 py-3 text-gray-300">{prompt.category}</td>
                      <td className="px-4 py-3 text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {prompt.created}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-300"
                        >
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          Use
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <Button variant="outline" asChild className="bg-[#0a101e] border-gray-800">
                <Link to="/user-prompts">View All Prompts</Link>
              </Button>
            </div>

            <div className="mt-8 p-6 bg-[#0a101e] rounded-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-2">Need Help Getting Started?</h3>
              <p className="text-gray-400 mb-4">
                Check out our guide on how to create effective prompts for different use cases.
              </p>
              <Button variant="outline" className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]">
                View Guides
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
