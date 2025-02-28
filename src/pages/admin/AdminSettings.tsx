import { useState } from "react";
import { 
  Settings, 
  Server, 
  Shield, 
  Database, 
  Mail, 
  Globe, 
  Lock, 
  FileText, 
  RefreshCw, 
  AlertTriangle,
  Terminal,
  Info,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    enableRegistrations: true,
    maxFileUploadSize: 5,
    sessionTimeout: 60,
    autoBackup: true,
    apiRateLimit: 100
  });
  
  // Email settings state
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    fromEmail: "noreply@example.com",
    enableSsl: true,
    testEmailRecipient: ""
  });
  
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    minPasswordLength: 8,
    requirePasswordComplexity: true,
    mfaRequired: false,
    sessionLength: 24,
    loginAttempts: 5,
    autoLockoutDuration: 15,
    autoLogout: true
  });

  // Backup settings state
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionDays: 30,
    includeUploads: true,
    backupLocation: "cloud"
  });

  // Update system settings
  const handleSystemSettingChange = (setting: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Update email settings
  const handleEmailSettingChange = (setting: string, value: any) => {
    setEmailSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Update security settings
  const handleSecuritySettingChange = (setting: string, value: any) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Update backup settings
  const handleBackupSettingChange = (setting: string, value: any) => {
    setBackupSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Save system settings
  const handleSaveSystemSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "System settings saved",
        description: "Your changes have been applied successfully."
      });
      setLoading(false);
    }, 800);
  };

  // Save email settings
  const handleSaveEmailSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Email settings saved",
        description: "SMTP configuration has been updated."
      });
      setLoading(false);
    }, 800);
  };

  // Save security settings
  const handleSaveSecuritySettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Security settings saved",
        description: "Security policies have been updated."
      });
      setLoading(false);
    }, 800);
  };

  // Save backup settings
  const handleSaveBackupSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Backup settings saved",
        description: "Backup configuration has been updated."
      });
      setLoading(false);
    }, 800);
  };

  // Send test email
  const handleSendTestEmail = () => {
    if (!emailSettings.testEmailRecipient) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter a recipient email address."
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Test email sent",
        description: `Email sent to ${emailSettings.testEmailRecipient}`
      });
      setLoading(false);
    }, 1200);
  };

  // Trigger manual backup
  const handleManualBackup = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Backup initiated",
        description: "System backup has started. This may take a few minutes."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="container mx-auto py-8 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Settings className="h-8 w-8 text-primary" />
              System Administration
            </h1>
            <p className="text-muted-foreground">
              Configure system settings, security policies, and maintenance options
            </p>
          </div>
          
          <Tabs defaultValue="system" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                <span className="hidden md:inline">System</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden md:inline">Email</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden md:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="backups" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="hidden md:inline">Backups</span>
              </TabsTrigger>
            </TabsList>
            
            {/* System Settings Tab */}
            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General System Settings</CardTitle>
                  <CardDescription>
                    Configure core system parameters and operation modes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenanceMode" className="text-amber-600 font-medium">
                          Maintenance Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          When enabled, only administrators can access the system
                        </p>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => handleSystemSettingChange("maintenanceMode", checked)}
                      />
                    </div>
                    
                    {systemSettings.maintenanceMode && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 p-4 rounded-lg mt-2">
                        <div className="flex gap-2 text-amber-800 dark:text-amber-400">
                          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Warning: Maintenance Mode Enabled</p>
                            <p className="text-sm mt-1">
                              While maintenance mode is active, regular users cannot access the system.
                              Only administrators can log in. Don't forget to disable this when maintenance is complete.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableRegistrations">User Registration</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow new users to register accounts
                        </p>
                      </div>
                      <Switch
                        id="enableRegistrations"
                        checked={systemSettings.enableRegistrations}
                        onCheckedChange={(checked) => handleSystemSettingChange("enableRegistrations", checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="debugMode">Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable detailed logging and error reporting
                        </p>
                      </div>
                      <Switch
                        id="debugMode"
                        checked={systemSettings.debugMode}
                        onCheckedChange={(checked) => handleSystemSettingChange("debugMode", checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="maxFileUploadSize">Max File Upload Size (MB)</Label>
                        <Input
                          id="maxFileUploadSize"
                          type="number"
                          min="1"
                          max="100"
                          value={systemSettings.maxFileUploadSize}
                          onChange={(e) => handleSystemSettingChange("maxFileUploadSize", parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          min="5"
                          max="240"
                          value={systemSettings.sessionTimeout}
                          onChange={(e) => handleSystemSettingChange("sessionTimeout", parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="apiRateLimit">API Rate Limit (requests per minute)</Label>
                      <Input
                        id="apiRateLimit"
                        type="number"
                        min="10"
                        max="1000"
                        value={systemSettings.apiRateLimit}
                        onChange={(e) => handleSystemSettingChange("apiRateLimit", parseInt(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum number of API requests allowed per user per minute
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Reset to defaults</Button>
                  <Button onClick={handleSaveSystemSettings} disabled={loading}>
                    {loading ? "Saving..." : "Save system settings"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                  <CardDescription>
                    Current system status and version information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">System Version</div>
                      <div>v1.5.0 (Build 2023-10-15)</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                      <div>October 15, 2023 - 14:30 UTC</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Database Status</div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Connected (PostgreSQL 14.5)
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Storage Usage</div>
                      <div>254.3 GB / 500 GB (50.9%)</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Active Users</div>
                      <div>125 (Last 24 hours)</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Server Environment</div>
                      <div>Production</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh System Information
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>
                    Perform system maintenance tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full flex justify-center py-6">
                      <div className="text-center">
                        <Database className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">Clear Cache</div>
                        <div className="text-xs text-muted-foreground mt-1">Flush all temporary data</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="w-full flex justify-center py-6">
                      <div className="text-center">
                        <FileText className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">System Logs</div>
                        <div className="text-xs text-muted-foreground mt-1">View detailed logs</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="w-full flex justify-center py-6">
                      <div className="text-center">
                        <Terminal className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">Run Diagnostics</div>
                        <div className="text-xs text-muted-foreground mt-1">Check system health</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="w-full flex justify-center py-6">
                      <div className="text-center">
                        <Users className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">User Sessions</div>
                        <div className="text-xs text-muted-foreground mt-1">Manage active sessions</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Email Settings Tab */}
            <TabsContent value="email" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Server Configuration</CardTitle>
                  <CardDescription>
                    Configure SMTP settings for sending system emails
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpServer">SMTP Server</Label>
                      <Input
                        id="smtpServer"
                        placeholder="smtp.example.com"
                        value={emailSettings.smtpServer}
                        onChange={(e) => handleEmailSettingChange("smtpServer", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        placeholder="587"
                        value={emailSettings.smtpPort}
                        onChange={(e) => handleEmailSettingChange("smtpPort", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        placeholder="username@example.com"
                        value={emailSettings.smtpUsername}
                        onChange={(e) => handleEmailSettingChange("smtpUsername", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        placeholder="••••••••"
                        value={emailSettings.smtpPassword}
                        onChange={(e) => handleEmailSettingChange("smtpPassword", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email Address</Label>
                    <Input
                      id="fromEmail"
                      placeholder="noreply@example.com"
                      value={emailSettings.fromEmail}
                      onChange={(e) => handleEmailSettingChange("fromEmail", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Default email address used as the sender for system emails
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableSsl"
                      checked={emailSettings.enableSsl}
                      onCheckedChange={(checked) => handleEmailSettingChange("enableSsl", checked)}
                    />
                    <Label htmlFor="enableSsl">Enable SSL/TLS</Label>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="testEmailRecipient">Test Email Recipient</Label>
                    <div className="flex gap-2">
                      <Input
                        id="testEmailRecipient"
                        placeholder="test@example.com"
                        value={emailSettings.testEmailRecipient}
                        onChange={(e) => handleEmailSettingChange("testEmailRecipient", e.target.value)}
                      />
                      <Button 
                        onClick={handleSendTestEmail}
                        disabled={loading || !emailSettings.testEmailRecipient}
                      >
                        Send Test
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Send a test email to verify your SMTP configuration
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Reset to defaults</Button>
                  <Button 
                    onClick={handleSaveEmailSettings} 
                    disabled={loading || !emailSettings.smtpServer || !emailSettings.smtpUsername}
                  >
                    {loading ? "Saving..." : "Save email settings"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>
                    Customize system email templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="welcome">
                    <TabsList className="w-full">
                      <TabsTrigger value="welcome">Welcome</TabsTrigger>
                      <TabsTrigger value="password">Password Reset</TabsTrigger>
                      <TabsTrigger value="verification">Email Verification</TabsTrigger>
                      <TabsTrigger value="notification">Notifications</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="welcome" className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="welcomeSubject">Email Subject</Label>
                        <Input
                          id="welcomeSubject"
                          defaultValue="Welcome to our platform!"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="welcomeTemplate">Email Body</Label>
                        <Textarea
                          id="welcomeTemplate"
                          rows={12}
                          className="font-mono text-sm"
                          defaultValue={`<h1>Welcome to {{company_name}}!</h1>
<p>Dear {{user_name}},</p>
<p>Thank you for joining our platform. We're excited to have you on board!</p>
<p>You can get started by exploring the following features:</p>
<ul>
  <li>Complete your profile</li>
  <li>Browse our documentation</li>
  <li>Connect with other users</li>
</ul>
<p>If you have any questions, please don't hesitate to reach out to our support team.</p>
<p>Best regards,<br>The {{company_name}} Team</p>`}
                        />
                      </div>
                      
                      <div className="bg-muted p-3 rounded-md">
                        <div className="text-sm font-medium mb-1">Available Variables:</div>
                        <div className="text-xs text-muted-foreground grid grid-cols-2 md:grid-cols-3 gap-2">
                          <div><code>{"{{user_name}}"}</code> - User's name</div>
                          <div><code>{"{{company_name}}"}</code> - Company name</div>
                          <div><code>{"{{login_url}}"}</code> - Login URL</div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="password" className="pt-4">
                      {/* Password reset template content */}
                      <div className="text-center text-muted-foreground p-6">
                        Select a template to edit it
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="verification" className="pt-4">
                      {/* Email verification template content */}
                      <div className="text-center text-muted-foreground p-6">
                        Select a template to edit it
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notification" className="pt-4">
                      {/* Notification template content */}
                      <div className="text-center text-muted-foreground p-6">
                        Select a template to edit it
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-6">
                  <Button>Save Template</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Security Settings Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password Policies</CardTitle>
                  <CardDescription>
                    Configure password requirements and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                      <Input
                        id="minPasswordLength"
                        type="number"
                        min="6"
                        max="32"
                        value={securitySettings.minPasswordLength}
                        onChange={(e) => handleSecuritySettingChange("minPasswordLength", parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="flex items-center h-full pt-8">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="requirePasswordComplexity"
                          checked={securitySettings.requirePasswordComplexity}
                          onCheckedChange={(checked) => handleSecuritySettingChange("requirePasswordComplexity", checked)}
                        />
                        <Label htmlFor="requirePasswordComplexity">Require Complex Passwords</Label>
                      </div>
                    </div>
                  </div>
                  
                  {securitySettings.requirePasswordComplexity && (
                    <div className="bg-muted/50 p-4 rounded-md text-sm">
                      <p className="font-medium mb-2">Password requirements:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                        <li>At least {securitySettings.minPasswordLength} characters long</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one number</li>
                        <li>At least one special character (e.g., @, #, $, %)</li>
                      </ul>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mfaRequired">Require Multi-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Force all users to set up MFA for enhanced security
                      </p>
                    </div>
                    <Switch
                      id="mfaRequired"
                      checked={securitySettings.mfaRequired}
                      onCheckedChange={(checked) => handleSecuritySettingChange("mfaRequired", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                      <Input
                        id="loginAttempts"
                        type="number"
                        min="3"
                        max="10"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => handleSecuritySettingChange("loginAttempts", parseInt(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Number of failed login attempts before account lockout
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="autoLockoutDuration">Lockout Duration (minutes)</Label>
                      <Input
                        id="autoLockoutDuration"
                        type="number"
                        min="5"
                        max="60"
                        value={securitySettings.autoLockoutDuration}
                        onChange={(e) => handleSecuritySettingChange("autoLockoutDuration", parseInt(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Duration an account remains locked after too many failed attempts
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoLogout">Auto Logout on Inactivity</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log users out after period of inactivity
                      </p>
                    </div>
                    <Switch
                      id="autoLogout"
                      checked={securitySettings.autoLogout}
                      onCheckedChange={(checked) => handleSecuritySettingChange("autoLogout", checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionLength">Session Length (hours)</Label>
                    <Input
                      id="sessionLength"
                      type="number"
                      min="1"
                      max="72"
                      value={securitySettings.sessionLength}
                      onChange={(e) => handleSecuritySettingChange("sessionLength", parseInt(e.target.value))}
                      disabled={!securitySettings.autoLogout}
                    />
                    <p className="text-xs text-muted-foreground">
                      Duration before an inactive session expires
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Reset to defaults</Button>
                  <Button onClick={handleSaveSecuritySettings} disabled={loading}>
                    {loading ? "Saving..." : "Save security settings"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Access Control</CardTitle>
                  <CardDescription>
                    Manage IP restrictions and secure access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
                    <Textarea
                      id="allowedIPs"
                      placeholder="Enter IP addresses or ranges (one per line)
Example:
192.168.1.1
10.0.0.0/24"
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to allow access from any IP address
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="enforceHttps" defaultChecked />
                    <div>
                      <Label htmlFor="enforceHttps">Enforce HTTPS</Label>
                      <p className="text-xs text-muted-foreground">
                        Redirect all HTTP requests to HTTPS
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save access settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Backups Tab */}
            <TabsContent value="backups" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Backup Configuration</CardTitle>
                  <CardDescription>
                    Configure automated system backups and data retention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoBackup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Create automatic backups on a schedule
                      </p>
                    </div>
                    <Switch
                      id="autoBackup"
                      checked={backupSettings.autoBackup}
                      onCheckedChange={(checked) => handleBackupSettingChange("autoBackup", checked)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <select
                        id="backupFrequency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={backupSettings.backupFrequency}
                        onChange={(e) => handleBackupSettingChange("backupFrequency", e.target.value)}
                        disabled={!backupSettings.autoBackup}
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backupTime">Backup Time</Label>
                      <Input
                        id="backupTime"
                        type="time"
                        value={backupSettings.backupTime}
                        onChange={(e) => handleBackupSettingChange("backupTime", e.target.value)}
                        disabled={!backupSettings.autoBackup || backupSettings.backupFrequency === "hourly"}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="retentionDays">Retention Period (days)</Label>
                      <Input
                        id="retentionDays"
                        type="number"
                        min="1"
                        max="365"
                        value={backupSettings.retentionDays}
                        onChange={(e) => handleBackupSettingChange("retentionDays", parseInt(e.target.value))}
                        disabled={!backupSettings.autoBackup}
                      />
                      <p className="text-xs text-muted-foreground">
                        Number of days to keep backups before deletion
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backupLocation">Backup Storage Location</Label>
                      <select
                        id="backupLocation"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={backupSettings.backupLocation}
                        onChange={(e) => handleBackupSettingChange("backupLocation", e.target.value)}
                      >
                        <option value="local">Local Storage</option>
                        <option value="cloud">Cloud Storage</option>
                        <option value="external">External Server</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeUploads"
                      checked={backupSettings.includeUploads}
                      onCheckedChange={(checked) => handleBackupSettingChange("includeUploads", checked)}
                      disabled={!backupSettings.autoBackup}
                    />
                    <div>
                      <Label htmlFor="includeUploads">Include Uploaded Files</Label>
                      <p className="text-xs text-muted-foreground">
                        Include user-uploaded files in backups (may significantly increase backup size)
                      </p>
                    </div>
                  </div>
                  
                  {backupSettings.backupLocation === "cloud" && (
                    <div className="bg-muted p-4 rounded-md flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Cloud Storage Configuration</p>
                        <p className="text-muted-foreground mt-1">
                          Additional cloud storage configuration is required. Please configure your
                          cloud storage credentials in the storage settings section.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" onClick={handleManualBackup}>
                    Run Backup Now
                  </Button>
                  <Button onClick={handleSaveBackupSettings} disabled={loading}>
                    {loading ? "Saving..." : "Save backup settings"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Backup History</CardTitle>
                  <CardDescription>
                    View and manage previous system backups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-3 font-medium border-b">
                      <div>Date & Time</div>
                      <div>Size</div>
                      <div>Type</div>
                      <div>Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                    
                    <div className="grid grid-cols-5 p-3 border-b text-sm items-center">
                      <div>2023-10-15 02:00:00</div>
                      <div>3.2 GB</div>
                      <div>Automated</div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        Completed
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Download</Button>
                        <Button variant="ghost" size="sm">Restore</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 p-3 border-b text-sm items-center">
                      <div>2023-10-14 02:00:00</div>
                      <div>3.1 GB</div>
                      <div>Automated</div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        Completed
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Download</Button>
                        <Button variant="ghost" size="sm">Restore</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 p-3 border-b text-sm items-center">
                      <div>2023-10-13 14:25:12</div>
                      <div>3.2 GB</div>
                      <div>Manual</div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        Completed
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Download</Button>
                        <Button variant="ghost" size="sm">Restore</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 p-3 text-sm items-center">
                      <div>2023-10-13 02:00:00</div>
                      <div>3.0 GB</div>
                      <div>Automated</div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        Completed
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Download</Button>
                        <Button variant="ghost" size="sm">Restore</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">View All Backups</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
