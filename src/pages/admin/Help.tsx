
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Info, 
  Search, 
  BookOpen, 
  HelpCircle, 
  ExternalLink, 
  MessageCircleQuestion,
  FileText,
  GraduationCap,
  Lightbulb,
  Video,
  BookText,
  ClipboardList
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const Help = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the support request
    console.log("Support request submitted");
    toast({
      title: "Request Submitted",
      description: "Your support request has been sent. We'll respond within 24 hours.",
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">Knowledge base, guides, and frequently asked questions</p>
        </div>

        <Tabs defaultValue="knowledge" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Find detailed documentation and resources</CardDescription>
                
                <div className="relative mt-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search knowledge base..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Getting Started</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Learn the basics of the platform and set up your account properly.</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
                      Read Guide <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">User Management</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Comprehensive guide on managing users, roles, and permissions.</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
                      Read Guide <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Feature Management</CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Learn how to configure and control platform features.</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
                      Read Guide <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">API Documentation</CardTitle>
                    <BookText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Technical documentation for developers working with our API endpoints.</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
                      View API Docs <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Security Best Practices</CardTitle>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Learn how to keep your data and users secure on our platform.</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
                      Read Guide <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Integration Guides</CardTitle>
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Step-by-step guides for integrating with third-party services.</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
                      View Guides <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guides">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guides</CardTitle>
                <CardDescription>Step-by-step instructions to help you master the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Platform Walkthrough</h3>
                        <p className="text-sm text-muted-foreground">A complete tour of all platform features and capabilities</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">Watch Guide</Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">User Management Tutorial</h3>
                        <p className="text-sm text-muted-foreground">Learn how to add, edit, and manage users efficiently</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">Watch Tutorial</Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Feature Management Guide</h3>
                        <p className="text-sm text-muted-foreground">Configure and control platform features</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">Watch Tutorial</Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Integration Setup Guide</h3>
                        <p className="text-sm text-muted-foreground">Connect third-party services to enhance functionality</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">Read Guide</Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Data Export & Reporting</h3>
                        <p className="text-sm text-muted-foreground">Learn how to generate and export reports</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">Read Guide</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about the platform</CardDescription>
                
                <div className="relative mt-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search FAQs..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I add a new user?</AccordionTrigger>
                    <AccordionContent>
                      Navigate to User Management in the sidebar, then click the "Add User" button. Fill out the required information and click "Save".
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I enable or disable features?</AccordionTrigger>
                    <AccordionContent>
                      Go to Feature Management in the sidebar. Toggle the features you want to enable or disable, then save your changes.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I integrate with Stripe?</AccordionTrigger>
                    <AccordionContent>
                      Visit the Stripe Integration page and enter your API keys. Make sure to test the integration before going live.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How to view user activity?</AccordionTrigger>
                    <AccordionContent>
                      The Dashboard provides an overview of user activity. For more detailed information, check the Analytics section.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I export user data?</AccordionTrigger>
                    <AccordionContent>
                      Yes, in the User Management page, click the "Export" button to download user data in CSV or JSON format.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>How do I reset a user's password?</AccordionTrigger>
                    <AccordionContent>
                      In the User Management page, find the user and click "Edit". You'll find a "Reset Password" option in the user editing form.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger>How can I customize the dashboard?</AccordionTrigger>
                    <AccordionContent>
                      Currently, the dashboard layout is fixed, but you can control which widgets appear by adjusting your feature settings in the Feature Management section.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8">
                    <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                    <AccordionContent>
                      Currently, we offer a responsive web application that works well on mobile devices. A dedicated mobile app is on our roadmap for future development.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Reach out to our team for personalized assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      className="min-h-[120px]"
                      placeholder="Detailed description of your issue or question"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Support response within 24 hours</span>
                    </div>
                    <Button type="submit" className="gap-2">
                      <MessageCircleQuestion className="h-4 w-4" />
                      Submit Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Help;
