
import { useTheme } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
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
import { 
  LayoutDashboard, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  FileText, 
  Video 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HelpSupport = () => {
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
                    <SidebarMenuLink className="flex items-center gap-3" href="/my-dashboard">
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
                  <SidebarMenuLink className="flex items-center gap-3" active href="/help-support">
                    <HelpCircle size={18} />
                    <span>Help & Support</span>
                  </SidebarMenuLink>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          
          <main className="flex-1 pt-20 pb-12 px-4 md:px-8">
            <div className="container max-w-4xl">
              <div className="flex flex-col space-y-6 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
                <p className="text-muted-foreground">
                  Need assistance? We're here to help you with any questions or issues you may have.
                </p>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documentation
                      </CardTitle>
                      <CardDescription>Comprehensive guides and resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Browse our detailed documentation for step-by-step guides on using our platform.
                      </p>
                      <Link 
                        to="#" 
                        className={`text-sm font-medium ${theme === 'dark' ? 'text-primary hover:text-primary/90' : 'text-primary hover:text-primary/90'}`}
                      >
                        View Documentation →
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Contact Support
                      </CardTitle>
                      <CardDescription>Get help from our team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Reach out to our support team directly for personalized assistance.
                      </p>
                      <Link 
                        to="#" 
                        className={`text-sm font-medium ${theme === 'dark' ? 'text-primary hover:text-primary/90' : 'text-primary hover:text-primary/90'}`}
                      >
                        Contact Support →
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Community Forum
                      </CardTitle>
                      <CardDescription>Connect with other users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Join discussions, share experiences, and learn from other community members.
                      </p>
                      <Link 
                        to="#" 
                        className={`text-sm font-medium ${theme === 'dark' ? 'text-primary hover:text-primary/90' : 'text-primary hover:text-primary/90'}`}
                      >
                        Visit Forum →
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        Video Tutorials
                      </CardTitle>
                      <CardDescription>Learn with visual guides</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Watch tutorials on how to make the most of our prompt optimization tools.
                      </p>
                      <Link 
                        to="#" 
                        className={`text-sm font-medium ${theme === 'dark' ? 'text-primary hover:text-primary/90' : 'text-primary hover:text-primary/90'}`}
                      >
                        Watch Tutorials →
                      </Link>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">How do I optimize my prompts?</h3>
                        <p className="text-sm text-muted-foreground">
                          Use our Prompt Optimizer tool on your dashboard. Enter your base prompt, select your target AI model, and our system will suggest improvements.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Can I upgrade my subscription plan?</h3>
                        <p className="text-sm text-muted-foreground">
                          Yes, you can upgrade your plan at any time from the Subscription page in your account.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">How do I save my optimized prompts?</h3>
                        <p className="text-sm text-muted-foreground">
                          All optimized prompts are automatically saved to your account. You can access them anytime from the My Prompts section.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
          
          <SidebarTrigger className="fixed bottom-4 right-4 md:hidden" />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HelpSupport;
