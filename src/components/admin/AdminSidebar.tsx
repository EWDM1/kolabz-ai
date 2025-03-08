
import { useState } from "react";
import { useLocation } from "react-router-dom";
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
        
        <SidebarContent 
          isCollapsed={isCollapsed} 
          onClose={onClose} 
        />
      </aside>
    </>
  );
};

export default AdminSidebar;
