import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Search, Globe, Facebook, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

const LandingSEO = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [metaTitle, setMetaTitle] = useState("Kolabz | AI Tools for Business");
  const [metaDescription, setMetaDescription] = useState("Powerful AI tools to boost your business productivity and efficiency. Try Kolabz today.");
  const [keywords, setKeywords] = useState("AI, business tools, productivity");
  const [ogTitle, setOgTitle] = useState("Kolabz - Supercharge Your Business with AI");
  const [ogDescription, setOgDescription] = useState("AI-powered tools that help businesses work smarter, not harder. Boost your productivity today.");
  const [ogImage, setOgImage] = useState("/og-image.png");
  const [robotsContent, setRobotsContent] = useState("index, follow");
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "SEO settings saved",
        description: "Your SEO and metadata have been updated successfully"
      });
    }, 1000);
  };

  return (
    <AdminLayout
      title="Landing Page SEO"
      description="Optimize your landing page for search engines and social sharing"
    >
      <div className="flex items-center mb-6 gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle>SEO & Metadata</CardTitle>
            </div>
            <CardDescription>
              Optimize your landing page for search engines and social sharing
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">
                  <Globe className="h-4 w-4 mr-2" />
                  General SEO
                </TabsTrigger>
                <TabsTrigger value="social">
                  <Facebook className="h-4 w-4 mr-2" />
                  Social Media
                </TabsTrigger>
                <TabsTrigger value="advanced">
                  <FileText className="h-4 w-4 mr-2" />
                  Advanced
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">
                    Meta Title
                    <span className="text-xs text-muted-foreground ml-2">
                      (50-60 characters)
                    </span>
                  </Label>
                  <Input 
                    id="meta-title" 
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    maxLength={70}
                  />
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
                    Meta Description
                    <span className="text-xs text-muted-foreground ml-2">
                      (150-160 characters)
                    </span>
                  </Label>
                  <Textarea 
                    id="meta-description" 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    maxLength={200}
                  />
                  <div className={`text-xs flex justify-between ${
                    metaDescription.length > 160 ? "text-destructive" : 
                    metaDescription.length > 150 ? "text-amber-500" : 
                    "text-muted-foreground"
                  }`}>
                    <span>Characters: {metaDescription.length}/160</span>
                    {metaDescription.length > 160 && <span>Too long!</span>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">
                    Keywords
                    <span className="text-xs text-muted-foreground ml-2">
                      (comma separated)
                    </span>
                  </Label>
                  <Input 
                    id="keywords" 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. AI, business, productivity"
                  />
                  <p className="text-xs text-muted-foreground">
                    While less important for rankings, keywords can still help with categorization.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="canonical-url">Canonical URL</Label>
                    <div className="text-xs rounded bg-blue-50 border border-blue-100 px-2 py-0.5 text-blue-700 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-400">
                      Recommended
                    </div>
                  </div>
                  <Input 
                    id="canonical-url" 
                    defaultValue="https://yourdomain.com/"
                    placeholder="https://yourdomain.com/"
                  />
                  <p className="text-xs text-muted-foreground">
                    Helps prevent duplicate content issues
                  </p>
                </div>
                
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="space-y-3">
                    <Label className="font-medium">Preview in Search Results</Label>
                    <div className="space-y-1 max-w-xl">
                      <div className="text-blue-600 text-base font-medium truncate">
                        {metaTitle}
                      </div>
                      <div className="text-green-700 text-xs">
                        https://yourdomain.com/
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {metaDescription}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="social" className="space-y-4 pt-4">
                <div>
                  <h3 className="font-medium mb-1">Open Graph (Facebook/LinkedIn)</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Control how your content appears when shared on social media platforms
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og-title">
                    OG Title
                    <span className="text-xs text-muted-foreground ml-2">
                      (defaults to Meta Title if empty)
                    </span>
                  </Label>
                  <Input 
                    id="og-title" 
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og-description">OG Description</Label>
                  <Textarea 
                    id="og-description" 
                    value={ogDescription}
                    onChange={(e) => setOgDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og-image">
                    OG Image URL
                    <span className="text-xs text-muted-foreground ml-2">
                      (1200×630px recommended)
                    </span>
                  </Label>
                  <Input 
                    id="og-image" 
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                  />
                </div>
                
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="space-y-3">
                    <Label className="font-medium">Preview on Facebook</Label>
                    <div className="space-y-1 border rounded-md overflow-hidden bg-white dark:bg-gray-950">
                      <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-muted-foreground text-sm">
                        {ogImage ? "Image Preview" : "No image set"}
                      </div>
                      <div className="p-3 space-y-1">
                        <div className="text-blue-600 font-medium">
                          {ogTitle || metaTitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          yourdomain.com
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {ogDescription || metaDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twitter-card">Twitter Card Type</Label>
                  </div>
                  <Select defaultValue="summary_large_image">
                    <SelectTrigger id="twitter-card">
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary (small image)</SelectItem>
                      <SelectItem value="summary_large_image">Summary with Large Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="robots">Robots Meta Tag</Label>
                  <Select 
                    value={robotsContent}
                    onValueChange={setRobotsContent}
                  >
                    <SelectTrigger id="robots">
                      <SelectValue placeholder="Select robots directive" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="index, follow">index, follow (Recommended)</SelectItem>
                      <SelectItem value="noindex, follow">noindex, follow (Hide from search)</SelectItem>
                      <SelectItem value="index, nofollow">index, nofollow (Don't follow links)</SelectItem>
                      <SelectItem value="noindex, nofollow">noindex, nofollow (Hide completely)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls how search engines interact with your page
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="xml-sitemap" defaultChecked />
                    <Label htmlFor="xml-sitemap">Include in XML Sitemap</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="structured-data" defaultChecked />
                    <Label htmlFor="structured-data">Enable Structured Data</Label>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Structured data helps search engines understand your content better 
                    and can enable rich snippets in search results.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-meta">Custom Meta Tags</Label>
                  <Textarea 
                    id="custom-meta" 
                    placeholder="<meta name='example' content='value'>"
                    rows={4}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add any custom meta tags that aren't covered by the fields above
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => navigate("/admin/landing/edit")}>
              Back to Content Editor
            </Button>
            
            <Button onClick={handleSave} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save SEO Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default LandingSEO;
