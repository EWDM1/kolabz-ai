
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { User } from "lucide-react";
import { AlertCircle } from "lucide-react";

interface SubscriptionHeaderProps {
  handleNavigation: (path: string) => void;
  canAccessTestMode: boolean;
  testMode: boolean;
  handleToggleTestMode: () => void;
}

export const SubscriptionHeader = ({
  handleNavigation,
  canAccessTestMode,
  testMode,
  handleToggleTestMode,
}: SubscriptionHeaderProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <>
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

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => handleNavigation("/my-settings")}
            >
              <span className="text-sm font-medium hidden md:inline-block">
                John Doe
              </span>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        {/* Test mode toggle - only visible to admins */}
        {canAccessTestMode && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToggleTestMode}
            className={`gap-1 ${testMode ? 'border-orange-300 text-orange-600 hover:text-orange-700 hover:border-orange-400 dark:border-orange-800 dark:text-orange-500' : ''}`}
          >
            {testMode ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
            {testMode ? 'Test Mode' : 'Live Mode'}
          </Button>
        )}
      </div>

      {/* Test mode banner - only visible when test mode is active AND user is admin */}
      {testMode && canAccessTestMode && (
        <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300 p-4 rounded-lg mb-6 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Stripe Test Mode Active</h3>
            <p className="text-sm mt-1">
              You're currently in test mode. No real charges will be made. Use the test card <span className="font-medium">4242 4242 4242 4242</span> with any future expiration date and any CVC.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
