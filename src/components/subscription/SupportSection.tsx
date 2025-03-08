
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SupportSection = () => {
  return (
    <>
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg">
        <h3 className="font-medium">Questions about changing plans?</h3>
        <p className="text-sm mt-1">
          If you need help choosing the right plan or have billing questions, our support team is ready to assist at{" "}
          <a href="mailto:support@kolabz.com" className="text-primary hover:underline">
            support@kolabz.com
          </a>
        </p>
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
    </>
  );
};

export default SupportSection;
