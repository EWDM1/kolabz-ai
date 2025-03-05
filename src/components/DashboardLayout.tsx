
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="font-bold text-xl">
              Kolabz
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/dashboard" className="text-sm font-medium">
                {t("nav.dashboard")}
              </Link>
              <Link to="/my-prompts" className="text-sm font-medium">
                {t("nav.my_prompts")}
              </Link>
              <Link to="/my-settings" className="text-sm font-medium">
                {t("nav.settings")}
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={logout}>
              {t("nav.logout")}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow container py-8">
        {children}
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          {t("footer.copyright")}
        </div>
      </footer>
    </div>
  );
};
