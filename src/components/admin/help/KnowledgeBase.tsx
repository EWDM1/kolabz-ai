
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  ClipboardList, 
  BookText, 
  Info, 
  Lightbulb,
  ExternalLink 
} from "lucide-react";

interface KnowledgeBaseProps {
  searchQuery: string;
}

const knowledgeItems = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of the platform and set up your account properly.',
    icon: BookOpen
  },
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Comprehensive guide on managing users, roles, and permissions.',
    icon: FileText
  },
  {
    id: 'feature-management',
    title: 'Feature Management',
    description: 'Learn how to configure and control platform features.',
    icon: ClipboardList
  },
  {
    id: 'api-documentation',
    title: 'API Documentation',
    description: 'Technical documentation for developers working with our API endpoints.',
    icon: BookText
  },
  {
    id: 'security-best-practices',
    title: 'Security Best Practices',
    description: 'Learn how to keep your data and users secure on our platform.',
    icon: Info
  },
  {
    id: 'integration-guides',
    title: 'Integration Guides',
    description: 'Step-by-step guides for integrating with third-party services.',
    icon: Lightbulb
  }
];

const KnowledgeBase = ({ searchQuery }: KnowledgeBaseProps) => {
  const filteredItems = knowledgeItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription>Find detailed documentation and resources</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full gap-1.5">
                  Read Guide <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No knowledge base articles found matching "{searchQuery}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KnowledgeBase;
