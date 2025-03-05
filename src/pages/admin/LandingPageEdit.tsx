
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Edit, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const LandingPageEdit = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Changes saved",
        description: "Your landing page content has been updated"
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col w-full">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4">
          <div className="flex items-center mb-6 gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-xl font-semibold">Edit Landing Page</h1>
            
            <div className="ml-auto">
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate("/admin/landing/editor")}
                className="gap-1"
              >
                <Pencil className="h-4 w-4" />
                Open Visual Editor
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Editor</CardTitle>
                  <CardDescription>
                    Make changes to your landing page content
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="hero">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="hero">Hero Section</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="cta">Call to Action</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="hero" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="hero-heading">Main Headline</Label>
                        <Input id="hero-heading" defaultValue="Welcome to Our Platform" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="hero-subheading">Subheading</Label>
                        <Input id="hero-subheading" defaultValue="The best solution for your business needs" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="hero-button-text">Button Text</Label>
                          <Input id="hero-button-text" defaultValue="Get Started" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="hero-button-link">Button Link</Label>
                          <Input id="hero-button-link" defaultValue="/signup" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="hero-image">Hero Image URL</Label>
                        <Input id="hero-image" defaultValue="/placeholder.svg" />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="features" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="features-heading">Section Heading</Label>
                        <Input id="features-heading" defaultValue="Our Features" />
                      </div>
                      
                      <div className="border rounded-md p-4 space-y-3">
                        <Label>Feature 1</Label>
                        <div className="space-y-2">
                          <Input defaultValue="Easy to Use" placeholder="Feature title" />
                          <Input defaultValue="Simple interface that anyone can use" placeholder="Feature description" />
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4 space-y-3">
                        <Label>Feature 2</Label>
                        <div className="space-y-2">
                          <Input defaultValue="Powerful Tools" placeholder="Feature title" />
                          <Input defaultValue="Advanced tools for professional results" placeholder="Feature description" />
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4 space-y-3">
                        <Label>Feature 3</Label>
                        <div className="space-y-2">
                          <Input defaultValue="24/7 Support" placeholder="Feature title" />
                          <Input defaultValue="We're always here to help you" placeholder="Feature description" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cta" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cta-heading">CTA Heading</Label>
                        <Input id="cta-heading" defaultValue="Ready to get started?" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cta-text">CTA Text</Label>
                        <Input id="cta-text" defaultValue="Join thousands of satisfied customers today." />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cta-button-text">Button Text</Label>
                          <Input id="cta-button-text" defaultValue="Sign Up Now" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cta-button-link">Button Link</Label>
                          <Input id="cta-button-link" defaultValue="/signup" />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/")}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Site
                </Button>
                
                <Button onClick={handleSave} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Page Settings</CardTitle>
                  <CardDescription>
                    Configure landing page settings
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="page-title">Page Title</Label>
                    <Input id="page-title" defaultValue="Homepage" />
                    <p className="text-xs text-muted-foreground">
                      For internal reference
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="page-slug">URL Slug</Label>
                    <Input id="page-slug" defaultValue="/" disabled />
                    <p className="text-xs text-muted-foreground">
                      This is your homepage URL
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <h4 className="font-medium">Advanced Editor</h4>
                      <p className="text-xs text-muted-foreground">
                        Use the visual page builder
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate("/admin/landing/editor")}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Open Editor
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>
                    Optimize for search engines
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input id="meta-title" defaultValue="Kolabz | AI Tools for Business" />
                    <p className="text-xs text-muted-foreground">
                      50-60 characters recommended
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Input id="meta-description" defaultValue="Powerful AI tools to boost your business productivity and efficiency. Try Kolabz today." />
                    <p className="text-xs text-muted-foreground">
                      150-160 characters recommended
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="og-image">Social Image URL</Label>
                    <Input id="og-image" defaultValue="/og-image.png" />
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 1200×630px
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPageEdit;
