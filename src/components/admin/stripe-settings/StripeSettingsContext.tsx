
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
  useEffect(() => {
    const loadSettings = async () => {
      try {
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
      }
    };
    
    loadSettings();
  }, [toast]);
  
  // Handle test/live mode toggle
  const handleModeToggle = async () => {
    const newMode = !testMode;
    setLoading(true);
    
    try {
      const success = await toggleStripeTestMode(newMode);
      
      if (success) {
        setTestMode(newMode);
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

  const value = {
    testMode,
    loading,
    savedKeys,
    setSavedKeys,
    handleModeToggle
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
