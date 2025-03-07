
import { Feature, UserRole } from "./types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface FeatureItemProps {
  feature: Feature;
  isUpdating: boolean;
  isEnabled: boolean;
  activeRole: UserRole;
  onToggle: (featureId: string, enabled: boolean) => void;
}

export function FeatureItem({ 
  feature, 
  isUpdating, 
  isEnabled, 
  activeRole, 
  onToggle 
}: FeatureItemProps) {
  return (
    <div 
      key={feature.id} 
      className="flex items-start justify-between p-4 rounded-lg border"
    >
      <div className="space-y-1">
        <div className="font-medium">{feature.name}</div>
        {feature.description && (
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        )}
        <div className="text-xs text-muted-foreground">Key: {feature.key}</div>
      </div>
      
      <div className="flex items-center space-x-2">
        {isUpdating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Switch
              id={`feature-${feature.id}`}
              checked={isEnabled}
              onCheckedChange={(enabled) => onToggle(feature.id, enabled)}
              disabled={activeRole === 'superadmin'} // Superadmin always has all features
            />
            <Label htmlFor={`feature-${feature.id}`}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Label>
          </>
        )}
      </div>
    </div>
  );
}
