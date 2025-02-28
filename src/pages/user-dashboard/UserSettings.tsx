
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Settings as SettingsIcon,
  LogOut,
  User,
  Shield,
  Globe,
  Bell,
  Moon,
  Sun,
  Palette,
  Lock,
  Mail,
  CreditCard,
  UserCircle,
  SaveIcon,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const UserSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("account");
  
  // Form states
  const [fullName, setFullName] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("john.doe@example.com");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [promptUpdates, setPromptUpdates] = useState<boolean>(true);
  const [securityAlerts, setSecurityAlerts] = useState<boolean>(true);
  const [marketingEmails, setMarketingEmails] = useState<boolean>(false);
  
  // Appearance settings
  const [theme, setTheme] = useState<string>("system");
  const [fontSize, setFontSize] = useState<string>("medium");
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your display preferences have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-[#080c16] text-white">
      {/* Dashboard header */}
      <header className="border-b border-gray-800 bg-[#0a101e]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/df8a7871-32f3-4d83-826c-be5a1d06f2f1.png" 
              alt="Kolabz Logo" 
              className="h-8" 
            />
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm font-medium hidden md:inline-block text-gray-300">
                John Doe
              </span>
              <div className="h-8 w-8 rounded-full bg-gray-700 text-gray-200 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Sidebar */}
        <div className="w-64 min-h-full bg-[#0a101e] border-r border-gray-800 flex-shrink-0 hidden md:block">
          <div className="py-6 px-4">
            <nav className="space-y-1">
              <Link
                to="/user-dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/user-prompts"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <ListChecks className="h-5 w-5" />
                <span>My Prompts</span>
              </Link>
              <Link
                to="/user-settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-md bg-blue-600 text-white w-full"
              >
                <SettingsIcon className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          <div className="px-4 pt-6 pb-8 border-t border-gray-800">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
              SUBSCRIPTION
            </h4>
            <div className="bg-[#131c2e] rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pro Plan</span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-xs text-gray-400 mb-3">
                Next billing on Aug 12, 2023
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs bg-[#1a2235] border-gray-700 text-gray-300 hover:bg-[#252e3f]" 
                asChild
              >
                <Link to="/user-subscription">Manage Subscription</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-[#080c16]">
          <div className="container mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                <SettingsIcon className="mr-2 h-6 w-6 text-blue-400" />
                Settings
              </h1>
              <p className="text-gray-400">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="account" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList className="bg-[#0a101e] border border-gray-800 p-1">
                <TabsTrigger 
                  value="account" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <UserCircle className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="billing" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </TabsTrigger>
              </TabsList>
              
              {/* Account Tab */}
              <TabsContent value="account">
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-gray-400">
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
                        className="bg-[#131c2e] border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#131c2e] border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-gray-700 text-gray-200 flex items-center justify-center overflow-hidden">
                          <User className="h-8 w-8" />
                        </div>
                        <div>
                          <Button variant="outline" className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235] mb-2">
                            Upload New Picture
                          </Button>
                          <p className="text-xs text-gray-400">
                            JPEG, PNG or GIF, max 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile}>
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security">
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Password</CardTitle>
                    <CardDescription className="text-gray-400">
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
                        className="bg-[#131c2e] border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-[#131c2e] border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-[#131c2e] border-gray-700 text-white"
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

                <Card className="bg-[#0a101e] border-gray-800 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
                    <CardDescription className="text-gray-400">
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Two-Factor Authentication</div>
                        <div className="text-xs text-gray-400">
                          Receive a verification code to your phone when logging in
                        </div>
                      </div>
                      <Button variant="outline" className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]">
                        Enable
                      </Button>
                    </div>
                    <Separator className="bg-gray-800 my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Active Sessions</div>
                        <div className="text-xs text-gray-400">
                          Manage devices where you're currently logged in
                        </div>
                      </div>
                      <Button variant="outline" className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Email Notifications</CardTitle>
                    <CardDescription className="text-gray-400">
                      Choose what updates you want to receive in your email
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-400">
                          Receive general notifications via email
                        </div>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <Separator className="bg-gray-800 my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Prompt Updates</div>
                        <div className="text-sm text-gray-400">
                          Get notified when we add new prompt templates
                        </div>
                      </div>
                      <Switch
                        checked={promptUpdates}
                        onCheckedChange={setPromptUpdates}
                      />
                    </div>
                    <Separator className="bg-gray-800 my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Security Alerts</div>
                        <div className="text-sm text-gray-400">
                          Get notified about security issues and login attempts
                        </div>
                      </div>
                      <Switch
                        checked={securityAlerts}
                        onCheckedChange={setSecurityAlerts}
                      />
                    </div>
                    <Separator className="bg-gray-800 my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-gray-400">
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
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Display Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Customize the look and feel of your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Button 
                          variant="outline" 
                          className={`flex-col gap-2 h-auto py-4 ${theme === 'light' ? 'border-blue-500 bg-blue-500/10' : 'bg-[#131c2e] border-gray-700'}`}
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="h-6 w-6 mb-2" />
                          <span>Light</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className={`flex-col gap-2 h-auto py-4 ${theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : 'bg-[#131c2e] border-gray-700'}`}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="h-6 w-6 mb-2" />
                          <span>Dark</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className={`flex-col gap-2 h-auto py-4 ${theme === 'system' ? 'border-blue-500 bg-blue-500/10' : 'bg-[#131c2e] border-gray-700'}`}
                          onClick={() => setTheme('system')}
                        >
                          <div className="h-6 w-6 relative mb-2">
                            <Sun className="h-5 w-5 absolute left-0 top-0" />
                            <Moon className="h-5 w-5 absolute right-0 bottom-0" />
                          </div>
                          <span>System</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <div className="flex space-x-4">
                        <Button 
                          variant="outline" 
                          className={`${fontSize === 'small' ? 'border-blue-500 bg-blue-500/10' : 'bg-[#131c2e] border-gray-700'}`}
                          onClick={() => setFontSize('small')}
                        >
                          Small
                        </Button>
                        <Button 
                          variant="outline" 
                          className={`${fontSize === 'medium' ? 'border-blue-500 bg-blue-500/10' : 'bg-[#131c2e] border-gray-700'}`}
                          onClick={() => setFontSize('medium')}
                        >
                          Medium
                        </Button>
                        <Button 
                          variant="outline" 
                          className={`${fontSize === 'large' ? 'border-blue-500 bg-blue-500/10' : 'bg-[#131c2e] border-gray-700'}`}
                          onClick={() => setFontSize('large')}
                        >
                          Large
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <div className="flex items-center bg-[#131c2e] border border-gray-700 rounded-md p-3">
                        <Globe className="h-5 w-5 mr-3 text-gray-400" />
                        <select className="bg-transparent text-white border-none outline-none w-full appearance-none">
                          <option value="en-US">English (US)</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="ja">Japanese</option>
                        </select>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
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
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Subscription Plan</CardTitle>
                    <CardDescription className="text-gray-400">
                      Current plan and payment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-[#131c2e] rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="text-lg font-medium text-white">Pro Plan</h3>
                          <p className="text-blue-400 font-medium text-lg">$10.00/month</p>
                        </div>
                        <span className="text-sm px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">
                        Next billing date: August 12, 2023
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" className="bg-[#1a2235] border-gray-700 text-gray-300 hover:bg-[#252e3f]" asChild>
                          <Link to="/user-subscription">Manage Subscription</Link>
                        </Button>
                        <Button variant="outline" className="bg-[#1a2235] border-gray-700 text-gray-300 hover:bg-[#252e3f]" asChild>
                          <Link to="/user-change-plan">Change Plan</Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      <div className="flex items-center p-3 bg-[#131c2e] rounded-md border border-gray-700">
                        <CreditCard className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-gray-400">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]">
                        Update Payment Method
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Billing History</h3>
                      <div className="bg-[#131c2e] rounded-md overflow-hidden">
                        <div className="text-xs text-gray-400 uppercase border-b border-gray-700 px-4 py-2 grid grid-cols-3">
                          <span>Date</span>
                          <span>Amount</span>
                          <span className="text-right">Status</span>
                        </div>
                        <div className="text-sm p-4 grid grid-cols-3 border-b border-gray-700">
                          <span>Jul 12, 2023</span>
                          <span>$10.00</span>
                          <span className="text-right text-green-400">Paid</span>
                        </div>
                        <div className="text-sm p-4 grid grid-cols-3 border-b border-gray-700">
                          <span>Jun 12, 2023</span>
                          <span>$10.00</span>
                          <span className="text-right text-green-400">Paid</span>
                        </div>
                        <div className="text-sm p-4 grid grid-cols-3">
                          <span>May 12, 2023</span>
                          <span>$10.00</span>
                          <span className="text-right text-green-400">Paid</span>
                        </div>
                      </div>
                      <Button className="w-full mt-2" variant="outline" size="sm" asChild>
                        <Link to="/user-subscription">View All Invoices</Link>
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

export default UserSettings;
