
import { DashboardLayout } from "@/components/admin/dashboard/DashboardLayout";
import { MetricCards } from "@/components/admin/dashboard/MetricCards";
import { UserGrowthChart } from "@/components/admin/dashboard/UserGrowthChart";
import { ActivityChart } from "@/components/admin/dashboard/ActivityChart";
import { RoleDistributionChart } from "@/components/admin/dashboard/RoleDistributionChart";
import { DashboardUserTable } from "@/components/admin/dashboard/DashboardUserTable";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";

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
            
            <div className="grid gap-4 md:grid-cols-2">
              <RoleDistributionChart data={metrics.usersByRole} />
              <DashboardUserTable roleData={metrics.usersByRole} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
