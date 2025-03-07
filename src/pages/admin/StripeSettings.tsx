import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle, ExternalLink, CreditCard, KeyRound, Box, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";
import { 
  saveStripeConfig, 
  fetchStripeConfig, 
  toggleStripeTestMode, 
  STRIPE_SETTINGS 
} from "@/integrations/stripe/stripeConfig";

const StripeSettings = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  
  // State for the form inputs
  const [publishableKey, setPublishableKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
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
  
  // Handler for saving Stripe keys
  const handleSaveKeys = async () => {
    setLoading(true);
    
    try {
      const promises = [];
      const updatedKeys = { ...savedKeys };
      
      // Save publishable key if provided
      if (publishableKey) {
        promises.push(
          saveStripeConfig(STRIPE_SETTINGS.PUBLISHABLE_KEY, publishableKey)
            .then(success => {
              if (success) updatedKeys.stripePublishableKey = true;
              return success;
            })
        );
      }
      
      // Save secret key if provided
      if (secretKey) {
        promises.push(
          saveStripeConfig(STRIPE_SETTINGS.SECRET_KEY, secretKey)
            .then(success => {
              if (success) updatedKeys.stripeSecretKey = true;
              return success;
            })
        );
      }
      
      // Save webhook secret if provided
      if (webhookSecret) {
        promises.push(
          saveStripeConfig(STRIPE_SETTINGS.WEBHOOK_SECRET, webhookSecret)
            .then(success => {
              if (success) updatedKeys.stripeWebhookSecret = true;
              return success;
            })
        );
      }
      
      const results = await Promise.all(promises);
      
      if (results.every(result => result)) {
        setSavedKeys(updatedKeys);
        
        // Show success toast
        toast({
          title: "Settings saved",
          description: "Your Stripe API keys have been saved successfully",
        });
        
        // Clear the form inputs for security
        setPublishableKey("");
        setSecretKey("");
        setWebhookSecret("");
      } else {
        throw new Error("Failed to save some settings");
      }
    } catch (error) {
      console.error("Error saving Stripe keys:", error);
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: "There was an unexpected error saving your Stripe API keys",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Check the sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Stripe Integration</h1>
              <p className="text-muted-foreground">
                Configure your Stripe API keys and webhook settings
              </p>
            </div>
            
            <Tabs defaultValue="settings">
              <TabsList>
                <TabsTrigger value="settings">API Keys</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                <TabsTrigger value="testing">Testing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Stripe API Keys</CardTitle>
                        <CardDescription>
                          Configure your Stripe API keys for payment processing
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                          testMode 
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                          {testMode ? "Test Mode" : "Live Mode"}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleModeToggle}
                          disabled={loading}
                        >
                          Toggle Mode
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted/50 rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <div className="font-medium">Important Security Notice</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your API keys are securely stored. Never share your secret key and 
                        ensure you're using the correct keys based on your environment (test or live).
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="publishable-key">Publishable Key</Label>
                          {savedKeys.stripePublishableKey && (
                            <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400">
                              <Check className="h-3 w-3" /> Key Set
                            </span>
                          )}
                        </div>
                        <Input
                          id="publishable-key"
                          placeholder={`${testMode ? 'pk_test_...' : 'pk_live_...'}`}
                          value={publishableKey}
                          onChange={(e) => setPublishableKey(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          The publishable key is used in your frontend code
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="secret-key">Secret Key</Label>
                          {savedKeys.stripeSecretKey && (
                            <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400">
                              <Check className="h-3 w-3" /> Key Set
                            </span>
                          )}
                        </div>
                        <Input
                          id="secret-key"
                          type="password"
                          placeholder={`${testMode ? 'sk_test_...' : 'sk_live_...'}`}
                          value={secretKey}
                          onChange={(e) => setSecretKey(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          The secret key is used in your backend code (never expose this in frontend code)
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-end mt-6">
                        <Button 
                          onClick={handleSaveKeys} 
                          disabled={loading || (!publishableKey && !secretKey && !webhookSecret)}
                        >
                          {loading ? "Saving..." : "Save API Keys"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Get Your Stripe API Keys</CardTitle>
                    <CardDescription>
                      Follow these steps to find and configure your Stripe API keys
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="pl-2">
                        <span className="font-medium">Log in to your Stripe Dashboard</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Sign in to your Stripe account at <a href="https://dashboard.stripe.com" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center">dashboard.stripe.com <ExternalLink className="h-3 w-3 ml-1" /></a>
                        </p>
                      </li>
                      
                      <li className="pl-2">
                        <span className="font-medium">Navigate to the API Keys section</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Go to Developers → API Keys in the Stripe Dashboard
                        </p>
                      </li>
                      
                      <li className="pl-2">
                        <span className="font-medium">Copy your API keys</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Copy both the publishable key and secret key
                        </p>
                      </li>
                      
                      <li className="pl-2">
                        <span className="font-medium">Paste them in the fields above</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Ensure you're using the correct keys based on your selected mode (test/live)
                        </p>
                      </li>
                    </ol>
                    
                    <div className="flex justify-center mt-4">
                      <a 
                        href="https://dashboard.stripe.com/apikeys" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center"
                      >
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Go to Stripe API Keys
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="webhooks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Configuration</CardTitle>
                    <CardDescription>
                      Set up webhooks to handle Stripe events in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="webhook-secret">Webhook Secret</Label>
                          {savedKeys.stripeWebhookSecret && (
                            <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400">
                              <Check className="h-3 w-3" /> Secret Set
                            </span>
                          )}
                        </div>
                        <Input
                          id="webhook-secret"
                          type="password"
                          placeholder="whsec_..."
                          value={webhookSecret}
                          onChange={(e) => setWebhookSecret(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          The webhook secret is used to verify that events were sent by Stripe
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Your Webhook URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="webhook-url"
                            value={`${window.location.origin}/api/stripe-webhook`}
                            readOnly
                            className="bg-muted/50"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/api/stripe-webhook`);
                              toast({
                                title: "URL copied",
                                description: "Webhook URL copied to clipboard",
                              });
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Use this URL when configuring webhooks in your Stripe Dashboard
                        </p>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg border p-4 space-y-2 mt-4">
                        <div className="font-medium text-sm">Recommended Events to Listen For:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• payment_intent.succeeded</li>
                          <li>• payment_intent.failed</li>
                          <li>• checkout.session.completed</li>
                          <li>• customer.subscription.created</li>
                          <li>• customer.subscription.updated</li>
                          <li>• customer.subscription.deleted</li>
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-end mt-6">
                        <Button 
                          onClick={handleSaveKeys}
                          disabled={loading || !webhookSecret}
                        >
                          {loading ? "Saving..." : "Save Webhook Secret"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Setting Up Stripe Webhooks</CardTitle>
                    <CardDescription>
                      Step-by-step guide to configure webhooks in your Stripe Dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="pl-2">
                        <span className="font-medium">Go to the Webhooks section in Stripe</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Navigate to Developers → Webhooks in your Stripe Dashboard
                        </p>
                      </li>
                      
                      <li className="pl-2">
                        <span className="font-medium">Add a new endpoint</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Click "Add endpoint" and enter your webhook URL from above
                        </p>
                      </li>
                      
                      <li className="pl-2">
                        <span className="font-medium">Select events to listen for</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Choose the events you want to be notified about (see recommended list above)
                        </p>
                      </li>
                      
                      <li className="pl-2">
                        <span className="font-medium">Copy the signing secret</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          After creating the webhook, Stripe will provide a signing secret (starts with "whsec_")
                        </p>
                      </li>
                      
                      <li className="pl-2">
                        <span className="font-medium">Add the secret above</span>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Paste the webhook signing secret in the field above and save
                        </p>
                      </li>
                    </ol>
                    
                    <div className="flex justify-center mt-4">
                      <a 
                        href="https://dashboard.stripe.com/webhooks" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center"
                      >
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Go to Stripe Webhooks
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="testing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Testing Your Stripe Integration</CardTitle>
                    <CardDescription>
                      Use these test cards and tools to verify your integration works correctly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Test Credit Cards</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Card className="bg-muted/50">
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">Successful Payment</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <div className="flex justify-between items-center">
                                <div className="font-mono">4242 4242 4242 4242</div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => {
                                    navigator.clipboard.writeText("4242424242424242");
                                    toast({
                                      title: "Copied",
                                      description: "Test card number copied to clipboard",
                                    });
                                  }}
                                >
                                  Copy
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground mt-2">
                                Any future date, any 3 digits for CVC, any ZIP code
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-muted/50">
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">Requires Authentication</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <div className="flex justify-between items-center">
                                <div className="font-mono">4000 0025 0000 3155</div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => {
                                    navigator.clipboard.writeText("4000002500003155");
                                    toast({
                                      title: "Copied",
                                      description: "Test card number copied to clipboard",
                                    });
                                  }}
                                >
                                  Copy
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground mt-2">
                                Tests 3D Secure authentication flow
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-muted/50">
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">Payment Declined</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <div className="flex justify-between items-center">
                                <div className="font-mono">4000 0000 0000 0002</div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => {
                                    navigator.clipboard.writeText("4000000000000002");
                                    toast({
                                      title: "Copied",
                                      description: "Test card number copied to clipboard",
                                    });
                                  }}
                                >
                                  Copy
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground mt-2">
                                Will be declined with a generic decline code
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-muted/50">
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">Insufficient Funds</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <div className="flex justify-between items-center">
                                <div className="font-mono">4000 0000 0000 9995</div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => {
                                    navigator.clipboard.writeText("4000000000009995");
                                    toast({
                                      title: "Copied",
                                      description: "Test card number copied to clipboard",
                                    });
                                  }}
                                >
                                  Copy
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground mt-2">
                                Will be declined with an insufficient funds code
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Webhook Testing Tools</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Use these tools to test your webhook integration without making real payments
                        </p>
                        
                        <div className="space-y-4">
                          <Card className="bg-muted/50">
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">Stripe CLI</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <p className="text-sm text-muted-foreground mb-2">
                                The Stripe CLI allows you to forward events to your local environment and trigger test webhook events
                              </p>
                              <div className="bg-card p-3 rounded-md font-mono text-xs overflow-x-auto whitespace-nowrap">
                                stripe listen --forward-to localhost:5000/api/stripe-webhook
                              </div>
                            </CardContent>
                            <CardFooter className="pt-2 pb-3">
                              <a 
                                href="https://stripe.com/docs/stripe-cli" 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center"
                              >
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-3 w-3 mr-2" />
                                  Stripe CLI Documentation
                                </Button>
                              </a>
                            </CardFooter>
                          </Card>
                          
                          <Card className="bg-muted/50">
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">Stripe Dashboard Events</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <p className="text-sm text-muted-foreground mb-3">
                                You can trigger test events directly from the Stripe Dashboard to test your webhook handlers.
                              </p>
                            </CardContent>
                            <CardFooter className="pt-2 pb-3">
                              <a 
                                href="https://dashboard.stripe.com/test/webhooks" 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center"
                              >
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-3 w-3 mr-2" />
                                  Stripe Webhooks Dashboard
                                </Button>
                              </a>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StripeSettings;

