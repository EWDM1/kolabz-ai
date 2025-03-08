
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useRedirectForSuperAdmin } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, User, CreditCard, Code, Settings } from 'lucide-react';

const Dashboard = () => {
  // Use the custom hook for redirection logic
  useRedirectForSuperAdmin();
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Regular dashboard content for non-superadmin users
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">User Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/my-settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}!</h2>
          <p className="text-muted-foreground mt-1">Manage your account and access your content.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/my-settings')}
              >
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Prompts</CardTitle>
              <CardDescription>Access your saved prompts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/my-prompts')}
              >
                <Code className="h-4 w-4 mr-2" />
                View Prompts
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Subscription</CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/manage-subscription')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Plan
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Help & Support</CardTitle>
              <CardDescription>Get help with using the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/help')}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                View Help Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
