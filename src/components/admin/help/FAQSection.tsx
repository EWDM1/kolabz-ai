
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import RelatedArticles, { RelatedArticle } from "./RelatedArticles";

interface FAQSectionProps {
  searchQuery: string;
}

const faqs = [
  {
    id: 'add-user',
    question: 'How do I add a new user?',
    answer: 'Navigate to User Management in the sidebar, then click the "Add User" button. Fill out the required information and click "Save".',
    relatedArticles: [
      { id: 'user-management', title: 'User Management Guide', type: 'kb', icon: 'kb' },
      { id: 'user-permissions', title: 'Understanding User Permissions', type: 'guide', icon: 'guide' },
      { id: 'bulk-import', title: 'Tip: Use CSV import for multiple users', type: 'faq', icon: 'tip' }
    ]
  },
  {
    id: 'enable-features',
    question: 'How do I enable or disable features?',
    answer: 'Go to Feature Management in the sidebar. Toggle the features you want to enable or disable, then save your changes.',
    relatedArticles: [
      { id: 'feature-management', title: 'Feature Management Guide', type: 'kb', icon: 'kb' },
      { id: 'feature-groups', title: 'Working with Feature Groups', type: 'guide', icon: 'guide' }
    ]
  },
  {
    id: 'stripe-integration',
    question: 'How do I integrate with Stripe?',
    answer: 'Visit the Stripe Integration page and enter your API keys. Make sure to test the integration before going live.',
    relatedArticles: [
      { id: 'integration-guides', title: 'Integration Guides', type: 'kb', icon: 'kb' },
      { id: 'payment-setup', title: 'Setting Up Payment Methods', type: 'guide', icon: 'guide' },
      { id: 'test-payments', title: 'Tip: Always use test mode first', type: 'faq', icon: 'tip' }
    ]
  },
  {
    id: 'user-activity',
    question: 'How to view user activity?',
    answer: 'The Dashboard provides an overview of user activity. For more detailed information, check the Analytics section.',
    relatedArticles: [
      { id: 'analytics', title: 'Understanding Analytics Data', type: 'guide', icon: 'guide' },
      { id: 'dashboard-overview', title: 'Dashboard Overview', type: 'kb', icon: 'kb' }
    ]
  },
  {
    id: 'export-data',
    question: 'Can I export user data?',
    answer: 'Yes, in the User Management page, click the "Export" button to download user data in CSV or JSON format.',
    relatedArticles: [
      { id: 'data-exports', title: 'Data Export Guide', type: 'guide', icon: 'guide' },
      { id: 'csv-formatting', title: 'Understanding CSV Formats', type: 'kb', icon: 'kb' }
    ]
  },
  {
    id: 'reset-password',
    question: 'How do I reset a user\'s password?',
    answer: 'In the User Management page, find the user and click "Edit". You\'ll find a "Reset Password" option in the user editing form.',
    relatedArticles: [
      { id: 'password-policies', title: 'Password Policies', type: 'kb', icon: 'kb' },
      { id: 'user-security', title: 'User Security Best Practices', type: 'guide', icon: 'guide' }
    ]
  },
  {
    id: 'customize-dashboard',
    question: 'How can I customize the dashboard?',
    answer: 'Currently, the dashboard layout is fixed, but you can control which widgets appear by adjusting your feature settings in the Feature Management section.',
    relatedArticles: [
      { id: 'feature-management', title: 'Feature Management Guide', type: 'kb', icon: 'kb' },
      { id: 'dashboard-tips', title: 'Dashboard Customization Tips', type: 'tip', icon: 'tip' }
    ]
  },
  {
    id: 'mobile-app',
    question: 'Is there a mobile app available?',
    answer: 'Currently, we offer a responsive web application that works well on mobile devices. A dedicated mobile app is on our roadmap for future development.',
    relatedArticles: [
      { id: 'roadmap', title: 'Product Roadmap', type: 'kb', icon: 'kb' },
      { id: 'mobile-optimization', title: 'Mobile Optimization Tips', type: 'guide', icon: 'guide' }
    ]
  }
];

const FAQSection = ({ searchQuery }: FAQSectionProps) => {
  const [faqSearchValue, setFaqSearchValue] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  
  // Handle internal FAQ search
  const handleFaqSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaqSearchValue(e.target.value);
  };
  
  // Filter FAQs based on both the parent search and the internal FAQ search
  useEffect(() => {
    const combinedSearch = (searchQuery || faqSearchValue).toLowerCase();
    
    const filtered = faqs.filter(faq => 
      faq.question.toLowerCase().includes(combinedSearch) ||
      faq.answer.toLowerCase().includes(combinedSearch)
    );
    
    setFilteredFaqs(filtered);
  }, [searchQuery, faqSearchValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Find answers to common questions about the platform</CardDescription>
        
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search FAQs..." 
            className="pl-8" 
            value={faqSearchValue}
            onChange={handleFaqSearch}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={faq.id} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <div className="mb-4">{faq.answer}</div>
                  <RelatedArticles articles={faq.relatedArticles as RelatedArticle[]} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No FAQs found matching "{searchQuery || faqSearchValue}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FAQSection;
