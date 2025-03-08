
import { ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/prompts/layout/DashboardHeader";

interface PromptsPageLayoutProps {
  children: ReactNode;
}

export const PromptsPageLayout = ({ children }: PromptsPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background/95">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
      
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Need help?</span>
          </div>
          <Button variant="link" size="sm" asChild>
            <Link to="/help-support">Visit Help & Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
