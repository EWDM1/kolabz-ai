
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  HelpCircle,
  Puzzle,
  Zap,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar/SidebarItem";
import { SidebarGroup } from "./sidebar/SidebarGroup";
import { SidebarLogo } from "./sidebar/SidebarLogo";
import { SidebarContent } from "./sidebar/SidebarContent";
import { useSidebarCollapse } from "./sidebar/useSidebarCollapse";

const AdminSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const { isCollapsed, toggleCollapse } = useSidebarCollapse();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 transform overflow-auto bg-card border-r border-border transition-all duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarLogo 
          isCollapsed={isCollapsed} 
          toggleCollapse={toggleCollapse} 
          onClose={onClose} 
        />
        
        <div className="flex-1 py-4">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            href="/admin" 
            isActive={location.pathname === "/admin"}
            isCollapsed={isCollapsed}
            onClick={onClose}
          />
          
          <SidebarItem 
            icon={<Users size={20} />} 
            label="User Management" 
            href="/admin/user-management" 
            isActive={location.pathname.includes("/admin/user-management")}
            isCollapsed={isCollapsed}
            onClick={onClose}
          />
          
          <SidebarItem 
            icon={<Puzzle size={20} />} 
            label="Feature Management" 
            href="/admin/feature-management" 
            isActive={location.pathname.includes("/admin/feature-management")}
            isCollapsed={isCollapsed}
            onClick={onClose}
          />
          
          <SidebarItem 
            icon={<CreditCard size={20} />} 
            label="Subscriptions" 
            href="/admin/subscription-management" 
            isActive={location.pathname.includes("/admin/subscription-management")}
            isCollapsed={isCollapsed}
            onClick={onClose}
          />
          
          <SidebarGroup 
            icon={<Settings size={20} />}
            label="Settings" 
            isCollapsed={isCollapsed}
          >
            <SidebarItem 
              icon={<Settings size={20} />} 
              label="Integrations" 
              href="/admin/integrations-settings" 
              isActive={location.pathname.includes("/admin/integrations-settings")}
              isCollapsed={isCollapsed}
              onClick={onClose}
            />
            
            <SidebarItem 
              icon={<Zap size={20} />} 
              label="Stripe Settings" 
              href="/admin/stripe-settings" 
              isActive={location.pathname.includes("/admin/stripe-settings")}
              isCollapsed={isCollapsed}
              onClick={onClose}
            />
          </SidebarGroup>
          
          <SidebarItem 
            icon={<HelpCircle size={20} />} 
            label="Help & Support" 
            href="/admin/help" 
            isActive={location.pathname.includes("/admin/help")}
            isCollapsed={isCollapsed}
            onClick={onClose}
          />
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
