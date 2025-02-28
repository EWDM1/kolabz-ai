<lov-code>
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Code, 
  Facebook, 
  BarChart, 
  Globe, 
  Copy, 
  Check, 
  Info,
  PanelLeftClose,
  PanelRightClose,
  GanttChart,
  Bookmark,
  Search,
  Tag,
  FileText,
  Pencil,
  X // Add X icon import
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const IntegrationsSettings = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  
  // Facebook Pixel state
  const [fbPixelId, setFbPixelId] = useState("");
  const [fbPixelEnabled, setFbPixelEnabled] = useState(false);
  
  // Google Analytics state
  const [gaTrackingId, setGaTrackingId] = useState("");
  const [gaEnabled, setGaEnabled] = useState(false);
  
  // Custom scripts state
  const [customScripts, setCustomScripts] = useState([
    { id: 1, name: "Header Script", code: "", location: "head", enabled: false },
    { id: 2, name: "Footer Script", code: "", location: "body", enabled: false }
  ]);
  
  // SEO & Metadata state
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");
  const [robotsContent, setRobotsContent] = useState("index, follow");
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Handle form submissions
  const handleSaveFacebookPixel = () => {
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "Facebook Pixel settings saved",
        description: fbPixelEnabled ? "Facebook Pixel has been enabled on your site" : "Facebook Pixel has been disabled"
      });
      setLoading(false);
    }, 1000);
  };
  
  const handleSaveGoogleAnalytics = () => {
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "Google Analytics settings saved",
        description: gaEnabled ? "Google Analytics has been enabled on your site" : "Google Analytics has been disabled"
      });
      setLoading(false);
    }, 1000);
  };
  
  const handleUpdateScript = (id: number, field: string, value: any) => {
    setCustomScripts(
      customScripts.map(script => 
        script.id === id ? { ...script, [field]: value } : script
      )
    );
  };
  
  const handleSaveScript = (id: number) => {
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "Custom script saved",
        description: "Your custom script has been updated"
      });
      setLoading(false);
    }, 1000);
  };
  
  const handleAddNewScript = () => {
    const newId = Math.max(...customScripts.map(s => s.id)) + 1;
    setCustomScripts([
      ...customScripts,
      { 
        id: newId, 
        name: `Custom Script ${newId}`, 
        code: "", 
        location: "head", 
        enabled: false 
      }
    ]);
  };
  
  const handleDeleteScript = (id: number) => {
    if (customScripts.length <= 2) {
      toast({
        variant: "destructive",
        title: "Cannot delete",
        description: "You must keep at least two script entries"
      });
      return;
    }
    
    setCustomScripts(customScripts.filter(script => script.id !== id));
    toast({
      title: "Script deleted",
      description: "The custom script has been removed"
    });
  };
  
  // SEO form submission
  const handleSaveSEO = () => {
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "SEO settings saved",
        description: "Your SEO, metadata, and keywords have been updated"
      });
      setLoading(false);
    }, 1000);
  };
  
  // Copy to clipboard utility
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard"
    });
  };
  
  // Preview metadata as JSON
  const getMetadataPreview = () => {
    const metadata = {
      title: metaTitle,
      description: metaDescription,
      keywords: keywords,
      canonical: canonicalUrl,
      og: {
        title: ogTitle || metaTitle,
        description: ogDescription || metaDescription,
        image: ogImage,
        type: "website",
      },
      twitter: {
        card: twitterCard,
        title: twitterTitle || ogTitle || metaTitle,
        description: twitterDescription || ogDescription || metaDescription,
        image: twitterImage || ogImage,
      },
      robots: robotsContent,
    };
    
    return JSON.stringify(metadata, null, 2);
  };
  
  // Initialize sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`flex-1 transition-all duration-300 ease-in-out w-full ${
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      }`}>
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
              <h1 className="text-3xl font-bold">External Integrations</h1>
              <p className="text-muted-foreground">
                Configure third-party integrations and custom scripts for your website
              </p>
            </div>
            
            <Tabs defaultValue="facebook">
              <TabsList className="grid w-full md:w-auto md:grid-cols-4">
                <TabsTrigger value="facebook">Facebook</TabsTrigger>
                <TabsTrigger value="analytics">Google Analytics</TabsTrigger>
                <TabsTrigger value="scripts">Custom Scripts</TabsTrigger>
                <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
              </TabsList>
              
              {/* Facebook Pixel Integration */}
              <TabsContent value="facebook" className="space-y-6 mt-6">
                <Card>
                  <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <CardTitle>Facebook Pixel</CardTitle>
                      </div>
                      <Switch 
                        checked={fbPixelEnabled}
                        onCheckedChange={setFbPixelEnabled}
                      />
                    </div>
                    <CardDescription>
                      Track conversions from Facebook ads and build targeted audiences
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fb-pixel-id">Facebook Pixel ID</Label>
                      <div className="flex gap-2">
                        <Input
                          id="fb-pixel-id"
                          placeholder="123456789012345"
                          value={fbPixelId}
                          onChange={(e) => setFbPixelId(e.target.value)}
                          disabled={!fbPixelEnabled}
                        />
                        <Button 
                          variant="outline" 
                          type="button" 
                          className="shrink-0"
                          onClick={() => copyToClipboard(fbPixelId)}
                          disabled={!fbPixelId}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter your Facebook Pixel ID (numbers only)
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg border p-4 space-y-2">
                      <h4 className="text-sm font-medium">Where to find your Pixel ID:</h4>
                      <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1 ml-2">
                        <li>Go to Facebook Events Manager</li>
                        <li>Select your pixel</li>
                        <li>Click "Settings"</li>
                        <li>Copy the Pixel ID shown under "Pixel ID"</li>
                      </ol>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-sm font-medium">Tracking Options:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="fb-track-pageviews" checked={true} disabled={!fbPixelEnabled} />
                          <Label htmlFor="fb-track-pageviews">Track Page Views</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="fb-track-purchases" checked={true} disabled={!fbPixelEnabled} />
                          <Label htmlFor="fb-track-purchases">Track Purchases</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="fb-track-signups" checked={true} disabled={!fbPixelEnabled} />
                          <Label htmlFor="fb-track-signups">Track Sign Ups</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="fb-track-login" checked={false} disabled={!fbPixelEnabled} />
                          <Label htmlFor="fb-track-login">Track Logins</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between border-t pt-6">
                    <a 
                      href="https://www.facebook.com/business/help/952192354843755" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"
                    >
                      <Info className="h-4 w-4" />
                      Learn more about Facebook Pixel
                    </a>
                    <Button 
                      onClick={handleSaveFacebookPixel} 
                      disabled={loading || (fbPixelEnabled && !fbPixelId)}
                    >
                      {loading ? "Saving..." : "Save Settings"}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Facebook Conversion API</CardTitle>
                    <CardDescription>
                      Set up server-side tracking for more accurate conversion data
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">
                        Server-side tracking requires additional setup beyond basic pixel integration.
                        Use this in conjunction with the pixel for maximum tracking accuracy.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fb-access-token">API Access Token</Label>
                      <Input
                        id="fb-access-token"
                        type="password"
                        placeholder="Enter your access token"
                        disabled={!fbPixelEnabled}
                      />
                      <p className="text-xs text-muted-foreground">
                        Generated in the Facebook Events Manager
                      </p>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="outline" disabled={!fbPixelEnabled}>
                      Configure Conversion API
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Google Analytics Integration */}
              <TabsContent value="analytics" className="space-y-6 mt-6">
                <Card>
                  <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-green-600" />
                        <CardTitle>Google Analytics</CardTitle>
                      </div>
                      <Switch 
                        checked={gaEnabled}
                        onCheckedChange={setGaEnabled}
                      />
                    </div>
                    <CardDescription>
                      Track website traffic, user behavior, and conversion rates
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <Tabs defaultValue="ga4">
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="ga4">Google Analytics 4</TabsTrigger>
                        <TabsTrigger value="ua">Universal Analytics</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="ga4" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="ga4-id">Measurement ID</Label>
                          <div className="flex gap-2">
                            <Input
                              id="ga4-id"
                              placeholder="G-XXXXXXXXXX"
                              value={gaTrackingId}
                              onChange={(e) => setGaTrackingId(e.target.value)}
                              disabled={!gaEnabled}
                            />
                            <Button 
                              variant="outline" 
                              type="button" 
                              className="shrink-0"
                              onClick={() => copyToClipboard(gaTrackingId)}
                              disabled={!gaTrackingId}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Enter your Google Analytics 4 Measurement ID (starts with G-)
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="ua" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="ua-id">Tracking ID</Label>
                          <Input
                            id="ua-id"
                            placeholder="UA-XXXXXXXXX-X"
                            disabled={!gaEnabled}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter your Universal Analytics Tracking ID (starts with UA-)
                          </p>
                          <div className="text-xs rounded bg-amber-100 border border-amber-200 p-2 dark:bg-amber-900/20 dark:border-amber-900/30 text-amber-800 dark:text-amber-300 mt-2">
                            Note: Universal Analytics properties stopped processing data on July 1, 2023.
                            We recommend using Google Analytics 4.
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="bg-muted/50 rounded-lg border p-4 space-y-2">
                      <h4 className="text-sm font-medium">Where to find your Measurement ID:</h4>
                      <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1 ml-2">
                        <li>Go to Google Analytics Admin</li>
                        <li>Select your account and property</li>
                        <li>Click "Data Streams" then select your web stream</li>
                        <li>Your Measurement ID is displayed at the top (G-XXXXXXXXXX)</li>
                      </ol>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Advanced Settings:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="ga-anonymize-ip" checked={true} disabled={!gaEnabled} />
                          <Label htmlFor="ga-anonymize-ip">Anonymize IP addresses</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="ga-enhanced-link" checked={true} disabled={!gaEnabled} />
                          <Label htmlFor="ga-enhanced-link">Enable enhanced link attribution</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="ga-demographics" checked={false} disabled={!gaEnabled} />
                          <Label htmlFor="ga-demographics">Enable demographics and interests reports</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between border-t pt-6">
                    <a 
                      href="https://support.google.com/analytics/answer/9304153" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"
                    >
                      <Info className="h-4 w-4" />
                      Learn more about Google Analytics 4
                    </a>
                    <Button 
                      onClick={handleSaveGoogleAnalytics} 
                      disabled={loading || (gaEnabled && !gaTrackingId)}
                    >
                      {loading ? "Saving..." : "Save Settings"}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Google Tag Manager</CardTitle>
                    <CardDescription>
                      Manage all your website tags from one place
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="gtm-enabled">Enable Google Tag Manager</Label>
                        <div className="text-xs rounded bg-blue-100 border border-blue-200 px-2 py-0.5 dark:bg-blue-900/20 dark:border-blue-900/30 text-blue-800 dark:text-blue-300">
                          Recommended
                        </div>
                      </div>
                      <Switch id="gtm-enabled" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gtm-id">Container ID</Label>
                      <Input
                        id="gtm-id"
                        placeholder="GTM-XXXXXXX"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your GTM Container ID (starts with GTM-)
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">
                        Using Google Tag Manager? We recommend managing all tracking codes
                        (including Google Analytics) through GTM for better organization.
                      </p>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="outline">
                      Configure Tag Manager
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Custom Scripts Integration */}
              <TabsContent value="scripts" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Scripts</CardTitle>
                    <CardDescription>
                      Add custom JavaScript or CSS to your website
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Info className="h-4 w-4 text-amber-500" />
                        <div className="font-medium">Important Security Notice</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Custom scripts can modify your website's behavior and potentially impact its security. 
                        Only add scripts from trusted sources that you understand.
                      </p>
                    </div>
                    
                    <div className="grid gap-8">
                      {customScripts.map((script) => (
                        <div key={script.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Code className="h-5 w-5 text-purple-500" />
                              <div className="font-medium">
                                <input
                                  type="text"
                                  value={script.name}
                                  onChange={(e) => handleUpdateScript(script.id, 'name', e.target.value)}
                                  className="bg-transparent border-0 border-b border-dashed border-border focus:border-primary outline-none p-0 text-inherit"
                                />
                              </div>
                            </div>
                            <Switch 
                              checked={script.enabled}
                              onCheckedChange={(checked) => handleUpdateScript(script.id, 'enabled', checked)}
                            />
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <Label className="min-w-24">Location:</Label>
                              <Select 
                                value={script.location}
                                onValueChange={(value) => handleUpdateScript(script.id, 'location', value)}
                              >
                                <SelectTrigger className="w-48">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="head">
                                    <div className="flex items-center gap-2">
                                      <PanelLeftClose className="h-4 w-4" />
                                      <span>Head (before &lt;/head&gt;)</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="body">
                                    <div className="flex items-center gap-2">
                                      <PanelRightClose className="h-4 w-4" />
                                      <span>Body (before &lt;/body&gt;)</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`script-${script.id}`}>Script Code:</Label>
                              <Textarea
                                id={`script-${script.id}`}
                                rows={6}
                                value={script.code}
                                onChange={(e) => handleUpdateScript(script.id, 'code', e.target.value)}
                                placeholder="<script>\n  // Your JavaScript code here\n</script>"
                                className="font-mono text-sm"
                              />
                              <p className="text-xs text-muted-foreground">
                                Include the full script tags if needed. HTML, JavaScript, and CSS are supported.
                              </p>
                            </div>
                            
                            <div className="flex justify-between">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDeleteScript(script.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                Delete Script
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleSaveScript(script.id)}
                                disabled={loading}
                              >
                                {loading ? "Saving..." : "Save Script"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={handleAddNewScript}
                    >
                      + Add New Script
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Common Integrations</CardTitle>
                    <CardDescription>
                      Quick setup for popular third-party services
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                            <GanttChart className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Hotjar</div>
                            <div className="text-xs text-muted-foreground">Heat maps & user recordings</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/30">
                            <Globe className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <div className="font-medium">Pinterest Tag</div>
                            <div className="text-xs text-muted-foreground">Track conversions from Pinterest</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                            <Bookmark className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">TikTok Pixel</div>
                            <div className="text-xs text-muted-foreground">Track TikTok ad conversions</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/30">
                            <Code className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium">Microsoft Clarity</div>
                            <div className="text-xs text-muted-foreground">Free heat maps & session recordings</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* SEO & Metadata - New Tab */}
              <TabsContent value="seo" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-teal-600" />
                      <CardTitle>SEO & Metadata</CardTitle>
                    </div>
                    <CardDescription>
                      Optimize your website for search engines and social media sharing
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="bg-muted/50 rounded-lg border p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        <h4 className="text-sm font-medium">Why SEO matters</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Properly configured metadata helps search engines understand your content and 
                        improves how your pages appear in search results and social media shares.
                      </p>
                    </div>
                    
                    <Tabs defaultValue="basic">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                        <TabsTrigger value="social">Social Media</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                      </TabsList>
                      
                      {/* Basic SEO Tab */}
                      <TabsContent value="basic" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="meta-title">
                              <span className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Meta Title
                                <span className="text-xs text-muted-foreground">(50-60 characters)</span>
                              </span>
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                id="meta-title"
                                placeholder="Your page title"
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                maxLength={70}
                              />
                              <Button 
                                variant="outline" 
                                type="button" 
                                size="icon"
                                className="shrink-0"
                                onClick={() => setMetaTitle("")}
                                disabled={!metaTitle}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className={`text-xs flex justify-between ${
                              metaTitle.length > 60 ? "text-destructive" : 
                              metaTitle.length > 50 ? "text-amber-500" : 
                              "text-muted-foreground"
                            }`}>
                              <span>Characters: {metaTitle.length}/60</span>
                              {metaTitle.length > 60 && <span>Too long!</span>}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="meta-description">
                              <span className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Meta Description
                                <span className="text-xs text-muted-foreground">(120-156 characters)</span>
                              </span>
                            </Label>
                            <Textarea
                              id="meta-description"
                              placeholder="Brief description of your page content"
                              value={metaDescription}
                              onChange={(e) => setMetaDescription(e.target.value)}
                              maxLength={200}
                              rows={3}
                            />
                            <div className={`text-xs flex justify-between ${
                              metaDescription.length > 156 ? "text-destructive" : 
                              metaDescription.length > 120 ? "text-amber-500" : 
                              "text-muted-foreground"
                            }`}>
                              <span>Characters: {metaDescription.length}/156</span>
                              {metaDescription.length > 156 && <span>Too long!</span>}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="keywords">
                              <span className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                Keywords
                                <span className="text-xs text-muted-foreground">(comma separated)</span>
                              </span>
                            </Label>
                            <Textarea
                              id="keywords"
                              placeholder="keyword1, keyword2, keyword3"
                              value={keywords}
                              onChange={(e) => setKeywords(e.target.value)}
                              rows={2}
                            />
                            <p className="text-xs text-muted-foreground">
                              While meta keywords have diminished SEO value, they can still be useful for 
