
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/admin/StatsCard";
import { Download, Users, ArrowUpRight, Clock, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";

// Chart data
const visitorsData = [
  { date: "Jan", visitors: 1200, pageViews: 3800 },
  { date: "Feb", visitors: 1900, pageViews: 4800 },
  { date: "Mar", visitors: 2400, pageViews: 5800 },
  { date: "Apr", visitors: 1800, pageViews: 4300 },
  { date: "May", visitors: 2800, pageViews: 6800 },
  { date: "Jun", visitors: 3100, pageViews: 7600 },
  { date: "Jul", visitors: 2900, pageViews: 7100 },
];

const conversionData = [
  { name: "Homepage", value: 65 },
  { name: "Features", value: 15 },
  { name: "Pricing", value: 11 },
  { name: "Blog", value: 9 },
];

const sourcesData = [
  { name: "Direct", value: 40 },
  { name: "Organic Search", value: 30 },
  { name: "Social Media", value: 20 },
  { name: "Referral", value: 10 },
];

const deviceData = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 32 },
  { name: "Tablet", value: 10 },
];

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("7days");

  return (
    <AdminLayout
      title="Analytics Dashboard"
      description="Track website performance and user engagement"
      bannerMessage="👋 Welcome to the Analytics Dashboard! Monitor how your platform is performing."
    >
      <div className="flex justify-end mb-4">
        <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="90days">90 Days</TabsTrigger>
            <TabsTrigger value="12months">12 Months</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Visitors"
          value="45,281"
          icon={<Users className="h-5 w-5" />}
          trend={{
            value: 12.5,
            isPositive: true
          }}
          description="from previous period"
        />
        
        <StatsCard
          title="Page Views"
          value="124,635"
          icon={<ArrowUpRight className="h-5 w-5" />}
          trend={{
            value: 8.2,
            isPositive: true
          }}
          description="from previous period"
        />
        
        <StatsCard
          title="Avg. Session"
          value="3m 42s"
          icon={<Clock className="h-5 w-5" />}
          trend={{
            value: 1.8,
            isPositive: false
          }}
          description="from previous period"
        />
        
        <StatsCard
          title="Bounce Rate"
          value="38.4%"
          icon={<MousePointerClick className="h-5 w-5" />}
          trend={{
            value: 3.2,
            isPositive: true
          }}
          description="from previous period"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Visitors & Page Views</CardTitle>
              <CardDescription>Track visitor and page view trends</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="ml-auto mt-2 sm:mt-0">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorsData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0088FE" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00C49F" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#0088FE" 
                    fillOpacity={1} 
                    fill="url(#colorVisitors)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pageViews" 
                    stroke="#00C49F" 
                    fillOpacity={1} 
                    fill="url(#colorPageViews)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Landing Pages</CardTitle>
            <CardDescription>Pages with highest conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Conversion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Visitors by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
