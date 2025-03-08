import { useState, useEffect } from "react";
import { Banner } from "@/components/ui/banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { UserTable } from "@/components/admin/UserTable";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import { Users, CreditCard, Activity, UserPlus, UserCheck, UserMinus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface UserGrowthData {
  month: string;
  users: number;
}

interface ActivityData {
  day: string;
  logins: number;
  signups: number;
}

interface RoleData {
  name: string;
  value: number;
}

interface MetricsState {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth: UserGrowthData[];
  usersByRole: RoleData[];
  activityData: ActivityData[];
}

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [metrics, setMetrics] = useState<MetricsState>({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    userGrowth: [],
    usersByRole: [],
    activityData: []
  });
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem("adminSidebarCollapsed");
      if (savedState !== null) {
        setSidebarCollapsed(savedState === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    const interval = setInterval(() => {
      const savedState = localStorage.getItem("adminSidebarCollapsed");
      if (savedState !== null && (savedState === "true") !== sidebarCollapsed) {
        setSidebarCollapsed(savedState === "true");
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [sidebarCollapsed]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { count: totalUsers, error: countError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('deleted', false);

      if (countError) throw countError;

      const { count: activeUsers, error: activeError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('deleted', false);

      if (activeError) throw activeError;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: newUsers, error: newError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString())
        .eq('deleted', false);

      if (newError) throw newError;

      const { data: growthData, error: growthError } = await supabase
        .from('users')
        .select('created_at')
        .order('created_at', { ascending: true });

      if (growthError) throw growthError;

      const monthlyGrowth = processGrowthData(growthData || []);

      const roleDistribution: RoleData[] = [
        { name: 'User', value: Math.max((totalUsers || 0) - 5, 0) },
        { name: 'Admin', value: 4 },
        { name: 'Superadmin', value: 1 }
      ];

      const activityData = generateActivityData();

      setMetrics({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        newUsers: newUsers || 0,
        userGrowth: monthlyGrowth,
        usersByRole: roleDistribution,
        activityData
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        variant: "destructive",
        title: "Failed to load dashboard data",
        description: "Please try again later."
      });
    }
  };

  const processGrowthData = (userData: any[]): UserGrowthData[] => {
    const months: Record<string, number> = {};
    
    userData.forEach(user => {
      const date = new Date(user.created_at);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!months[monthYear]) {
        months[monthYear] = 0;
      }
      
      months[monthYear]++;
    });
    
    return Object.entries(months).map(([month, count]) => ({
      month,
      users: count
    }));
  };

  const generateActivityData = (): ActivityData[] => {
    const data: ActivityData[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dayString = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      data.push({
        day: dayString,
        logins: Math.floor(Math.random() * 50) + 10,
        signups: Math.floor(Math.random() * 10) + 1,
      });
    }
    
    return data;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
          message={`👋 Welcome back, ${user?.name}! Here's an overview of your platform.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6">
          <div className="space-y-6 max-w-full">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Overview of your platform's performance and user metrics
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">All users on the platform</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Users with non-deleted accounts</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">New Users (30d)</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.newUsers}</div>
                  <p className="text-xs text-muted-foreground">Users registered in the last 30 days</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.totalUsers ? Math.round((metrics.activeUsers / metrics.totalUsers) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Active users / total users</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={metrics.userGrowth}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12 }} 
                          tickFormatter={(value) => {
                            const [year, month] = value.split('-');
                            return `${month}/${year.slice(2)}`;
                          }}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} Users`, 'Count']}
                          labelFormatter={(label) => {
                            const [year, month] = label.split('-');
                            return `${month}/${year}`;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={metrics.activityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="logins" fill="#8884d8" name="Logins" />
                        <Bar dataKey="signups" fill="#82ca9d" name="Signups" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Users by Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={metrics.usersByRole}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {metrics.usersByRole.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} Users`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserTable 
                    users={metrics.usersByRole.map((role, index) => ({
                      id: `sample-${index}`,
                      name: `Sample User ${index + 1}`,
                      email: `user${index + 1}@example.com`,
                      role: role.name.toLowerCase() as UserRole,
                      status: index % 3 === 0 ? 'inactive' : 'active',
                      lastActive: index % 2 === 0 ? 'Today' : '3 days ago'
                    }))}
                    selectedUsers={selectedUsers} 
                    setSelectedUsers={setSelectedUsers}
                    onEdit={(user) => {
                      toast({
                        title: "Edit User",
                        description: `You selected to edit ${user.name}`,
                      });
                    }}
                    onDelete={(userId) => {
                      toast({
                        title: "Delete User",
                        description: `You selected to delete user ID: ${userId}`,
                      });
                    }}
                  />
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
