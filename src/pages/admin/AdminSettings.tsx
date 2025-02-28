
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
import { useLanguage } from "@/components/LanguageContext";
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
  const { user, isAdmin, isSuperAdmin } = useAuth();
  const { t } = useLanguage();
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
      title: t("notification.success"),
      description: t("settings.save") + ".",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: t("notification.success"),
      description: t("settings.save") + ".",
    });
  };

  const handleSaveEmail = () => {
    toast({
      title: t("notification.success"),
      description: t("settings.save") + ".",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: t("notification.success"),
      description: t("settings.save") + ".",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: t("notification.info"),
      description: "Test email has been sent to " + emailSettings.senderEmail,
    });
  };

  // Only super admins have access to some settings
  const canAccessAllSettings = isSuperAdmin;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out w-full",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64",
        "px-4 md:px-6 lg:px-8"
      )}>
        <Banner
          id="welcome-banner"
          message={`👋 ${t("dashboard.welcome")}, ${user?.name}! ${t("admin.settings")}.`}
          variant="rainbow"
          height="2.5rem"
        />
        
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto py-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{t("admin.settings")}</h1>
                <p className="text-muted-foreground">
                  {t("settings.description") || "Manage your application settings"}
                </p>
              </div>
            </div>
            
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="bg-background border">
                <TabsTrigger value="general" className="data-[state=active]:bg-primary/10">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>{t("settings.general") || "General"}</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-primary/10">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>{t("settings.security")}</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="data-[state=active]:bg-primary/10">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{t("settings.email") || "Email"}</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10">
                  <BellRing className="h-4 w-4 mr-2" />
                  <span>{t("settings.notifications")}</span>
                </TabsTrigger>
              </TabsList>
              
              {/* General Settings */}
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("settings.general") || "General Settings"}</CardTitle>
                    <CardDescription>
                      {t("settings.general.description") || "Basic application settings and information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">{t("settings.siteName") || "Site Name"}</Label>
                        <Input
                          id="siteName"
                          name="siteName"
                          value={generalSettings.siteName}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="siteDescription">{t("settings.siteDescription") || "Site Description"}</Label>
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
                        <Label htmlFor="contactEmail">{t("settings.contactEmail") || "Contact Email"}</Label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={generalSettings.contactEmail}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="supportPhone">{t("settings.supportPhone") || "Support Phone"}</Label>
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
                      {t("button.save")}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Security Settings */}
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("settings.security")}</CardTitle>
                    <CardDescription>
                      {t("settings.security.description") || "Security and authentication settings"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="twoFactorAuth">{t("settings.twoFactorAuth") || "Two-Factor Authentication"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.twoFactorAuth.description") || "Require two-factor authentication for all users"}
                          </p>
                        </div>
                        <Switch
                          id="twoFactorAuth"
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSecurityToggle("twoFactorAuth", checked)}
                          disabled={!canAccessAllSettings}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="passwordExpiry">{t("settings.passwordExpiry") || "Password Expiry (days)"}</Label>
                        <Input
                          id="passwordExpiry"
                          name="passwordExpiry"
                          type="number"
                          value={securitySettings.passwordExpiry}
                          onChange={handleSecuritySettingsChange}
                          disabled={!canAccessAllSettings}
                        />
                        <p className="text-xs text-muted-foreground">
                          {t("settings.passwordExpiry.description") || "Number of days before passwords expire"}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="minPasswordLength">{t("settings.minPasswordLength") || "Minimum Password Length"}</Label>
                        <Input
                          id="minPasswordLength"
                          name="minPasswordLength"
                          type="number"
                          value={securitySettings.minPasswordLength}
                          onChange={handleSecuritySettingsChange}
                          disabled={!canAccessAllSettings}
                        />
                        <p className="text-xs text-muted-foreground">
                          {t("settings.minPasswordLength.description") || "Minimum number of characters for passwords"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">{t("settings.sessionTimeout") || "Session Timeout (minutes)"}</Label>
                        <Input
                          id="sessionTimeout"
                          name="sessionTimeout"
                          type="number"
                          value={securitySettings.sessionTimeout}
                          onChange={handleSecuritySettingsChange}
                          disabled={!canAccessAllSettings}
                        />
                        <p className="text-xs text-muted-foreground">
                          {t("settings.sessionTimeout.description") || "Time before user is automatically logged out"}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="loginAttempts">{t("settings.loginAttempts") || "Maximum Login Attempts"}</Label>
                        <Input
                          id="loginAttempts"
                          name="loginAttempts"
                          type="number"
                          value={securitySettings.loginAttempts}
                          onChange={handleSecuritySettingsChange}
                          disabled={!canAccessAllSettings}
                        />
                        <p className="text-xs text-muted-foreground">
                          {t("settings.loginAttempts.description") || "Number of failed attempts before account is locked"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSecurity} disabled={!canAccessAllSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      {t("button.save")}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Email Settings */}
              <TabsContent value="email" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("settings.email") || "Email Configuration"}</CardTitle>
                    <CardDescription>
                      {t("settings.email.description") || "Configure email server settings"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="smtpServer">{t("settings.smtpServer") || "SMTP Server"}</Label>
                        <Input
                          id="smtpServer"
                          name="smtpServer"
                          value={emailSettings.smtpServer}
                          onChange={handleEmailSettingsChange}
                          disabled={!canAccessAllSettings}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtpPort">{t("settings.smtpPort") || "SMTP Port"}</Label>
                        <Input
                          id="smtpPort"
                          name="smtpPort"
                          value={emailSettings.smtpPort}
                          onChange={handleEmailSettingsChange}
                          disabled={!canAccessAllSettings}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="smtpUsername">{t("settings.smtpUsername") || "SMTP Username"}</Label>
                        <Input
                          id="smtpUsername"
                          name="smtpUsername"
                          value={emailSettings.smtpUsername}
                          onChange={handleEmailSettingsChange}
                          disabled={!canAccessAllSettings}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="smtpPassword">{t("settings.smtpPassword") || "SMTP Password"}</Label>
                        <Input
                          id="smtpPassword"
                          name="smtpPassword"
                          type="password"
                          value={emailSettings.smtpPassword}
                          onChange={handleEmailSettingsChange}
                          disabled={!canAccessAllSettings}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="senderName">{t("settings.senderName") || "Sender Name"}</Label>
                        <Input
                          id="senderName"
                          name="senderName"
                          value={emailSettings.senderName}
                          onChange={handleEmailSettingsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="senderEmail">{t("settings.senderEmail") || "Sender Email"}</Label>
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
                      {t("settings.testEmail") || "Send Test Email"}
                    </Button>
                    <Button onClick={handleSaveEmail} disabled={!canAccessAllSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      {t("button.save")}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("settings.notifications")}</CardTitle>
                    <CardDescription>
                      {t("settings.notifications.description") || "Configure which events trigger admin notifications"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="userRegistration">{t("settings.notifications.userRegistration") || "User Registration"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.notifications.userRegistration.description") || "Notify when a new user registers"}
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
                          <Label htmlFor="userDeletion">{t("settings.notifications.userDeletion") || "User Deletion"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.notifications.userDeletion.description") || "Notify when a user is deleted"}
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
                          <Label htmlFor="paymentReceived">{t("settings.notifications.paymentReceived") || "Payment Received"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.notifications.paymentReceived.description") || "Notify when a payment is successful"}
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
                          <Label htmlFor="paymentFailed">{t("settings.notifications.paymentFailed") || "Payment Failed"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.notifications.paymentFailed.description") || "Notify when a payment fails"}
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
                          <Label htmlFor="systemUpdates">{t("settings.notifications.systemUpdates") || "System Updates"}</Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.notifications.systemUpdates.description") || "Notify about system updates and maintenance"}
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
                      {t("button.save")}
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
