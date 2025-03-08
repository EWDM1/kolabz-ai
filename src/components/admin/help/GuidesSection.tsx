
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Video, BookOpen } from "lucide-react";

const GuidesSection = () => {
  return (
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
  );
};

export default GuidesSection;
