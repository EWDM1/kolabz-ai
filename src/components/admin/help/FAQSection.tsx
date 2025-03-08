
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
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
  );
};

export default FAQSection;
