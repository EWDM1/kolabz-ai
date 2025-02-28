
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
  Pencil
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
                              internal site search and content organization.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="canonical-url">
                              <span className="flex items-center gap-2">
                                <Link className="h-4 w-4" />
                                Canonical URL
                              </span>
                            </Label>
                            <Input
                              id="canonical-url"
                              placeholder="https://example.com/your-page"
                              value={canonicalUrl}
                              onChange={(e) => setCanonicalUrl(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              Helps prevent duplicate content issues by specifying the preferred URL for this content.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="robots-content">Robots Content</Label>
                            <Select 
                              value={robotsContent}
                              onValueChange={setRobotsContent}
                            >
                              <SelectTrigger id="robots-content">
                                <SelectValue placeholder="Select robots content" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="index, follow">index, follow (default)</SelectItem>
                                <SelectItem value="noindex, follow">noindex, follow</SelectItem>
                                <SelectItem value="index, nofollow">index, nofollow</SelectItem>
                                <SelectItem value="noindex, nofollow">noindex, nofollow</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                              Controls how search engines interact with this page.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* Social Media Tab */}
                      <TabsContent value="social" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Facebook className="h-5 w-5 text-blue-600" />
                            <h3 className="font-medium">Open Graph (Facebook, LinkedIn)</h3>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="og-title">OG Title</Label>
                            <Input
                              id="og-title"
                              placeholder="Title for social sharing"
                              value={ogTitle}
                              onChange={(e) => setOgTitle(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              If left empty, your meta title will be used.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="og-description">OG Description</Label>
                            <Textarea
                              id="og-description"
                              placeholder="Description for social sharing"
                              value={ogDescription}
                              onChange={(e) => setOgDescription(e.target.value)}
                              rows={2}
                            />
                            <p className="text-xs text-muted-foreground">
                              If left empty, your meta description will be used.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="og-image">OG Image URL</Label>
                            <Input
                              id="og-image"
                              placeholder="https://example.com/image.jpg"
                              value={ogImage}
                              onChange={(e) => setOgImage(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              Recommended size: 1200 × 630 pixels (minimum 600 × 315).
                            </p>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="flex items-center gap-2 mb-2">
                            <svg
                              className="h-5 w-5 text-blue-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                            </svg>
                            <h3 className="font-medium">Twitter Card</h3>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="twitter-card">Card Type</Label>
                            <Select 
                              value={twitterCard}
                              onValueChange={setTwitterCard}
                            >
                              <SelectTrigger id="twitter-card">
                                <SelectValue placeholder="Select card type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="summary">Summary</SelectItem>
                                <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                                <SelectItem value="app">App</SelectItem>
                                <SelectItem value="player">Player</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="twitter-title">Twitter Title</Label>
                            <Input
                              id="twitter-title"
                              placeholder="Title for Twitter"
                              value={twitterTitle}
                              onChange={(e) => setTwitterTitle(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              If left empty, OG title or meta title will be used.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="twitter-description">Twitter Description</Label>
                            <Textarea
                              id="twitter-description"
                              placeholder="Description for Twitter"
                              value={twitterDescription}
                              onChange={(e) => setTwitterDescription(e.target.value)}
                              rows={2}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="twitter-image">Twitter Image URL</Label>
                            <Input
                              id="twitter-image"
                              placeholder="https://example.com/image.jpg"
                              value={twitterImage}
                              onChange={(e) => setTwitterImage(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              If left empty, OG image will be used if available.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* Advanced Tab */}
                      <TabsContent value="advanced" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Preview HTML Metadata</Label>
                            <div className="bg-muted font-mono text-xs p-4 rounded-md overflow-auto max-h-[300px] border">
                              <pre>{`<!-- Basic Meta Tags -->
<title>${metaTitle || 'Your Website Title'}</title>
<meta name="description" content="${metaDescription || 'Your website description'}">
<meta name="keywords" content="${keywords || 'keyword1, keyword2, keyword3'}">
${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}">` : '<!-- No canonical URL set -->'}
<meta name="robots" content="${robotsContent}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${ogTitle || metaTitle || 'Your Website Title'}">
<meta property="og:description" content="${ogDescription || metaDescription || 'Your website description'}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : '<!-- No OG image set -->'}

<!-- Twitter -->
<meta name="twitter:card" content="${twitterCard}">
<meta name="twitter:title" content="${twitterTitle || ogTitle || metaTitle || 'Your Website Title'}">
<meta name="twitter:description" content="${twitterDescription || ogDescription || metaDescription || 'Your website description'}">
${twitterImage || ogImage ? `<meta name="twitter:image" content="${twitterImage || ogImage}">` : '<!-- No Twitter image set -->'}`}</pre>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => copyToClipboard(document.querySelector('.font-mono pre')?.textContent || "")}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy HTML
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Metadata as JSON</Label>
                            <div className="bg-muted font-mono text-xs p-4 rounded-md overflow-auto max-h-[300px] border">
                              <pre>{getMetadataPreview()}</pre>
                            </div>
                          </div>
                          
                          <div className="space-y-2 pt-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="structured-data">Structured Data (JSON-LD)</Label>
                              <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                                <Info className="h-3 w-3" />
                                Learn more
                              </Button>
                            </div>
                            <Textarea
                              id="structured-data"
                              rows={8}
                              className="font-mono text-xs"
                              placeholder={`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": "https://www.example.com",
  "logo": "https://www.example.com/images/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-401-555-1212",
    "contactType": "customer service"
  }
}`}
                            />
                            <p className="text-xs text-muted-foreground">
                              JSON-LD structured data helps search engines understand your content better
                              and can enable rich snippets in search results.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between border-t pt-6">
                    <a 
                      href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"
                    >
                      <Info className="h-4 w-4" />
                      Google's SEO Starter Guide
                    </a>
                    <Button 
                      onClick={handleSaveSEO} 
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save SEO Settings"}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* SEO Tools Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Tools & Resources</CardTitle>
                    <CardDescription>
                      Helpful tools for optimizing your website's search visibility
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-600" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.59 5.59l-4.59 4.58 4.59 4.59-1.41 1.41-4.59-4.58-4.59 4.58-1.41-1.41 4.59-4.59-4.59-4.58 1.41-1.41 4.59 4.58 4.59-4.58 1.41 1.41z"/>
                          </svg>
                          <h3 className="font-medium">Google Search Console</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Monitor and optimize your site's presence in Google Search results.
                        </p>
                        <a 
                          href="https://search.google.com/search-console/about" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button variant="outline" size="sm">Visit Google Search Console</Button>
                        </a>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-600" fill="currentColor">
                            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"/>
                          </svg>
                          <h3 className="font-medium">XML Sitemap</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Generate and submit a sitemap to help search engines crawl your website.
                        </p>
                        <Button variant="outline" size="sm">Generate Sitemap</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                          </svg>
                          <h3 className="font-medium">Keyword Research</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Discover keywords to target based on search volume and competition.
                        </p>
                        <Button variant="outline" size="sm">Keyword Tool</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-600" fill="currentColor">
                            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
                          </svg>
                          <h3 className="font-medium">SEO Audit</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Run a comprehensive analysis of your website's SEO performance.
                        </p>
                        <Button variant="outline" size="sm">Run Audit</Button>
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

export default IntegrationsSettings;
