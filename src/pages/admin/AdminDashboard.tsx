
import { useState } from "react";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { StatsCard } from "@/components/admin/StatsCard";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { 
  Users, 
  ArrowUpRight, 
  CreditCard, 
  FileText, 
  BadgeHelp, 
  PanelLeft,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";

const userActivity = [
  { date: "Jun 1", value: 24 },
  { date: "Jun 5", value: 28 },
  { date: "Jun 10", value: 32 },
  { date: "Jun 15", value: 38 },
  { date: "Jun 20", value: 42 },
  { date: "Jun 25", value: 45 },
  { date: "Jun 30", value: 48 },
];

const revenueData = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1800 },
  { month: "Mar", value: 2400 },
  { month: "Apr", value: 2000 },
  { month: "May", value: 2800 },
  { month: "Jun", value: 3200 },
];

const recentSignups = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    email: "sarah@example.com", 
    date: "Today, 2:34 PM", 
    plan: "Pro" 
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    email: "michael@example.com", 
    date: "Today, 11:15 AM", 
    plan: "Basic" 
  },
  { 
    id: 3, 
    name: "Emma Wilson", 
    email: "emma@example.com", 
    date: "Yesterday", 
    plan: "Pro" 
  },
  { 
    id: 4, 
    name: "James Rodriguez", 
    email: "james@example.com", 
    date: "Yesterday", 
    plan: "Basic" 
  },
];

const recentTickets = [
  { 
    id: 1, 
    user: "David Brown", 
    subject: "Login issue with new device", 
    date: "Today, 4:23 PM", 
    status: "Open" 
  },
  { 
    id: 2, 
    user: "Lisa Smith", 
    subject: "Subscription renewal problem", 
    date: "Today, 1:45 PM", 
    status: "Open" 
  },
  { 
    id: 3, 
    user: "Robert Johnson", 
    subject: "Feature request: export options", 
    date: "Yesterday", 
    status: "Closed" 
  },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  
  // Check the sidebar collapsed state from localStorage
  useState(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  });
  
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64",
        "px-4 md:px-6 lg:px-8"
      )}>
        <Banner
          id="welcome-banner"
          message={`👋 Welcome back, ${user?.name}! Your users grew by 12% this month.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6">
          <div className="grid gap-4 lg:gap-8">
            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard 
                title="Total Users"
                value="2,851"
                icon={<Users className="h-6 w-6" />}
                trend={{
                  value: 12.5,
                  isPositive: true
                }}
                description="from last month"
              />
              
              <StatsCard 
                title="Active Users"
                value="1,429"
                icon={<ArrowUpRight className="h-6 w-6" />}
                trend={{
                  value: 8.2,
                  isPositive: true
                }}
                description="active now"
              />
              
              <StatsCard 
                title="Total Revenue"
                value="$24,918"
                icon={<CreditCard className="h-6 w-6" />}
                trend={{
                  value: 18.3,
                  isPositive: true
                }}
                description="from last month"
              />
              
              <StatsCard 
                title="Prompt Usage"
                value="84,291"
                icon={<FileText className="h-6 w-6" />}
                trend={{
                  value: 24.5,
                  isPositive: true
                }}
                description="from last month"
              />
            </div>
            
            {/* Charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>Daily active users over time</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userActivity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary) / 0.2)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>Monthly revenue</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Activity section */}
            <div>
              <Tabs defaultValue="signups" className="w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <TabsList className="flex-shrink-0">
                    <TabsTrigger value="signups">Recent Signups</TabsTrigger>
                    <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="signups" className="mt-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent User Signups</CardTitle>
                      <CardDescription>New users who have joined the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left font-medium p-2 pl-0">Name</th>
                              <th className="text-left font-medium p-2">Email</th>
                              <th className="text-left font-medium p-2">Date</th>
                              <th className="text-left font-medium p-2">Plan</th>
                              <th className="text-right font-medium p-2 pr-0">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentSignups.map((user) => (
                              <tr key={user.id} className="border-b">
                                <td className="p-2 pl-0">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.date}</td>
                                <td className="p-2">
                                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    user.plan === "Pro" 
                                      ? "bg-primary/10 text-primary" 
                                      : "bg-muted text-muted-foreground"
                                  }`}>
                                    {user.plan}
                                  </span>
                                </td>
                                <td className="p-2 pr-0 text-right">
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <div className="text-sm text-muted-foreground">
                        Showing <strong>4</strong> of <strong>12</strong> recent signups
                      </div>
                      <Button variant="outline" size="sm">View All Users</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tickets" className="mt-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Support Tickets</CardTitle>
                      <CardDescription>Recent customer support requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left font-medium p-2 pl-0">User</th>
                              <th className="text-left font-medium p-2">Subject</th>
                              <th className="text-left font-medium p-2">Date</th>
                              <th className="text-left font-medium p-2">Status</th>
                              <th className="text-right font-medium p-2 pr-0">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentTickets.map((ticket) => (
                              <tr key={ticket.id} className="border-b">
                                <td className="p-2 pl-0">{ticket.user}</td>
                                <td className="p-2">
                                  <div className="font-medium">{ticket.subject}</div>
                                </td>
                                <td className="p-2">{ticket.date}</td>
                                <td className="p-2">
                                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    ticket.status === "Open" 
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400" 
                                      : "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                                  }`}>
                                    {ticket.status}
                                  </span>
                                </td>
                                <td className="p-2 pr-0 text-right">
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <div className="text-sm text-muted-foreground">
                        Showing <strong>3</strong> of <strong>8</strong> support tickets
                      </div>
                      <Button variant="outline" size="sm">View All Tickets</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    View Transactions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Subscription Plans
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeHelp className="h-5 w-5 text-primary" />
                    Help & Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <BadgeHelp className="h-4 w-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BadgeHelp className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
