
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarGroupProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isCollapsed?: boolean;
}

export const SidebarGroup = ({ 
  icon, 
  label, 
  children, 
  defaultOpen = false,
  isCollapsed = false 
}: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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
