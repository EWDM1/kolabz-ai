
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  ExternalLink, 
  PlayCircle,
  FileText 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for: "${searchQuery}"`,
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Support request",
      description: "Your message has been sent to our support team.",
    });
  };

  return (
    <AdminLayout
      title="Help & Support"
      description="Find answers and contact our support team"
      bannerMessage="Need help? We're here to assist you with anything you need."
    >
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search for help articles, tutorials, or FAQs..." 
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="absolute right-1 top-1 h-10">
            Search
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              Browse our comprehensive documentation to find detailed guides on how to use all features.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-primary" />
              Video Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              Watch step-by-step video tutorials demonstrating how to use various features.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Watch Tutorials
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Live Chat Support
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              Connect with our support team via live chat for immediate assistance with your questions.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I reset my password?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To reset your password, click on the "Forgot Password" link on the login page. 
                      You'll receive an email with instructions to create a new password.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How do I add a new user to the platform?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Navigate to "User Management" in the admin sidebar, then click on "Add New User." 
                      Fill in the required information and set the appropriate role and permissions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How do I connect to Stripe for payments?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Go to "Stripe Integration" in the admin sidebar. You'll need to enter your Stripe API keys, 
                      which you can find in your Stripe dashboard. Follow the step-by-step instructions to complete the setup.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How do I edit the website content?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      You can edit website content through the "Website" section in the admin sidebar. 
                      Choose "Homepage" to edit the main page or "All Pages" to edit other pages. Use the visual editor for WYSIWYG editing.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How do I optimize my site for search engines?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Go to "SEO Settings" under the "Website" section. Here you can set meta titles, descriptions, 
                      and keywords for each page. You can also manage the sitemap and robots.txt settings.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View All FAQs
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="supportSubject" className="block text-sm font-medium">
                  Subject
                </label>
                <Input id="supportSubject" placeholder="What do you need help with?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="supportMessage" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="supportMessage"
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  placeholder="Describe your issue in detail..."
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleContactSupport}>
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4" />
                <span>Average response time: 2-4 hours</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Help;
