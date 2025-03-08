
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

const KnowledgeBase = () => {
  return (
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
  );
};

export default KnowledgeBase;
