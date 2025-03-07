
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useFeatureManagement } from "./feature-management/useFeatureManagement";
import { featureCategories, UserRole } from "./feature-management/types";
import { FeatureCategory } from "./feature-management/FeatureCategory";

export function FeatureManagement() {
  const {
    loading,
    activeRole,
    setActiveRole,
    updating,
    getFeaturesByCategory,
    isFeatureEnabled,
    toggleFeatureAccess
  } = useFeatureManagement();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading features...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Management</CardTitle>
        <CardDescription>
          Control which features are available to each user role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="user" 
          value={activeRole} 
          onValueChange={(value) => setActiveRole(value as UserRole)}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="superadmin">Superadmin</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeRole} className="space-y-4">
            <ScrollArea className="h-[60vh]">
              {Object.entries(getFeaturesByCategory()).map(([category, categoryFeatures]) => (
                <FeatureCategory
                  key={category}
                  category={category}
                  features={categoryFeatures}
                  categoryInfo={featureCategories[category] || { name: category, value: category, color: "bg-gray-100" }}
                  updating={updating}
                  activeRole={activeRole}
                  isFeatureEnabled={isFeatureEnabled}
                  toggleFeatureAccess={toggleFeatureAccess}
                />
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
