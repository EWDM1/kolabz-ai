
import { 
  Users, 
  Settings, 
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./SidebarItem";
import { SidebarGroup } from "./SidebarGroup";

interface SidebarContentProps {
  path: string;
  isCollapsed: boolean;
  onClose: () => void;
}

export const SidebarContent = ({ path, isCollapsed, onClose }: SidebarContentProps) => {
  return (
    <div className={cn("py-6", isCollapsed ? "px-3" : "px-4", "space-y-4")}>
      <div className="space-y-1">
        <SidebarItem
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Dashboard"
          href="/AdminDashboard"
          isActive={path === "/admin" || path === "/AdminDashboard"}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="User Management"
          href="/admin/users"
          isActive={path.startsWith("/admin/users")}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Sliders className="h-5 w-5" />}
          label="Feature Management"
          href="/admin/features"
          isActive={path === "/admin/features"}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
      </div>
      
      {!isCollapsed && <div className="h-px bg-border" />}
      
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
        href="/help-support"
        isActive={path === "/help-support"}
        onClick={onClose}
        isCollapsed={isCollapsed}
      />
    </div>
  );
};
