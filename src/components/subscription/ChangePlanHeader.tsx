
import { Button } from "@/components/ui/button";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChangePlanHeaderProps {
  testMode: boolean;
  canAccessTestMode: boolean;
  onToggleTestMode: () => void;
}

const ChangePlanHeader = ({ 
  testMode, 
  canAccessTestMode, 
  onToggleTestMode 
}: ChangePlanHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate("/manage-subscription")} 
        className="gap-1"
      >
        Back to Subscription
      </Button>
      
      {canAccessTestMode && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggleTestMode}
          className={`gap-1 ${testMode ? 'border-orange-300 text-orange-600 hover:text-orange-700 hover:border-orange-400 dark:border-orange-800 dark:text-orange-500' : ''}`}
        >
          {testMode ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
          {testMode ? 'Test Mode' : 'Live Mode'}
        </Button>
      )}
    </div>
  );
};

export default ChangePlanHeader;
