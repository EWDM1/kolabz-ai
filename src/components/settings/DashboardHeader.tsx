
import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTheme } from "@/components/ThemeProvider";

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

const DashboardHeader = ({ userName, onLogout }: DashboardHeaderProps) => {
  const { theme } = useTheme();
  
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
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

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2 cursor-pointer ml-2">
            <span className="text-sm font-medium hidden md:inline-block">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
