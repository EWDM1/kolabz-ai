
import { useState } from "react";
import { Banner } from "@/components/ui/banner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { StatsCard } from "@/components/admin/StatsCard";
import { 
  Users, 
  DollarSign, 
  CreditCard, 
  Activity,
  ArrowUpRight, 
  ArrowDownRight,
  UserRoundPlus, 
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Mock data for demonstration
  const recentUsers = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", date: "2 hours ago" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", date: "1 day ago" },
    { id: "3", name: "Carol Williams", email: "carol@example.com", date: "2 days ago" },
  ];

  const recentActivity = [
    { id: "1", action: "New signup", user: "David Brown", date: "Just now" },
    { id: "2", action: "Discount code used", user: "Eva Garcia", date: "3 hours ago" },
    { id: "3", action: "Blog post published", user: "Frank Miller", date: "Yesterday" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Banner
          id="welcome-banner"
          message={`👋 Welcome back, ${user?.name}! Here's what's happening with your platform today.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of your platform's performance and activity
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Users"
                value="2,532"
                description="From all channels"
                icon={<Users className="h-5 w-5" />}
                trend={{ value: 12, isPositive: true }}
              />
              
              <StatsCard
                title="Revenue"
                value="$45,231.89"
                description="Last 30 days"
                icon={<DollarSign className="h-5 w-5" />}
                trend={{ value: 8, isPositive: true }}
              />
              
              <StatsCard
                title="Subscriptions"
                value="1,832"
                description="Active subscriptions"
                icon={<CreditCard className="h-5 w-5" />}
                trend={{ value: 3, isPositive: false }}
              />
              
              <StatsCard
                title="Active Now"
                value="42"
                description="Users currently online"
                icon={<Activity className="h-5 w-5" />}
              />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest actions across your platform
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-4 rounded-md border p-3"
                      >
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.user} • {activity.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>
                      New user registrations
                    </CardDescription>
                  </div>
                  <Link to="/admin/users/new">
                    <Button variant="outline" size="sm">
                      <UserRoundPlus className="mr-2 h-4 w-4" />
                      Add New
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-4 rounded-md border p-3"
                      >
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email} • {user.date}
                          </p>
                        </div>
                        <Link to={`/admin/users/${user.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
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
