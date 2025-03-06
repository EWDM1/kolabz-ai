
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Settings, 
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  PanelLeft,
  CreditCard,
  Code,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  isSubItem?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const SidebarItem = ({ 
  icon, 
  label, 
  href, 
  isActive, 
  isSubItem = false, 
  onClick,
  isCollapsed = false
}: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-primary/10 relative group",
      isActive && "bg-primary/10 text-primary font-medium",
      isSubItem && "ml-7 text-sm",
      isCollapsed && "justify-center px-2"
    )}
    onClick={onClick}
  >
    <span className="flex-shrink-0">{icon}</span>
    {!isCollapsed && <span>{label}</span>}
    {isCollapsed && (
      <div className="absolute left-full ml-2 rounded-md px-2 py-1 bg-popover text-popover-foreground 
        shadow-md invisible opacity-0 translate-x-1 group-hover:visible group-hover:opacity-100 
        group-hover:translate-x-0 transition-all whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </Link>
);

interface SidebarGroupProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isCollapsed?: boolean;
}

const SidebarGroup = ({ 
  icon, 
  label, 
  children, 
  defaultOpen = false,
  isCollapsed = false 
}: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Close group when sidebar collapses
  useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false);
    }
  }, [isCollapsed]);

  if (isCollapsed) {
    return (
      <div className="relative group">
        <button
          className={cn(
            "flex w-full items-center justify-center rounded-md p-2 transition-colors hover:bg-primary/10",
          )}
        >
          {icon}
          <div className="absolute left-full ml-2 rounded-md bg-popover text-popover-foreground 
            shadow-md invisible opacity-0 translate-x-1 group-hover:visible group-hover:opacity-100 
            group-hover:translate-x-0 transition-all z-50 px-3 py-2 whitespace-nowrap">
            {label}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-primary/10",
          isOpen && "text-primary font-medium"
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="pt-1 pb-2">{children}</div>}
    </div>
  );
};

const AdminSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const { theme } = useTheme();
  const path = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Store the collapsed state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("adminSidebarCollapsed", String(newState));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 transform overflow-auto bg-card border-r border-border transition-all duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-3">
          <Link 
            to="/admin" 
            className={cn(
              "flex items-center gap-2",
              isCollapsed && "justify-center"
            )}
            onClick={onClose}
          >
            {theme === 'dark' ? (
              isCollapsed ? (
                <img 
                  src="/lovable-uploads/69364710-57d5-42d2-b6ca-740993198589.png" 
                  alt="Kolabz Logo" 
                  className="h-8" 
                />
              ) : (
                <img 
                  src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                  alt="Kolabz Logo" 
                  className="h-8" 
                />
              )
            ) : (
              isCollapsed ? (
                <img 
                  src="/lovable-uploads/69364710-57d5-42d2-b6ca-740993198589.png" 
                  alt="Kolabz Logo" 
                  className="h-8" 
                />
              ) : (
                <img 
                  src="/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png" 
                  alt="Kolabz Logo" 
                  className="h-8" 
                />
              )
            )}
            {!isCollapsed && <span className="font-semibold">Admin</span>}
          </Link>
          <button 
            className={cn(
              "ml-auto p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeft className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
        
        <div className={cn("py-6", isCollapsed ? "px-3" : "px-4", "space-y-4")}>
          <div className="space-y-1">
            <SidebarItem
              icon={<Users className="h-5 w-5" />}
              label="User Management"
              href="/admin/users"
              isActive={path === "/admin/users"}
              onClick={onClose}
              isCollapsed={isCollapsed}
            />
          </div>
          
          {!isCollapsed && <div className="h-px bg-border" />}
          
          <SidebarItem
            icon={<Code className="h-5 w-5" />}
            label="External Integrations"
            href="/admin/integrations"
            isActive={path === "/admin/integrations"}
            onClick={onClose}
            isCollapsed={isCollapsed}
          />
          
          <SidebarItem
            icon={<CreditCard className="h-5 w-5" />}
            label="Stripe Integration"
            href="/admin/stripe"
            isActive={path === "/admin/stripe"}
            onClick={onClose}
            isCollapsed={isCollapsed}
          />
          
          {!isCollapsed && <div className="h-px bg-border" />}
          
          <SidebarItem
            icon={<HelpCircle className="h-5 w-5" />}
            label="Help & Support"
            href="/admin/help"
            isActive={path === "/admin/help"}
            onClick={onClose}
            isCollapsed={isCollapsed}
          />
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
