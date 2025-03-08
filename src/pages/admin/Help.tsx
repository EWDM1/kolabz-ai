
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import KnowledgeBase from "@/components/admin/help/KnowledgeBase";
import GuidesSection from "@/components/admin/help/GuidesSection";
import FAQSection from "@/components/admin/help/FAQSection";
import ContactForm from "@/components/admin/help/ContactForm";
import AdminLayout from "@/components/admin/AdminLayout";
import { SearchProvider } from "@/components/admin/help/SearchContext";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("knowledge");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <AdminLayout>
      <SearchProvider>
        <div className="container mx-auto py-6 space-y-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
              <div className="relative w-full md:w-64 lg:w-80">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search help center..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <p className="text-muted-foreground">Knowledge base, guides, and frequently asked questions</p>
          </div>

          <Tabs 
            defaultValue="knowledge" 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="knowledge">
              <KnowledgeBase searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="guides">
              <GuidesSection searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="faq">
              <FAQSection searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="contact">
              <ContactForm />
            </TabsContent>
          </Tabs>
        </div>
      </SearchProvider>
    </AdminLayout>
  );
};

export default Help;
