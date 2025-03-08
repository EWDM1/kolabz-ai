
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  isSubItem?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
}

export const SidebarItem = ({ 
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
