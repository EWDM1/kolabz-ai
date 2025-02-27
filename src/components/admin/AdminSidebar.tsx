
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  Tag, 
  PieChart, 
  Edit, 
  Globe, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown,
  ChevronRight
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
}

const SidebarItem = ({ icon, label, href, isActive, isSubItem = false, onClick }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-primary/10",
      isActive && "bg-primary/10 text-primary font-medium",
      isSubItem && "ml-7 text-sm"
    )}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

interface SidebarGroupProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarGroup = ({ icon, label, children, defaultOpen = false }: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform overflow-auto bg-card border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/admin" className="flex items-center gap-2" onClick={onClose}>
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
      </div>
      
      <div className="space-y-4 px-4 py-6">
        <div className="space-y-1">
          <SidebarItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            href="/admin"
            isActive={path === "/admin"}
            onClick={onClose}
          />
          
          <SidebarItem
            icon={<PieChart className="h-5 w-5" />}
            label="Analytics"
            href="/admin/analytics"
            isActive={path === "/admin/analytics"}
            onClick={onClose}
          />
        </div>
        
        <div className="h-px bg-border" />
        
        <SidebarGroup
          icon={<Users className="h-5 w-5" />}
          label="User Management"
          defaultOpen={path.includes("/admin/users")}
        >
          <SidebarItem
            icon={<Users className="h-4 w-4" />}
            label="All Users"
            href="/admin/users"
            isActive={path === "/admin/users"}
            isSubItem
            onClick={onClose}
          />
          <SidebarItem
            icon={<Users className="h-4 w-4" />}
            label="Add New User"
            href="/admin/users/new"
            isActive={path === "/admin/users/new"}
            isSubItem
            onClick={onClose}
          />
        </SidebarGroup>
        
        <SidebarGroup
          icon={<Globe className="h-5 w-5" />}
          label="Landing Page"
          defaultOpen={path.includes("/admin/landing")}
        >
          <SidebarItem
            icon={<Edit className="h-4 w-4" />}
            label="Edit Content"
            href="/admin/landing/edit"
            isActive={path === "/admin/landing/edit"}
            isSubItem
            onClick={onClose}
          />
          <SidebarItem
            icon={<FileText className="h-4 w-4" />}
            label="SEO Settings"
            href="/admin/landing/seo"
            isActive={path === "/admin/landing/seo"}
            isSubItem
            onClick={onClose}
          />
        </SidebarGroup>
        
        <SidebarGroup
          icon={<Tag className="h-5 w-5" />}
          label="Marketing"
          defaultOpen={path.includes("/admin/marketing")}
        >
          <SidebarItem
            icon={<Tag className="h-4 w-4" />}
            label="Discount Codes"
            href="/admin/marketing/discounts"
            isActive={path === "/admin/marketing/discounts"}
            isSubItem
            onClick={onClose}
          />
          <SidebarItem
            icon={<MessageSquare className="h-4 w-4" />}
            label="Blog"
            href="/admin/marketing/blog"
            isActive={path === "/admin/marketing/blog"}
            isSubItem
            onClick={onClose}
          />
        </SidebarGroup>
        
        <div className="h-px bg-border" />
        
        <SidebarItem
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          href="/admin/settings"
          isActive={path === "/admin/settings"}
          onClick={onClose}
        />
        
        <SidebarItem
          icon={<HelpCircle className="h-5 w-5" />}
          label="Help & Support"
          href="/admin/help"
          isActive={path === "/admin/help"}
          onClick={onClose}
        />
      </div>
    </aside>
  );
};

export default AdminSidebar;
