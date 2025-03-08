
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KnowledgeBase from "@/components/admin/help/KnowledgeBase";
import GuidesSection from "@/components/admin/help/GuidesSection";
import FAQSection from "@/components/admin/help/FAQSection";
import ContactForm from "@/components/admin/help/ContactForm";
import AdminLayout from "@/components/admin/AdminLayout";

const Help = () => {
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
            <KnowledgeBase />
          </TabsContent>
          
          <TabsContent value="guides">
            <GuidesSection />
          </TabsContent>
          
          <TabsContent value="faq">
            <FAQSection />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactForm />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Help;
