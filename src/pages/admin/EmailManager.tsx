
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
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Mail, 
  Send, 
  Users, 
  List, 
  Clock, 
  Copy, 
  Eye, 
  Edit, 
  CheckCircle,
  XCircle,
  Play,
  Pause,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock email templates
const emailTemplates = [
  { 
    id: 1, 
    name: "Welcome Email", 
    subject: "Welcome to Kolabz! 🚀", 
    status: "active", 
    lastEdited: "2023-05-15" 
  },
  { 
    id: 2, 
    name: "Password Reset", 
    subject: "Reset Your Password", 
    status: "active", 
    lastEdited: "2023-06-22" 
  },
  { 
    id: 3, 
    name: "Subscription Confirmation", 
    subject: "Your Subscription is Active", 
    status: "active", 
    lastEdited: "2023-07-10" 
  },
  { 
    id: 4, 
    name: "Monthly Newsletter", 
    subject: "This Month at Kolabz: New Features", 
    status: "draft", 
    lastEdited: "2023-08-01" 
  },
  { 
    id: 5, 
    name: "Trial Expiring Soon", 
    subject: "Your Trial is Ending Soon", 
    status: "active", 
    lastEdited: "2023-08-05" 
  },
];

// Mock campaigns
const campaigns = [
  { 
    id: 1, 
    name: "August Newsletter", 
    template: "Monthly Newsletter", 
    audience: "All Users", 
    status: "scheduled", 
    date: "2023-08-15", 
    stats: { sent: 0, opened: 0, clicked: 0 } 
  },
  { 
    id: 2, 
    name: "New Feature Announcement", 
    template: "Product Update", 
    audience: "Pro Users", 
    status: "sent", 
    date: "2023-07-28", 
    stats: { sent: 1248, opened: 845, clicked: 356 } 
  },
  { 
    id: 3, 
    name: "Summer Promotion", 
    template: "Promotional Email", 
    audience: "Free Users", 
    status: "sent", 
    date: "2023-07-15", 
    stats: { sent: 2150, opened: 1423, clicked: 687 } 
  },
  { 
    id: 4, 
    name: "Product Update: AI Enhancements", 
    template: "Product Update", 
    audience: "All Users", 
    status: "draft", 
    date: "-", 
    stats: { sent: 0, opened: 0, clicked: 0 } 
  },
];

// Mock audiences
const audiences = [
  { id: 1, name: "All Users", count: 3578, description: "All registered users" },
  { id: 2, name: "Pro Users", count: 1248, description: "Users with Pro subscription" },
  { id: 3, name: "Team Users", count: 453, description: "Users with Team subscription" },
  { id: 4, name: "Free Users", count: 1877, description: "Users on free plan" },
  { id: 5, name: "Inactive Users", count: 842, description: "Users inactive for 30+ days" },
];

