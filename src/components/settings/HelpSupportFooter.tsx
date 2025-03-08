
import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HelpSupportFooter = () => {
  return (
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
  );
};

export default HelpSupportFooter;
