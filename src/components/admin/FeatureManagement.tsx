
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type Feature = {
  id: string;
  name: string;
  key: string;
  description: string | null;
  category: string;
};

type RoleFeature = {
  id: string;
  feature_id: string;
  role: string;
  enabled: boolean;
};

type FeatureCategory = {
  name: string;
  value: string;
  color: string;
};

const featureCategories: Record<string, FeatureCategory> = {
  content: { name: "Content", value: "content", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  users: { name: "Users", value: "users", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  analytics: { name: "Analytics", value: "analytics", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  settings: { name: "Settings", value: "settings", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  billing: { name: "Billing", value: "billing", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
};

export function FeatureManagement() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [roleFeatures, setRoleFeatures] = useState<RoleFeature[]>([]);
  const [activeRole, setActiveRole] = useState<string>("user");
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Fetch features and role permissions
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all features
        const { data: featuresData, error: featuresError } = await supabase
          .from('features')
          .select('*')
          .order('category', { ascending: true })
          .order('name', { ascending: true });

        if (featuresError) throw featuresError;

        // Fetch all role permissions
        const { data: roleFeatureData, error: roleFeatureError } = await supabase
          .from('role_features')
          .select('*');

        if (roleFeatureError) throw roleFeatureError;

        setFeatures(featuresData || []);
        setRoleFeatures(roleFeatureData || []);
      } catch (error) {
        console.error('Error fetching feature data:', error);
        toast({
          variant: "destructive",
          title: "Failed to load features",
          description: "Please refresh the page and try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Toggle feature access for a role
  const toggleFeatureAccess = async (featureId: string, enabled: boolean) => {
    // Set this specific feature as updating
    setUpdating(prev => ({ ...prev, [featureId]: true }));
    
    try {
      // Find the role_feature record
      const roleFeature = roleFeatures.find(rf => 
        rf.feature_id === featureId && rf.role === activeRole
      );
      
      if (roleFeature) {
        // Update existing record
        const { error } = await supabase
          .from('role_features')
          .update({ enabled, updated_at: new Date().toISOString() })
          .eq('id', roleFeature.id);
          
        if (error) throw error;
        
        // Update local state
        setRoleFeatures(current => 
          current.map(rf => 
            rf.id === roleFeature.id ? { ...rf, enabled } : rf
          )
        );
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('role_features')
          .insert({
            feature_id: featureId,
            role: activeRole,
            enabled
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Add to local state
        if (data) {
          setRoleFeatures(current => [...current, data]);
        }
      }
      
      toast({
        title: "Permission updated",
        description: `Feature access has been ${enabled ? 'granted' : 'revoked'} for ${activeRole} role.`,
      });
    } catch (error) {
      console.error('Error updating feature access:', error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Failed to update feature permission.",
      });
    } finally {
      // Clear updating state
      setUpdating(prev => ({ ...prev, [featureId]: false }));
    }
  };

  // Check if a feature is enabled for the current active role
  const isFeatureEnabled = (featureId: string): boolean => {
    const roleFeature = roleFeatures.find(
      rf => rf.feature_id === featureId && rf.role === activeRole
    );
    return roleFeature ? roleFeature.enabled : false;
  };

  // Group features by category
  const getFeaturesByCategory = () => {
    const grouped: Record<string, Feature[]> = {};
    
    features.forEach(feature => {
      if (!grouped[feature.category]) {
        grouped[feature.category] = [];
      }
      grouped[feature.category].push(feature);
    });
    
    return grouped;
  };

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
        <Tabs defaultValue="user" onValueChange={setActiveRole} value={activeRole}>
          <TabsList className="mb-4">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="superadmin">Superadmin</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeRole} className="space-y-4">
            <ScrollArea className="h-[60vh]">
              {Object.entries(getFeaturesByCategory()).map(([category, categoryFeatures]) => (
                <div key={category} className="mb-6">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Badge className={featureCategories[category]?.color || "bg-gray-100"}>
                      {featureCategories[category]?.name || category}
                    </Badge>
                  </h3>
                  
                  <div className="space-y-4">
                    {categoryFeatures.map(feature => (
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
                          {updating[feature.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Switch
                                id={`feature-${feature.id}`}
                                checked={isFeatureEnabled(feature.id)}
                                onCheckedChange={(enabled) => toggleFeatureAccess(feature.id, enabled)}
                                disabled={activeRole === 'superadmin'} // Superadmin always has all features
                              />
                              <Label htmlFor={`feature-${feature.id}`}>
                                {isFeatureEnabled(feature.id) ? 'Enabled' : 'Disabled'}
                              </Label>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
