
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, LogOut, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthContext";

const AdminHeader = ({ onMenuToggle }: { onMenuToggle: () => void }) => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [notificationCount] = useState(3);

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuToggle}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <div className="flex items-center gap-2">
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
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search" 
              placeholder="Search..." 
              className="w-64 pl-8"
            />
          </div>

          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.role}</div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
