
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth: UserGrowthData[];
  usersByRole: RoleData[];
  activityData: ActivityData[];
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    userGrowth: [],
    usersByRole: [],
    activityData: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    metrics,
    loading,
    refreshData: fetchDashboardData
  };
}
