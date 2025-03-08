
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertCircle } from "lucide-react";
import { useFeatureManagement } from "./feature-management/useFeatureManagement";
import { featureCategories, UserRole } from "./feature-management/types";
import { FeatureCategory } from "./feature-management/FeatureCategory";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function FeatureManagement() {
  const {
    features,
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

  const featuresByCategory = getFeaturesByCategory();
  const hasFeatures = features.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Management</CardTitle>
        <CardDescription>
          Control which features are available to each user role
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasFeatures ? (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No features found. Add features to the database to manage role access.
            </AlertDescription>
          </Alert>
        ) : (
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
                {Object.entries(featuresByCategory).length > 0 ? (
                  Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
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
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <AlertCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      No features are currently available to manage.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
