
import { useState, useEffect } from 'react';
import { Feature, RoleFeature, UserRole } from './types';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useFeatureManagement() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [roleFeatures, setRoleFeatures] = useState<RoleFeature[]>([]);
  const [activeRole, setActiveRole] = useState<UserRole>("user");
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
        // Create new record - using the proper type casting for role
        const { data, error } = await supabase
          .from('role_features')
          .insert({
            feature_id: featureId,
            role: activeRole as UserRole, // Cast to the expected enum type
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

  return {
    features,
    roleFeatures,
    activeRole,
    setActiveRole,
    loading,
    updating,
    toggleFeatureAccess,
    isFeatureEnabled,
    getFeaturesByCategory
  };
}
