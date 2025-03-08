
import { DashboardLayout } from "@/components/admin/dashboard/DashboardLayout";
import { MetricCards } from "@/components/admin/dashboard/MetricCards";
import { UserGrowthChart } from "@/components/admin/dashboard/UserGrowthChart";
import { ActivityChart } from "@/components/admin/dashboard/ActivityChart";
import { RoleDistributionChart } from "@/components/admin/dashboard/RoleDistributionChart";
import { DashboardUserTable } from "@/components/admin/dashboard/DashboardUserTable";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Users, BarChart3, ShoppingCart, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { metrics, loading } = useDashboardMetrics();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-full">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your platform's performance and user metrics
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <MetricCards metrics={metrics} />
            
            <div className="grid gap-4 md:grid-cols-2">
              <UserGrowthChart data={metrics.userGrowth} />
              <ActivityChart data={metrics.activityData} />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <RoleDistributionChart data={metrics.usersByRole} />
              <DashboardUserTable roleData={metrics.usersByRole} />
              
              {/* Admin Quick Actions Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/admin/user-management">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/admin/analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/admin/subscription-management">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Manage Subscriptions
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/admin/integrations-settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure Settings
                    </Link>
                  </Button>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    Access more features in the sidebar navigation
                  </p>
                </CardFooter>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
