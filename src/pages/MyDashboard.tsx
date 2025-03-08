
import { useAuth } from "@/components/AuthContext";
import SidebarLayout from "@/components/layout/SidebarLayout";
import PromptOptimizerCard from "@/components/dashboard/PromptOptimizerCard";
import AccountOverviewCard from "@/components/dashboard/AccountOverviewCard";

const MyDashboard = () => {
  const { user } = useAuth();
  
  return (
    <SidebarLayout activeMenuItem="dashboard">
      <div className="flex flex-col space-y-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "User"}! Optimize your AI prompts with our tools.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Prompt Optimizer Tool Card */}
          <PromptOptimizerCard />
          
          {/* Account Overview Card */}
          <AccountOverviewCard />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default MyDashboard;
