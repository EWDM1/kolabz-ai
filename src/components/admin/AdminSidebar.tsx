
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Settings,
  CreditCard,
  Globe,
  BarChart3,
  FileText,
  Mail,
  MessageSquareText,
  BellRing,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";

// Define sidebar navigation items
const navigationItems = [
  {
    title: "Core",
    items: [
      {
        title: "dashboard",
        href: "/admin",
        icon: BarChart3,
        adminOnly: false,
      },
      {
        title: "users",
        href: "/admin/users",
        icon: Users,
        adminOnly: false,
      },
      {
        title: "payments",
        href: "/admin/stripe",
        icon: CreditCard,
        adminOnly: true,
      },
      {
        title: "settings",
        href: "/admin/settings",
        icon: Settings,
        adminOnly: true,
      },
    ],
  },
  {
    title: "Website",
    items: [
      {
        title: "landing",
        href: "/admin/landing/edit",
        icon: Globe,
        adminOnly: true,
      },
      {
        title: "blog",
        href: "/admin/blog/posts",
        icon: FileText,
        adminOnly: true,
      },
    ],
  },
  {
    title: "Communications",
    items: [
      {
        title: "email",
        href: "/admin/email",
        icon: Mail,
        adminOnly: true,
      },
      {
        title: "chat",
        href: "/admin/chat",
        icon: MessageSquareText,
        adminOnly: true,
      },
      {
        title: "notifications",
        href: "/admin/notifications",
        icon: BellRing,
        adminOnly: true,
      },
    ],
  },
];

// Define the props for the AdminSidebar component
interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSuperAdmin } = useAuth();
  const { t } = useLanguage();

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setCollapsed(savedState === "true");
    }
  }, []);

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("adminSidebarCollapsed", String(collapsed));
    // Dispatch a storage event so other components can react
    window.dispatchEvent(new Event("storage"));
  }, [collapsed]);

  const handleNavigation = (href: string) => {
    navigate(href);
    if (isOpen) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex-col md:flex",
          "bg-card border-r border-border",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          isOpen ? "flex" : "hidden md:flex"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{t("admin.panel") || "Admin"}</h2>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-6">
            {navigationItems.map((group, groupIndex) => {
              // Filter items based on admin permissions
              const visibleItems = group.items.filter(
                (item) => !item.adminOnly || isSuperAdmin
              );
              
              // Only show the group if it has visible items
              if (visibleItems.length === 0) return null;
              
              return (
                <div key={groupIndex} className="space-y-2">
                  {!collapsed && (
                    <h3 className="text-xs uppercase tracking-wider text-muted-foreground px-2">
                      {t(`admin.group.${group.title.toLowerCase()}`) || group.title}
                    </h3>
                  )}
                  <nav className="space-y-1">
                    {visibleItems.map((item, itemIndex) => {
                      const isActive = location.pathname === item.href || 
                                      (item.href !== "/admin" && location.pathname.startsWith(item.href));
                      
                      return (
                        <Button
                          key={itemIndex}
                          variant="ghost"
                          size={collapsed ? "icon" : "sm"}
                          className={cn(
                            "w-full justify-start",
                            isActive
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                          onClick={() => handleNavigation(item.href)}
                        >
                          <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
                          {!collapsed && <span>{t(`admin.${item.title}`) || item.title}</span>}
                        </Button>
                      );
                    })}
                  </nav>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        <div className="px-3 py-4 border-t border-border mt-auto">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              collapsed ? "px-0" : ""
            )}
            size={collapsed ? "icon" : "sm"}
            onClick={() => handleNavigation("/dashboard")}
          >
            <Globe className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
            {!collapsed && <span>{t("nav.dashboard")}</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
