
import { useState, useEffect } from 'react';
import { hasFeatureAccess } from '@/integrations/supabase/client';

/**
 * Hook to check if the current user has access to a specific feature
 * @param featureKey The unique identifier of the feature to check
 * @param defaultValue Default value to use while loading (optional, defaults to false)
 * @returns Object containing loading state and whether the user has access
 */
export function useFeatureAccess(featureKey: string, defaultValue: boolean = false) {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(defaultValue);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const access = await hasFeatureAccess(featureKey);
        setHasAccess(access);
      } catch (error) {
        console.error(`Error checking access for feature ${featureKey}:`, error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [featureKey]);

  return { loading, hasAccess };
}
