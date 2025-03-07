
import { useLocation } from "react-router-dom";
import { 
  Users, 
  Code, 
  HelpCircle, 
  LayoutDashboard,
  Sliders,
  CreditCard
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";

interface SidebarContentProps {
  isCollapsed: boolean;
  onClose: () => void;
}

export const SidebarContent = ({ isCollapsed, onClose }: SidebarContentProps) => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className={cn("py-6", isCollapsed ? "px-3" : "px-4", "space-y-4")}>
      <div className="space-y-1">
        <SidebarItem
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Dashboard"
          href="/admin/dashboard"
          isActive={path === "/admin" || path === "/admin/dashboard"}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="User Management"
          href="/admin/users"
          isActive={path === "/admin/users"}
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
  );
};

import { cn } from "@/lib/utils";

export { SidebarContent };
