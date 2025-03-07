
import { Link } from "react-router-dom";
import { ChevronLeft, PanelLeft } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

interface SidebarLogoProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  onClose: () => void;
}

export const SidebarLogo = ({ 
  isCollapsed, 
  toggleCollapse, 
  onClose 
}: SidebarLogoProps) => {
  const { theme } = useTheme();
  
  return (
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
  );
};
