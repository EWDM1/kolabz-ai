
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthContext";
import { Link } from "react-router-dom";
import { BookOpen, CreditCard, HelpCircle, User } from "lucide-react";

const MyDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 py-12">
        <div className="container grid items-start gap-8">
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || "User"}! Manage your account from here.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">My Profile</CardTitle>
                  <CardDescription>Manage your profile settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <User className="h-8 w-8 text-primary" />
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/my-settings">View Settings</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">My Prompts</CardTitle>
                  <CardDescription>Access your saved prompts</CardDescription>
                </CardHeader>
                <CardContent>
                  <BookOpen className="h-8 w-8 text-primary" />
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/my-prompts">View Prompts</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Subscription</CardTitle>
                  <CardDescription>Manage your subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreditCard className="h-8 w-8 text-primary" />
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/manage-subscription">View Plan</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Help &amp; Support</CardTitle>
                  <CardDescription>Get help and support</CardDescription>
                </CardHeader>
                <CardContent>
                  <HelpCircle className="h-8 w-8 text-primary" />
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/help">Get Help</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyDashboard;
