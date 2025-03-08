
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarTrigger,
  SidebarProvider
} from "@/components/ui/sidebar";
import { LayoutDashboard, MessageSquare, CreditCard, Settings, HelpCircle } from "lucide-react";
import Header from "@/components/Header";

interface SidebarLayoutProps {
  children: ReactNode;
  activeMenuItem: "dashboard" | "prompts" | "subscription" | "settings" | "help";
}

const SidebarLayout = ({ children, activeMenuItem }: SidebarLayoutProps) => {
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
                    <SidebarMenuButton asChild isActive={activeMenuItem === "dashboard"}>
                      <Link to="/my-dashboard" className="flex items-center gap-3">
                        <LayoutDashboard size={18} />
                        <span>My Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={activeMenuItem === "prompts"}>
                      <Link to="/my-prompts" className="flex items-center gap-3">
                        <MessageSquare size={18} />
                        <span>My Prompts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={activeMenuItem === "subscription"}>
                      <Link to="/manage-subscription" className="flex items-center gap-3">
                        <CreditCard size={18} />
                        <span>Subscription</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={activeMenuItem === "settings"}>
                      <Link to="/my-settings" className="flex items-center gap-3">
                        <Settings size={18} />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="border-t border-border p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={activeMenuItem === "help"}>
                    <Link to="/help-support" className="flex items-center gap-3">
                      <HelpCircle size={18} />
                      <span>Help & Support</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          
          <main className="flex-1 pt-20 pb-12 px-4 md:px-8">
            <div className="container">
              {children}
            </div>
          </main>
          
          <SidebarTrigger className="fixed bottom-4 right-4 md:hidden" />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
