
import { Feature, FeatureCategory as FeatureCategoryType, UserRole } from "./types";
import { Badge } from "@/components/ui/badge";
import { FeatureItem } from "./FeatureItem";

interface FeatureCategoryProps {
  category: string;
  features: Feature[];
  categoryInfo: FeatureCategoryType;
  updating: Record<string, boolean>;
  activeRole: UserRole;
  isFeatureEnabled: (featureId: string) => boolean;
  toggleFeatureAccess: (featureId: string, enabled: boolean) => void;
}

export function FeatureCategory({
  category,
  features,
  categoryInfo,
  updating,
  activeRole,
  isFeatureEnabled,
  toggleFeatureAccess
}: FeatureCategoryProps) {
  return (
    <div key={category} className="mb-6">
      <h3 className="font-medium text-lg mb-2 flex items-center">
        <Badge className={categoryInfo?.color || "bg-gray-100"}>
          {categoryInfo?.name || category}
        </Badge>
      </h3>
      
      <div className="space-y-4">
        {features.map(feature => (
          <FeatureItem
            key={feature.id}
            feature={feature}
            isUpdating={!!updating[feature.id]}
            isEnabled={isFeatureEnabled(feature.id)}
            activeRole={activeRole}
            onToggle={toggleFeatureAccess}
          />
        ))}
      </div>
    </div>
  );
}