const EmailManager = () => {
  const [activeTab, setActiveTab] = useState("templates");

  const handleNewCampaign = () => {
    toast({
      title: "New Campaign",
      description: "Starting a new email campaign",
    });
  };

  const handleNewTemplate = () => {
    toast({
      title: "New Template",
      description: "Create a new email template",
    });
  };

  return (
    <AdminLayout
      title="Email Communications"
      description="Manage email templates, campaigns, and audiences"
      bannerMessage="💌 Email Manager: Create and send targeted email campaigns to your users."
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <TabsList className="flex-shrink-0">
            <TabsTrigger value="templates" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center">
              <Send className="h-4 w-4 mr-2" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="audiences" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Audiences
            </TabsTrigger>
          </TabsList>
          
          <div>
            {activeTab === "templates" && (
              <Button onClick={handleNewTemplate}>
                <Mail className="h-4 w-4 mr-2" />
                New Template
              </Button>
            )}
            {activeTab === "campaigns" && (
              <Button onClick={handleNewCampaign}>
                <Send className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            )}
          </div>
        </div>
        
        {/* Email Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Manage reusable email templates for your communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Subject Line</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Edited</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.subject}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            template.status === "active" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}>
                            {template.status === "active" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {template.status === "active" ? "Active" : "Draft"}
                          </span>
                        </TableCell>
                        <TableCell>{template.lastEdited}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Preview</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Duplicate</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Campaigns */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>
                Create and manage email campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">
                          {campaign.name}
                        </TableCell>
                        <TableCell>{campaign.template}</TableCell>
                        <TableCell>{campaign.audience}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            campaign.status === "sent" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                              : campaign.status === "scheduled"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}>
                            {campaign.status === "sent" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : campaign.status === "scheduled" ? (
                              <Clock className="h-3 w-3 mr-1" />
                            ) : (
                              <Edit className="h-3 w-3 mr-1" />
                            )}
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{campaign.date}</TableCell>
                        <TableCell>
                          {campaign.stats.sent > 0 ? (
                            <div className="text-xs">
                              <div className="flex justify-between">
                                <span>Sent:</span>
                                <span className="font-semibold">{campaign.stats.sent}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Opened:</span>
                                <span className="font-semibold">{campaign.stats.opened} ({Math.round(campaign.stats.opened/campaign.stats.sent * 100)}%)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Clicked:</span>
                                <span className="font-semibold">{campaign.stats.clicked} ({Math.round(campaign.stats.clicked/campaign.stats.sent * 100)}%)</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">No data</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            {campaign.status === "scheduled" ? (
                              <Button variant="ghost" size="icon">
                                <Pause className="h-4 w-4" />
                                <span className="sr-only">Pause</span>
                              </Button>
                            ) : campaign.status === "draft" ? (
                              <Button variant="ghost" size="icon">
                                <Play className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon">
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Duplicate</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audiences */}
        <TabsContent value="audiences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>
                Manage user segments for targeted campaigns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Segment Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Number of Users</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {audiences.map((audience) => (
                      <TableRow key={audience.id}>
                        <TableCell className="font-medium">{audience.name}</TableCell>
                        <TableCell>{audience.description}</TableCell>
                        <TableCell>{audience.count.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <List className="h-4 w-4" />
                              <span className="sr-only">View Users</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Send className="h-4 w-4" />
                              <span className="sr-only">Send Email</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Create New Audience</CardTitle>
                  <CardDescription>
                    Define a new user segment based on specific criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="audienceName">Audience Name</Label>
                        <Input id="audienceName" placeholder="e.g., Active Pro Users" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="audienceDescription">Description</Label>
                        <Input id="audienceDescription" placeholder="Brief description of this audience" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Selection Criteria</Label>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 items-center">
                          <Select defaultValue="subscription">
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="subscription">Subscription</SelectItem>
                              <SelectItem value="activity">Last Active</SelectItem>
                              <SelectItem value="signup">Signup Date</SelectItem>
                              <SelectItem value="location">Location</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select defaultValue="is">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="is">is</SelectItem>
                              <SelectItem value="isNot">is not</SelectItem>
                              <SelectItem value="contains">contains</SelectItem>
                              <SelectItem value="before">before</SelectItem>
                              <SelectItem value="after">after</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select defaultValue="pro">
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Value" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="pro">Pro</SelectItem>
                              <SelectItem value="team">Team</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="ghost" size="icon">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center">
                          <Select defaultValue="activity">
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="subscription">Subscription</SelectItem>
                              <SelectItem value="activity">Last Active</SelectItem>
                              <SelectItem value="signup">Signup Date</SelectItem>
                              <SelectItem value="location">Location</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select defaultValue="after">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="is">is</SelectItem>
                              <SelectItem value="isNot">is not</SelectItem>
                              <SelectItem value="contains">contains</SelectItem>
                              <SelectItem value="before">before</SelectItem>
                              <SelectItem value="after">after</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select defaultValue="30days">
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Value" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7days">Last 7 days</SelectItem>
                              <SelectItem value="30days">Last 30 days</SelectItem>
                              <SelectItem value="90days">Last 90 days</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="ghost" size="icon">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button variant="outline" size="sm" className="mt-2">
                          + Add Criterion
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Create Audience</Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default EmailManager;
