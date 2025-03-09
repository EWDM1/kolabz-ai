
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchStripeConfig, toggleStripeTestMode } from "@/integrations/stripe/stripeConfig";
import { useToast } from "@/hooks/use-toast";

interface StripeSettingsContextType {
  testMode: boolean;
  loading: boolean;
  savedKeys: {
    stripePublishableKey: boolean;
    stripeSecretKey: boolean;
    stripeWebhookSecret: boolean;
  };
  setSavedKeys: (keys: any) => void;
  handleModeToggle: () => Promise<void>;
  refreshConfig: () => Promise<void>;
}

const StripeSettingsContext = createContext<StripeSettingsContextType | undefined>(undefined);

export const StripeSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [testMode, setTestMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [savedKeys, setSavedKeys] = useState<{
    stripePublishableKey: boolean;
    stripeSecretKey: boolean;
    stripeWebhookSecret: boolean;
  }>({
    stripePublishableKey: false,
    stripeSecretKey: false,
    stripeWebhookSecret: false
  });

  // Load saved settings from Supabase
  const loadSettings = async () => {
    try {
      setLoading(true);
      const config = await fetchStripeConfig();
      
      // Set test mode from config
      setTestMode(config.isTestMode);
      
      // Update saved keys status
      setSavedKeys({
        stripePublishableKey: !!config.publishableKey,
        stripeSecretKey: !!config.secretKey,
        stripeWebhookSecret: !!config.webhookSecret
      });
    } catch (error) {
      console.error("Error loading Stripe settings:", error);
      toast({
        variant: "destructive",
        title: "Error loading settings",
        description: "There was a problem loading your Stripe settings."
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadSettings();
  }, []);
  
  // Handle test/live mode toggle
  const handleModeToggle = async () => {
    const newMode = !testMode;
    setLoading(true);
    
    try {
      const success = await toggleStripeTestMode(newMode);
      
      if (success) {
        setTestMode(newMode);
        
        // Reset cached Stripe instance to use new keys
        const { resetStripe } = await import('@/integrations/stripe/stripeService');
        resetStripe();
        
        toast({
          title: `Switched to ${newMode ? 'test' : 'live'} mode`,
          description: `Your Stripe integration is now in ${newMode ? 'test' : 'live'} mode.`
        });
      } else {
        throw new Error("Failed to update mode");
      }
    } catch (error) {
      console.error("Error toggling mode:", error);
      toast({
        variant: "destructive",
        title: "Error changing mode",
        description: "There was a problem updating the Stripe mode."
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshConfig = async () => {
    await loadSettings();
  };

  const value = {
    testMode,
    loading,
    savedKeys,
    setSavedKeys,
    handleModeToggle,
    refreshConfig
  };

  return (
    <StripeSettingsContext.Provider value={value}>
      {children}
    </StripeSettingsContext.Provider>
  );
};

export const useStripeSettings = () => {
  const context = useContext(StripeSettingsContext);
  if (context === undefined) {
    throw new Error('useStripeSettings must be used within a StripeSettingsProvider');
  }
  return context;
};
