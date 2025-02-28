import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Lock, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone, 
  Mail, 
  Info,
  Check,
  X,
  Settings as SettingsIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for admin sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Form state for profile settings
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    phoneNumber: "",
    location: "",
  });
  
  // Password change state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  
  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailUpdates: true,
    productNews: true,
    securityAlerts: true,
    marketingEmails: false,
    featuredPrompts: true,
  });
  
  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: theme,
    compactMode: false,
    highContrast: false,
    reducedMotion: false,
    fontSize: "normal",
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareUsage: true,
    allowCookies: true,
    showProfilePublicly: true,
    storeHistory: true,
  });
  
  // Admin-specific settings
  const [adminSettings, setAdminSettings] = useState({
    enableBetaFeatures: false,
    debugMode: false,
    maintenanceMode: false,
    restrictRegistrations: false,
  });
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle notification toggle
  const handleNotificationToggle = (key: string) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof notificationPrefs],
    }));
  };
  
  // Handle appearance changes
  const handleAppearanceChange = (key: string, value: any) => {
    if (key === "theme") {
      setTheme(value);
    }
    
    setAppearance((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  
  // Handle privacy toggle
  const handlePrivacyToggle = (key: string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof privacySettings],
    }));
  };
  
  // Handle admin settings toggle
  const handleAdminToggle = (key: string) => {
    setAdminSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof adminSettings],
    }));
  };
  
  // Reset all notification preferences to default
  const resetNotificationPreferences = () => {
    setNotificationPrefs({
      emailUpdates: true,
      productNews: true,
      securityAlerts: true,
      marketingEmails: false,
      featuredPrompts: true,
    });
  };
  
  // Save profile
  const handleSaveProfile = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
      setLoading(false);
    }, 800);
  };
  
  // Save password
  const handleSavePassword = () => {
    // Validation
    if (passwords.new !== passwords.confirm) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
      });
      return;
    }
    
    if (passwords.new.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Your password must be at least 8 characters long.",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      setLoading(false);
      
      // Reset form
      setPasswords({
        current: "",
        new: "",
        confirm: "",
      });
    }, 800);
  };
  
  // Save notifications
  const handleSaveNotifications = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification preferences saved",
        description: "Your notification settings have been updated.",
      });
      setLoading(false);
    }, 800);
  };
  
  // Save appearance settings
  const handleSaveAppearance = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appearance settings saved",
        description: "Your display preferences have been updated.",
      });
      setLoading(false);
    }, 800);
  };
  
  // Save privacy settings
  const handleSavePrivacy = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Privacy settings saved",
        description: "Your privacy preferences have been updated.",
      });
      setLoading(false);
    }, 800);
  };
  
  // Save admin settings
  const handleSaveAdminSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Admin settings saved",
        description: "System settings have been updated.",
      });
      setLoading(false);
    }, 800);
  };
  
  // Delete account
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmed) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Account deleted",
          description: "Your account has been permanently deleted.",
        });
        setLoading(false);
        navigate("/");
      }, 1500);
    }
  };
  
  // Update appearance settings on theme change
  useEffect(() => {
    setAppearance((prev) => ({
      ...prev,
      theme,
    }));
  }, [theme]);
  
  // Set initial profile data
  useEffect(() => {
    if (user) {
      setProfileForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  // Check the sidebar collapsed state from localStorage (for admin view)
  useEffect(() => {
    const savedState = localStorage.getItem("adminSidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      {isAdmin ? (
        <div className="flex min-h-screen">
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <div className={cn(
            "flex-1 transition-all duration-300 ease-in-out w-full",
            sidebarCollapsed ? "md:ml-16" : "md:ml-64"
          )}>
            <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            
            <main className="container mx-auto px-4 py-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <SettingsIcon className="h-8 w-8 text-primary" />
                  Settings
                </h1>
                <p className="text-muted-foreground">
                  Manage your account preferences and system settings
                </p>
              </div>
              
              <SettingsContent 
                profileForm={profileForm}
                passwords={passwords}
                notificationPrefs={notificationPrefs}
                appearance={appearance}
                privacySettings={privacySettings}
                adminSettings={adminSettings}
                isAdmin={isAdmin}
                loading={loading}
                onProfileChange={handleProfileChange}
                onPasswordChange={handlePasswordChange}
                onNotificationToggle={handleNotificationToggle}
                onAppearanceChange={handleAppearanceChange}
                onPrivacyToggle={handlePrivacyToggle}
                onAdminToggle={handleAdminToggle}
                onSaveProfile={handleSaveProfile}
                onSavePassword={handleSavePassword}
                onSaveNotifications={handleSaveNotifications}
                onSaveAppearance={handleSaveAppearance}
                onSavePrivacy={handleSavePrivacy}
                onSaveAdminSettings={handleSaveAdminSettings}
                onDeleteAccount={handleDeleteAccount}
                resetNotificationPreferences={resetNotificationPreferences}
              />
            </main>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <SettingsIcon className="h-8 w-8 text-primary" />
              Account Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account preferences and profile
            </p>
          </div>
          
          <SettingsContent 
            profileForm={profileForm}
            passwords={passwords}
            notificationPrefs={notificationPrefs}
            appearance={appearance}
            privacySettings={privacySettings}
            adminSettings={adminSettings}
            isAdmin={isAdmin}
            loading={loading}
            onProfileChange={handleProfileChange}
            onPasswordChange={handlePasswordChange}
            onNotificationToggle={handleNotificationToggle}
            onAppearanceChange={handleAppearanceChange}
            onPrivacyToggle={handlePrivacyToggle}
            onAdminToggle={handleAdminToggle}
            onSaveProfile={handleSaveProfile}
            onSavePassword={handleSavePassword}
            onSaveNotifications={handleSaveNotifications}
            onSaveAppearance={handleSaveAppearance}
            onSavePrivacy={handleSavePrivacy}
            onSaveAdminSettings={handleSaveAdminSettings}
            onDeleteAccount={handleDeleteAccount}
            resetNotificationPreferences={resetNotificationPreferences}
          />
        </div>
      )}
    </div>
  );
};

// Settings content component to avoid duplication
interface SettingsContentProps {
  profileForm: {
    name: string;
    email: string;
    bio: string;
    phoneNumber: string;
    location: string;
  };
  passwords: {
    current: string;
    new: string;
    confirm: string;
  };
  notificationPrefs: {
    emailUpdates: boolean;
    productNews: boolean;
    securityAlerts: boolean;
    marketingEmails: boolean;
    featuredPrompts: boolean;
  };
  appearance: {
    theme: string;
    compactMode: boolean;
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: string;
  };
  privacySettings: {
    shareUsage: boolean;
    allowCookies: boolean;
    showProfilePublicly: boolean;
    storeHistory: boolean;
  };
  adminSettings: {
    enableBetaFeatures: boolean;
    debugMode: boolean;
    maintenanceMode: boolean;
    restrictRegistrations: boolean;
  };
  isAdmin: boolean;
  loading: boolean;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNotificationToggle: (key: string) => void;
  onAppearanceChange: (key: string, value: any) => void;
  onPrivacyToggle: (key: string) => void;
  onAdminToggle: (key: string) => void;
  onSaveProfile: () => void;
  onSavePassword: () => void;
  onSaveNotifications: () => void;
  onSaveAppearance: () => void;
  onSavePrivacy: () => void;
  onSaveAdminSettings: () => void;
  onDeleteAccount: () => void;
  resetNotificationPreferences: () => void;
}

const SettingsContent = ({
  profileForm,
  passwords,
  notificationPrefs,
  appearance,
  privacySettings,
  adminSettings,
  isAdmin,
  loading,
  onProfileChange,
  onPasswordChange,
  onNotificationToggle,
  onAppearanceChange,
  onPrivacyToggle,
  onAdminToggle,
  onSaveProfile,
  onSavePassword,
  onSaveNotifications,
  onSaveAppearance,
  onSavePrivacy,
  onSaveAdminSettings,
  onDeleteAccount,
  resetNotificationPreferences,
}: SettingsContentProps) => {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 md:w-auto w-full">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden md:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          <span className="hidden md:inline">Appearance</span>
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span className="hidden md:inline">Privacy</span>
        </TabsTrigger>
        {isAdmin && (
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Admin</span>
          </TabsTrigger>
        )}
      </TabsList>
      
      {/* Profile Tab */}
      <TabsContent value="profile" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and public profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profileForm.name}
                onChange={onProfileChange}
                placeholder="Your full name"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={onProfileChange}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileForm.bio}
                onChange={onProfileChange}
                placeholder="Tell us a little about yourself"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Brief description for your profile. Will be shown publicly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profileForm.phoneNumber}
                  onChange={onProfileChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  name="location"
                  value={profileForm.location}
                  onChange={onProfileChange}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={onSaveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="current">Current Password</Label>
              <Input
                id="current"
                name="current"
                type="password"
                value={passwords.current}
                onChange={onPasswordChange}
                placeholder="••••••••"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="new">New Password</Label>
                <Input
                  id="new"
                  name="new"
                  type="password"
                  value={passwords.new}
                  onChange={onPasswordChange}
                  placeholder="••••••••"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input
                  id="confirm"
                  name="confirm"
                  type="password"
                  value={passwords.confirm}
                  onChange={onPasswordChange}
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <p className="font-medium mb-2">Password requirements:</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Minimum 8 characters long
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  At least one number or special character
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" className="text-muted-foreground">
              Forgot password?
            </Button>
            <Button onClick={onSavePassword} disabled={loading}>
              {loading ? "Updating..." : "Update password"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="destructive" 
              onClick={onDeleteAccount}
              disabled={loading}
            >
              {loading ? "Processing..." : "Delete my account"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Notifications Tab */}
      <TabsContent value="notifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Configure what emails you receive from us
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailUpdates">Product Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and improvements
                </p>
              </div>
              <Switch
                id="emailUpdates"
                checked={notificationPrefs.emailUpdates}
                onCheckedChange={() => onNotificationToggle("emailUpdates")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="productNews">Product News</Label>
                <p className="text-sm text-muted-foreground">
                  Tips on using our products and new releases
                </p>
              </div>
              <Switch
                id="productNews"
                checked={notificationPrefs.productNews}
                onCheckedChange={() => onNotificationToggle("productNews")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="securityAlerts">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Important notifications about your account security
                </p>
              </div>
              <Switch
                id="securityAlerts"
                checked={notificationPrefs.securityAlerts}
                onCheckedChange={() => onNotificationToggle("securityAlerts")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Promotions, discounts, and newsletter content
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={notificationPrefs.marketingEmails}
                onCheckedChange={() => onNotificationToggle("marketingEmails")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="featuredPrompts">Featured Prompts</Label>
                <p className="text-sm text-muted-foreground">
                  Weekly curated content showcasing effective prompts
                </p>
              </div>
              <Switch
                id="featuredPrompts"
                checked={notificationPrefs.featuredPrompts}
                onCheckedChange={() => onNotificationToggle("featuredPrompts")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={resetNotificationPreferences}
            >
              Reset to defaults
            </Button>
            <Button onClick={onSaveNotifications} disabled={loading}>
              {loading ? "Saving..." : "Save preferences"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>
              Configure mobile and browser notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Web Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Enable or disable in-browser notifications
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Configure permissions
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mobile App Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Manage notifications in our mobile apps
                </p>
              </div>
              <div className="flex items-center">
                <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Configure in app</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Appearance Tab */}
      <TabsContent value="appearance" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme and Display</CardTitle>
            <CardDescription>
              Customize how Kolabz looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={appearance.theme === "light" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => onAppearanceChange("theme", "light")}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={appearance.theme === "dark" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => onAppearanceChange("theme", "dark")}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant={appearance.theme === "system" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => onAppearanceChange("theme", "system")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  System
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compactMode">Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Reduce spacing and show more content at once
                </p>
              </div>
              <Switch
                id="compactMode"
                checked={appearance.compactMode}
                onCheckedChange={(checked) => onAppearanceChange("compactMode", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="highContrast">High Contrast</Label>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better readability
                </p>
              </div>
              <Switch
                id="highContrast"
                checked={appearance.highContrast}
                onCheckedChange={(checked) => onAppearanceChange("highContrast", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reducedMotion">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animation and motion effects
                </p>
              </div>
              <Switch
                id="reducedMotion"
                checked={appearance.reducedMotion}
                onCheckedChange={(checked) => onAppearanceChange("reducedMotion", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Font Size</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={appearance.fontSize === "small" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onAppearanceChange("fontSize", "small")}
                >
                  Small
                </Button>
                <Button
                  variant={appearance.fontSize === "normal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onAppearanceChange("fontSize", "normal")}
                >
                  Medium
                </Button>
                <Button
                  variant={appearance.fontSize === "large" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onAppearanceChange("fontSize", "large")}
                >
                  Large
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to defaults</Button>
            <Button onClick={onSaveAppearance} disabled={loading}>
              {loading ? "Saving..." : "Save preferences"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Privacy Tab */}
      <TabsContent value="privacy" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>
              Control your data and how your information is used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shareUsage">Share Usage Data</Label>
                <p className="text-sm text-muted-foreground">
                  Help improve our products by sharing anonymous usage data
                </p>
              </div>
              <Switch
                id="shareUsage"
                checked={privacySettings.shareUsage}
                onCheckedChange={() => onPrivacyToggle("shareUsage")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowCookies">Allow Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience
                </p>
              </div>
              <Switch
                id="allowCookies"
                checked={privacySettings.allowCookies}
                onCheckedChange={() => onPrivacyToggle("allowCookies")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showProfilePublicly">Show Profile Publicly</Label>
                <p className="text-sm text-muted-foreground">
                  Allow other users to see your profile information
                </p>
              </div>
              <Switch
                id="showProfilePublicly"
                checked={privacySettings.showProfilePublicly}
                onCheckedChange={() => onPrivacyToggle("showProfilePublicly")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="storeHistory">Store Prompt History</Label>
                <p className="text-sm text-muted-foreground">
                  Save your prompt history for future reference
                </p>
              </div>
              <Switch
                id="storeHistory"
                checked={privacySettings.storeHistory}
                onCheckedChange={() => onPrivacyToggle("storeHistory")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={onSavePrivacy} 
              disabled={loading}
            >
              {loading ? "Saving..." : "Save privacy settings"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Data</CardTitle>
            <CardDescription>
              Export or delete your personal data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">About your data</p>
                  <p className="text-muted-foreground mt-1">
                    You can download a copy of all the data we have stored for your account, including
                    your profile information, prompt history, and saved content.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                Download my data
              </Button>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={onDeleteAccount}
              >
                Delete all my data
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Admin Tab (Only for admins) */}
      {isAdmin && (
        <TabsContent value="admin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Manage global system settings and configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableBetaFeatures">Enable Beta Features</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow all users to access beta and unreleased features
                  </p>
                </div>
                <Switch
                  id="enableBetaFeatures"
                  checked={adminSettings.enableBetaFeatures}
                  onCheckedChange={() => onAdminToggle("enableBetaFeatures")}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed error logging and debugging tools
                  </p>
                </div>
                <Switch
                  id="debugMode"
                  checked={adminSettings.debugMode}
                  onCheckedChange={() => onAdminToggle("debugMode")}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode" className="text-amber-500 font-medium">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the site in maintenance mode (only admins can access)
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={adminSettings.maintenanceMode}
                  onCheckedChange={() => onAdminToggle("maintenanceMode")}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="restrictRegistrations">Restrict Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Limit new user registrations (invitation only)
                  </p>
                </div>
                <Switch
                  id="restrictRegistrations"
                  checked={adminSettings.restrictRegistrations}
                  onCheckedChange={() => onAdminToggle("restrictRegistrations")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to defaults</Button>
              <Button onClick={onSaveAdminSettings} disabled={loading}>
                {loading ? "Saving..." : "Save system settings"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>
                Perform global system maintenance tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Subscriptions
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Mass Email
                </Button>
                <Button variant="outline" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  User Management
                </Button>
                <Button variant="outline" className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Logs
                </Button>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700/30 p-4 rounded-md mt-4">
                <div className="flex items-start space-x-2">
                  <Info className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 dark:text-amber-300">Critical Actions</p>
                    <p className="text-amber-700 dark:text-amber-400/80 mt-1">
                      Some administrative actions can affect all users and site functionality.
                      Use these tools with caution.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default Settings;
