
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Video, BookOpen } from "lucide-react";

interface GuidesSectionProps {
  searchQuery: string;
}

const guides = [
  {
    id: 'platform-walkthrough',
    title: 'Platform Walkthrough',
    description: 'A complete tour of all platform features and capabilities',
    icon: GraduationCap,
    type: 'guide'
  },
  {
    id: 'user-management',
    title: 'User Management Tutorial',
    description: 'Learn how to add, edit, and manage users efficiently',
    icon: Video,
    type: 'tutorial'
  },
  {
    id: 'feature-management',
    title: 'Feature Management Guide',
    description: 'Configure and control platform features',
    icon: Video,
    type: 'tutorial'
  },
  {
    id: 'integration-setup',
    title: 'Integration Setup Guide',
    description: 'Connect third-party services to enhance functionality',
    icon: BookOpen,
    type: 'guide'
  },
  {
    id: 'data-export',
    title: 'Data Export & Reporting',
    description: 'Learn how to generate and export reports',
    icon: BookOpen,
    type: 'guide'
  }
];

const GuidesSection = ({ searchQuery }: GuidesSectionProps) => {
  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Getting Started Guides</CardTitle>
        <CardDescription>Step-by-step instructions to help you master the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredGuides.length > 0 ? (
            filteredGuides.map(guide => (
              <div key={guide.id} className="rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <guide.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    {guide.type === 'tutorial' ? 'Watch Tutorial' : 'Read Guide'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No guides found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidesSection;
