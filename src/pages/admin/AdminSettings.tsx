
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";
import {
  Save,
  Globe,
  Mail,
  Shield,
  FileText,
  BellRing,
  Smartphone,
  Database,
  Search,
} from "lucide-react";

const AdminSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Kolabz",
    siteDescription: "AI Prompt Engineering Platform",
    contactEmail: "support@kolabz.com",
    supportPhone: "+1 (555) 123-4567",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90",
    minPasswordLength: "8",
    sessionTimeout: "30",
    loginAttempts: "5",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@kolabz.com",
    smtpPassword: "••••••••••••",
    senderName: "Kolabz Support",
    senderEmail: "no-reply@kolabz.com",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    userRegistration: true,
    userDeletion: true,
    paymentReceived: true,
    paymentFailed: true,
    systemUpdates: true,
  });

  // Check the sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);

  // Listen for storage events to sync sidebar state across components
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem("adminSidebarCollapsed");
      if (savedState !== null) {
        setSidebarCollapsed(savedState === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Check for changes every second (for same-window updates)
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

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityToggle = (name: string, checked: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (name: string, checked: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveGeneral = () => {
    toast({
      title: "Success",
      description: "General settings saved successfully",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Success",
      description: "Security settings saved successfully",
    });
  };

  const handleSaveEmail = () => {
    toast({
      title: "Success",
      description: "Email settings saved successfully",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Success",
      description: "Notification settings saved successfully",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Email Sent",
      description: "Test email has been sent to " + emailSettings.senderEmail,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <Banner
          id="welcome-banner"
          message={`👋 Welcome back, ${user?.name}! Configure your application settings here.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-6 lg:px-8">
          <div className="grid gap-4 lg:gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Admin Settings</h1>
                <p className="text-muted-foreground">
                  Manage your application settings
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="general" className="space-y-6">
              <div className="bg-background sticky top-16 z-20 pb-4 pt-1">
                <TabsList className="bg-background border flex flex-nowrap overflow-x-auto md:flex-wrap">
                  <TabsTrigger value="general" className="data-[state=active]:bg-primary/10 flex-shrink-0">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>General</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-primary/10 flex-shrink-0">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Security</span>
                  </TabsTrigger>
                  <TabsTrigger value="email" className="data-[state=active]:bg-primary/10 flex-shrink-0">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10 flex-shrink-0">
                    <BellRing className="h-4 w-4 mr-2" />
                    <span>Notifications</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* General Settings */}
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Basic application settings and information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          name="siteName"
                          value={generalSettings.siteName}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="siteDescription">Site Description</Label>
                        <Input
                          id="siteDescription"
                          name="siteDescription"
                          value={generalSettings.siteDescription}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={generalSettings.contactEmail}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="supportPhone">Support Phone</Label>
                        <Input
                          id="supportPhone"
                          name="supportPhone"
                          value={generalSettings.supportPhone}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveGeneral}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Security Settings */}
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Security and authentication settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Require two-factor authentication for all users
                          </p>
                        </div>
                        <Switch
                          id="twoFactorAuth"
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSecurityToggle("twoFactorAuth", checked)}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                        <Input
                          id="passwordExpiry"
                          name="passwordExpiry"
                          type="number"
                          value={securitySettings.passwordExpiry}
                          onChange={handleSecuritySettingsChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Number of days before passwords expire
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                        <Input
                          id="minPasswordLength"
                          name="minPasswordLength"
                          type="number"
                          value={securitySettings.minPasswordLength}
                          onChange={handleSecuritySettingsChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum number of characters for passwords
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          name="sessionTimeout"
                          type="number"
                          value={securitySettings.sessionTimeout}
                          onChange={handleSecuritySettingsChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Time before user is automatically logged out
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="loginAttempts">Maximum Login Attempts</Label>
                        <Input
                          id="loginAttempts"
                          name="loginAttempts"
                          type="number"
                          value={securitySettings.loginAttempts}
                          onChange={handleSecuritySettingsChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Number of failed attempts before account is locked
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSecurity}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Email Settings */}
              <TabsContent value="email" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Configuration</CardTitle>
                    <CardDescription>
                      Configure email server settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="smtpServer">SMTP Server</Label>
                        <Input
                          id="smtpServer"
                          name="smtpServer"
                          value={emailSettings.smtpServer}
                          onChange={handleEmailSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input
                          id="smtpPort"
                          name="smtpPort"
                          value={emailSettings.smtpPort}
                          onChange={handleEmailSettingsChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="smtpUsername">SMTP Username</Label>
                        <Input
                          id="smtpUsername"
                          name="smtpUsername"
                          value={emailSettings.smtpUsername}
                          onChange={handleEmailSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtpPassword">SMTP Password</Label>
                        <Input
                          id="smtpPassword"
                          name="smtpPassword"
                          type="password"
                          value={emailSettings.smtpPassword}
                          onChange={handleEmailSettingsChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="senderName">Sender Name</Label>
                        <Input
                          id="senderName"
                          name="senderName"
                          value={emailSettings.senderName}
                          onChange={handleEmailSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="senderEmail">Sender Email</Label>
                        <Input
                          id="senderEmail"
                          name="senderEmail"
                          type="email"
                          value={emailSettings.senderEmail}
                          onChange={handleEmailSettingsChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
                    <Button variant="outline" onClick={handleTestEmail}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Test Email
                    </Button>
                    <Button onClick={handleSaveEmail}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure which events trigger admin notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="userRegistration">User Registration</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when a new user registers
                          </p>
                        </div>
                        <Switch
                          id="userRegistration"
                          checked={notificationSettings.userRegistration}
                          onCheckedChange={(checked) => handleNotificationToggle("userRegistration", checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="userDeletion">User Deletion</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when a user is deleted
                          </p>
                        </div>
                        <Switch
                          id="userDeletion"
                          checked={notificationSettings.userDeletion}
                          onCheckedChange={(checked) => handleNotificationToggle("userDeletion", checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="paymentReceived">Payment Received</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when a payment is successful
                          </p>
                        </div>
                        <Switch
                          id="paymentReceived"
                          checked={notificationSettings.paymentReceived}
                          onCheckedChange={(checked) => handleNotificationToggle("paymentReceived", checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="paymentFailed">Payment Failed</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when a payment fails
                          </p>
                        </div>
                        <Switch
                          id="paymentFailed"
                          checked={notificationSettings.paymentFailed}
                          onCheckedChange={(checked) => handleNotificationToggle("paymentFailed", checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="systemUpdates">System Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify about system updates and maintenance
                          </p>
                        </div>
                        <Switch
                          id="systemUpdates"
                          checked={notificationSettings.systemUpdates}
                          onCheckedChange={(checked) => handleNotificationToggle("systemUpdates", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveNotifications}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
