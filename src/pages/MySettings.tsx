
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  Mail,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Palette,
  Save,
  CheckCircle,
  Search,
  LayoutDashboard,
  ListChecks,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const MySettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  
  // Form states
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [promptUpdates, setPromptUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Appearance settings
  const [themePreference, setThemePreference] = useState("system");
  const [fontSize, setFontSize] = useState("medium");
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your display preferences have been updated",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleManageSubscription = () => {
    navigate("/manage-subscription");
  };

  return (
    <div className="min-h-screen bg-background/95">
      {/* Dashboard header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => handleNavigation("/")} className="flex items-center">
            {theme === 'dark' ? (
              <img 
                src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            ) : (
              <img 
                src="/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            )}
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8"
              />
            </div>

            <ThemeToggle />

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium hidden md:inline-block">
                John Doe
              </span>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-4 lg:gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-prompts")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <ListChecks className="h-5 w-5" />
                    <span>My Prompts</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-settings")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left bg-primary/10 text-primary font-medium"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>

              <div className="p-4 border-t border-border">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  SUBSCRIPTION
                </h4>
                <div className="bg-muted rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Pro Plan</span>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Next billing on Aug 12, 2023
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs" 
                    onClick={handleManageSubscription}
                  >
                    Manage Subscription
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="flex items-center mb-6">
              <Settings className="h-6 w-6 mr-2 text-primary" />
              <h1 className="text-2xl font-bold">My Settings</h1>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="bg-background border">
                <TabsTrigger value="account" className="data-[state=active]:bg-primary/10">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-primary/10">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-primary/10">
                  <Palette className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="data-[state=active]:bg-primary/10">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Billing</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Account Tab */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account details and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          <User className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <Button variant="outline" className="mb-2">
                            Upload New Picture
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPEG, PNG or GIF, max 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleChangePassword}>
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Two-Factor Authentication</div>
                        <div className="text-xs text-muted-foreground">
                          Receive a verification code to your phone when logging in
                        </div>
                      </div>
                      <Button variant="outline">
                        Enable
                      </Button>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Active Sessions</div>
                        <div className="text-xs text-muted-foreground">
                          Manage devices where you're currently logged in
                        </div>
                      </div>
                      <Button variant="outline">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>
                      Choose what updates you want to receive in your email
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive general notifications via email
                        </div>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Prompt Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified when we add new prompt templates
                        </div>
                      </div>
                      <Switch
                        checked={promptUpdates}
                        onCheckedChange={setPromptUpdates}
                      />
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Security Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about security issues and login attempts
                        </div>
                      </div>
                      <Switch
                        checked={securityAlerts}
                        onCheckedChange={setSecurityAlerts}
                      />
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-muted-foreground">
                          Receive updates about new features and promotional offers
                        </div>
                      </div>
                      <Switch
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveNotifications}>
                      Save Notification Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Display Settings</CardTitle>
                    <CardDescription>
                      Customize the look and feel of your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Button 
                          variant="outline" 
                          className={`flex-col gap-2 h-auto py-4 ${themePreference === 'light' ? 'border-primary bg-primary/10' : ''}`}
                          onClick={() => setThemePreference('light')}
                        >
                          <div className="h-6 w-6 bg-background rounded-full border shadow-sm"></div>
                          <span>Light</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className={`flex-col gap-2 h-auto py-4 ${themePreference === 'dark' ? 'border-primary bg-primary/10' : ''}`}
                          onClick={() => setThemePreference('dark')}
                        >
                          <div className="h-6 w-6 bg-foreground rounded-full border shadow-sm"></div>
                          <span>Dark</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className={`flex-col gap-2 h-auto py-4 ${themePreference === 'system' ? 'border-primary bg-primary/10' : ''}`}
                          onClick={() => setThemePreference('system')}
                        >
                          <div className="h-6 w-6 rounded-full border shadow-sm bg-gradient-to-tr from-foreground to-background"></div>
                          <span>System</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <div className="flex space-x-4">
                        <Button 
                          variant="outline" 
                          className={`${fontSize === 'small' ? 'border-primary bg-primary/10' : ''}`}
                          onClick={() => setFontSize('small')}
                        >
                          Small
                        </Button>
                        <Button 
                          variant="outline" 
                          className={`${fontSize === 'medium' ? 'border-primary bg-primary/10' : ''}`}
                          onClick={() => setFontSize('medium')}
                        >
                          Medium
                        </Button>
                        <Button 
                          variant="outline" 
                          className={`${fontSize === 'large' ? 'border-primary bg-primary/10' : ''}`}
                          onClick={() => setFontSize('large')}
                        >
                          Large
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <div className="flex items-center border rounded-md p-3">
                        <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                        <select className="bg-transparent outline-none w-full appearance-none">
                          <option value="en-US">English (US)</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="ja">Japanese</option>
                        </select>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        This setting is system-wide and will affect all text in the interface
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveAppearance}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Save Appearance Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Billing Tab */}
              <TabsContent value="billing">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Subscription Plan</CardTitle>
                    <CardDescription>
                      Current plan and payment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="text-lg font-medium">Pro Plan</h3>
                          <p className="text-primary font-medium text-lg">$10.00/month</p>
                        </div>
                        <span className="text-sm px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Next billing date: August 12, 2023
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={handleManageSubscription}>
                          Manage Subscription
                        </Button>
                        <Button variant="outline">
                          Change Plan
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      <div className="flex items-center p-3 bg-muted rounded-md border">
                        <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Update Payment Method
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Billing History</h3>
                      <div className="bg-muted rounded-md overflow-hidden">
                        <div className="text-xs text-muted-foreground uppercase border-b px-4 py-2 grid grid-cols-3">
                          <span>Date</span>
                          <span>Amount</span>
                          <span className="text-right">Status</span>
                        </div>
                        <div className="text-sm p-4 grid grid-cols-3 border-b">
                          <span>Jul 12, 2023</span>
                          <span>$10.00</span>
                          <span className="text-right text-green-600 dark:text-green-400">Paid</span>
                        </div>
                        <div className="text-sm p-4 grid grid-cols-3 border-b">
                          <span>Jun 12, 2023</span>
                          <span>$10.00</span>
                          <span className="text-right text-green-600 dark:text-green-400">Paid</span>
                        </div>
                        <div className="text-sm p-4 grid grid-cols-3">
                          <span>May 12, 2023</span>
                          <span>$10.00</span>
                          <span className="text-right text-green-600 dark:text-green-400">Paid</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-2" 
                        variant="outline" 
                        size="sm" 
                        onClick={handleManageSubscription}
                      >
                        View All Invoices
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySettings;
