
import { useAuth } from "@/components/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
  SidebarGroup,
  SidebarTrigger,
  SidebarProvider
} from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { ArrowRight, LayoutDashboard, MessageSquare, CreditCard, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MyDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader className="border-b border-border p-4">
              <div className="flex items-center">
                <span className="font-semibold text-lg">My Account</span>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuLink className="flex items-center gap-3" active href="/my-dashboard">
                      <LayoutDashboard size={18} />
                      <span>Dashboard</span>
                    </SidebarMenuLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuLink className="flex items-center gap-3" href="/my-prompts">
                      <MessageSquare size={18} />
                      <span>My Prompts</span>
                    </SidebarMenuLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuLink className="flex items-center gap-3" href="/manage-subscription">
                      <CreditCard size={18} />
                      <span>Subscription</span>
                    </SidebarMenuLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuLink className="flex items-center gap-3" href="/my-settings">
                      <Settings size={18} />
                      <span>Settings</span>
                    </SidebarMenuLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="border-t border-border p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuLink className="flex items-center gap-3" href="/help-support">
                    <HelpCircle size={18} />
                    <span>Help & Support</span>
                  </SidebarMenuLink>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          
          <main className="flex-1 pt-20 pb-12 px-4 md:px-8">
            <div className="container">
              <div className="flex flex-col space-y-6 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.name || "User"}! Optimize your AI prompts with our tools.
                </p>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Prompt Optimizer Tool Card */}
                  <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                      <CardTitle>Prompt Optimizer</CardTitle>
                      <CardDescription>Create and optimize AI prompts for better results</CardDescription>
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
                              Design a comprehensive data visualization dashboard with the following specifications:
                              <ul className={`mt-1 pl-4 space-y-1 list-disc text-xs ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                <li>Include 4-5 key metrics as KPIs at the top</li>
                                <li>Create time-series charts for trend analysis</li>
                                <li>Add filtering capabilities by date range and categories</li>
                                <li>Design with accessibility and mobile responsiveness in mind</li>
                              </ul>
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
                          <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            Refine
                          </button>
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
                          {user?.subscription?.plan || "Free Plan"}
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
              </div>
            </div>
          </main>
          
          <SidebarTrigger className="fixed bottom-4 right-4 md:hidden" />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MyDashboard;
