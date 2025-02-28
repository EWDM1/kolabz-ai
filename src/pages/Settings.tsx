
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard,
  ListChecks,
  Settings as SettingsIcon,
  LogOut,
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
import { useLanguage } from "@/components/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form state for profile settings
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
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

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const handleManageSubscription = () => {
    navigate("/manage-subscription");
  };

  // Get the appropriate language string
  const getTranslation = (key: string, lang: string = language) => {
    const translations: Record<string, Record<string, string>> = {
      profile: {
        en: 'Profile',
        es: 'Perfil',
        fr: 'Profil',
        pt: 'Perfil'
      },
      notifications: {
        en: 'Notifications',
        es: 'Notificaciones',
        fr: 'Notifications',
        pt: 'Notificações'
      },
      appearance: {
        en: 'Appearance',
        es: 'Apariencia',
        fr: 'Apparence',
        pt: 'Aparência'
      },
      privacy: {
        en: 'Privacy',
        es: 'Privacidad',
        fr: 'Confidentialité',
        pt: 'Privacidade'
      },
      save: {
        en: 'Save changes',
        es: 'Guardar cambios',
        fr: 'Enregistrer les modifications',
        pt: 'Salvar alterações'
      },
      cancel: {
        en: 'Cancel',
        es: 'Cancelar',
        fr: 'Annuler',
        pt: 'Cancelar'
      },
      reset: {
        en: 'Reset to defaults',
        es: 'Restablecer valores predeterminados',
        fr: 'Réinitialiser aux valeurs par défaut',
        pt: 'Redefinir para padrões'
      }
    };
    
    return translations[key]?.[lang] || translations[key]?.['en'] || key;
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
                to="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/my-prompts"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <ListChecks className="h-5 w-5" />
                <span>My Prompts</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-md bg-[#1a2235] text-blue-400 font-medium w-full"
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
                onClick={handleManageSubscription}
              >
                Manage Subscription
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-[#080c16]">
          <div className="container mx-auto p-6">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid grid-cols-4 bg-[#131c2e]">
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#1a2235] data-[state=active]:text-blue-400"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{getTranslation('profile')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#1a2235] data-[state=active]:text-blue-400"
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden md:inline">{getTranslation('notifications')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#1a2235] data-[state=active]:text-blue-400"
                >
                  <Moon className="h-4 w-4" />
                  <span className="hidden md:inline">{getTranslation('appearance')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#1a2235] data-[state=active]:text-blue-400"
                >
                  <Lock className="h-4 w-4" />
                  <span className="hidden md:inline">{getTranslation('privacy')}</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your personal information and public profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        placeholder="Your full name"
                        className="bg-[#131c2e] border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        placeholder="your.email@example.com"
                        className="bg-[#131c2e] border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        placeholder="Tell us a little about yourself"
                        rows={4}
                        className="bg-[#131c2e] border-gray-700 text-white"
                      />
                      <p className="text-xs text-gray-400">
                        Brief description for your profile. Will be shown publicly.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number (Optional)</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={profileForm.phoneNumber}
                          onChange={handleProfileChange}
                          placeholder="+1 (555) 123-4567"
                          className="bg-[#131c2e] border-gray-700 text-white"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="location" className="text-gray-300">Location (Optional)</Label>
                        <Input
                          id="location"
                          name="location"
                          value={profileForm.location}
                          onChange={handleProfileChange}
                          placeholder="City, Country"
                          className="bg-[#131c2e] border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
                    >
                      {getTranslation('cancel')}
                    </Button>
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Saving..." : getTranslation('save')}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Password</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="current" className="text-gray-300">Current Password</Label>
                      <Input
                        id="current"
                        name="current"
                        type="password"
                        value={passwords.current}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        className="bg-[#131c2e] border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="new" className="text-gray-300">New Password</Label>
                        <Input
                          id="new"
                          name="new"
                          type="password"
                          value={passwords.new}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          className="bg-[#131c2e] border-gray-700 text-white"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="confirm" className="text-gray-300">Confirm New Password</Label>
                        <Input
                          id="confirm"
                          name="confirm"
                          type="password"
                          value={passwords.confirm}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          className="bg-[#131c2e] border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-[#131c2e] p-4 rounded-md text-sm">
                      <p className="font-medium mb-2 text-gray-300">Password requirements:</p>
                      <ul className="space-y-1 text-xs text-gray-400">
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
                    <Button 
                      variant="ghost" 
                      className="text-gray-400 hover:text-gray-300 hover:bg-[#1a2235]"
                    >
                      Forgot password?
                    </Button>
                    <Button 
                      onClick={handleSavePassword} 
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Updating..." : "Update password"}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-red-400">Danger Zone</CardTitle>
                    <CardDescription className="text-gray-400">
                      Permanently delete your account and all associated data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {loading ? "Processing..." : "Delete my account"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Email Notifications</CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure what emails you receive from us
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailUpdates" className="text-gray-300">Product Updates</Label>
                        <p className="text-sm text-gray-400">
                          Receive emails about new features and improvements
                        </p>
                      </div>
                      <Switch
                        id="emailUpdates"
                        checked={notificationPrefs.emailUpdates}
                        onCheckedChange={() => handleNotificationToggle("emailUpdates")}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="productNews" className="text-gray-300">Product News</Label>
                        <p className="text-sm text-gray-400">
                          Tips on using our products and new releases
                        </p>
                      </div>
                      <Switch
                        id="productNews"
                        checked={notificationPrefs.productNews}
                        onCheckedChange={() => handleNotificationToggle("productNews")}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="securityAlerts" className="text-gray-300">Security Alerts</Label>
                        <p className="text-sm text-gray-400">
                          Important notifications about your account security
                        </p>
                      </div>
                      <Switch
                        id="securityAlerts"
                        checked={notificationPrefs.securityAlerts}
                        onCheckedChange={() => handleNotificationToggle("securityAlerts")}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketingEmails" className="text-gray-300">Marketing Emails</Label>
                        <p className="text-sm text-gray-400">
                          Promotions, discounts, and newsletter content
                        </p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notificationPrefs.marketingEmails}
                        onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="featuredPrompts" className="text-gray-300">Featured Prompts</Label>
                        <p className="text-sm text-gray-400">
                          Weekly curated content showcasing effective prompts
                        </p>
                      </div>
                      <Switch
                        id="featuredPrompts"
                        checked={notificationPrefs.featuredPrompts}
                        onCheckedChange={() => handleNotificationToggle("featuredPrompts")}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={resetNotificationPreferences}
                      className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
                    >
                      {getTranslation('reset')}
                    </Button>
                    <Button 
                      onClick={handleSaveNotifications} 
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Saving..." : getTranslation('save')}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-6">
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Theme and Display</CardTitle>
                    <CardDescription className="text-gray-400">
                      Customize how Kolabz looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          variant={appearance.theme === "light" ? "default" : "outline"}
                          className={appearance.theme === "light" 
                            ? "bg-blue-600 hover:bg-blue-700 text-white justify-start" 
                            : "bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235] justify-start"}
                          onClick={() => handleAppearanceChange("theme", "light")}
                        >
                          <Sun className="h-4 w-4 mr-2" />
                          Light
                        </Button>
                        <Button
                          variant={appearance.theme === "dark" ? "default" : "outline"}
                          className={appearance.theme === "dark" 
                            ? "bg-blue-600 hover:bg-blue-700 text-white justify-start" 
                            : "bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235] justify-start"}
                          onClick={() => handleAppearanceChange("theme", "dark")}
                        >
                          <Moon className="h-4 w-4 mr-2" />
                          Dark
                        </Button>
                        <Button
                          variant={appearance.theme === "system" ? "default" : "outline"}
                          className={appearance.theme === "system" 
                            ? "bg-blue-600 hover:bg-blue-700 text-white justify-start" 
                            : "bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235] justify-start"}
                          onClick={() => handleAppearanceChange("theme", "system")}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          System
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="compactMode" className="text-gray-300">Compact Mode</Label>
                        <p className="text-sm text-gray-400">
                          Reduce spacing and show more content at once
                        </p>
                      </div>
                      <Switch
                        id="compactMode"
                        checked={appearance.compactMode}
                        onCheckedChange={(checked) => handleAppearanceChange("compactMode", checked)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reducedMotion" className="text-gray-300">Reduced Motion</Label>
                        <p className="text-sm text-gray-400">
                          Minimize animation and motion effects
                        </p>
                      </div>
                      <Switch
                        id="reducedMotion"
                        checked={appearance.reducedMotion}
                        onCheckedChange={(checked) => handleAppearanceChange("reducedMotion", checked)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Font Size</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={appearance.fontSize === "small" ? "default" : "outline"}
                          size="sm"
                          className={appearance.fontSize === "small" 
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
                            : "bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"}
                          onClick={() => handleAppearanceChange("fontSize", "small")}
                        >
                          Small
                        </Button>
                        <Button
                          variant={appearance.fontSize === "normal" ? "default" : "outline"}
                          size="sm"
                          className={appearance.fontSize === "normal" 
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
                            : "bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"}
                          onClick={() => handleAppearanceChange("fontSize", "normal")}
                        >
                          Medium
                        </Button>
                        <Button
                          variant={appearance.fontSize === "large" ? "default" : "outline"}
                          size="sm"
                          className={appearance.fontSize === "large" 
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
                            : "bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"}
                          onClick={() => handleAppearanceChange("fontSize", "large")}
                        >
                          Large
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
                    >
                      {getTranslation('reset')}
                    </Button>
                    <Button 
                      onClick={handleSaveAppearance} 
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? "Saving..." : getTranslation('save')}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Privacy Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Control your data and how your information is used
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="shareUsage" className="text-gray-300">Share Usage Data</Label>
                        <p className="text-sm text-gray-400">
                          Help improve our products by sharing anonymous usage data
                        </p>
                      </div>
                      <Switch
                        id="shareUsage"
                        checked={privacySettings.shareUsage}
                        onCheckedChange={() => handlePrivacyToggle("shareUsage")}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allowCookies" className="text-gray-300">Allow Cookies</Label>
                        <p className="text-sm text-gray-400">
                          We use cookies to enhance your browsing experience
                        </p>
                      </div>
                      <Switch
                        id="allowCookies"
                        checked={privacySettings.allowCookies}
                        onCheckedChange={() => handlePrivacyToggle("allowCookies")}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showProfilePublicly" className="text-gray-300">Show Profile Publicly</Label>
                        <p className="text-sm text-gray-400">
                          Allow other users to see your profile information
                        </p>
                      </div>
                      <Switch
                        id="showProfilePublicly"
                        checked={privacySettings.showProfilePublicly}
                        onCheckedChange={() => handlePrivacyToggle("showProfilePublicly")}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="storeHistory" className="text-gray-300">Store Prompt History</Label>
                        <p className="text-sm text-gray-400">
                          Save your prompt history for future reference
                        </p>
                      </div>
                      <Switch
                        id="storeHistory"
                        checked={privacySettings.storeHistory}
                        onCheckedChange={() => handlePrivacyToggle("storeHistory")}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      onClick={handleSavePrivacy} 
                      disabled={loading}
                    >
                      {loading ? "Saving..." : getTranslation('save')}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-[#0a101e] border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Your Data</CardTitle>
                    <CardDescription className="text-gray-400">
                      Export or delete your personal data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-[#131c2e] p-4 rounded-md">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-gray-300">About your data</p>
                          <p className="text-gray-400 mt-1">
                            You can download a copy of all the data we have stored for your account, including
                            your profile information, prompt history, and saved content.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline"
                        className="w-full bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
                      >
                        Download my data
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleDeleteAccount}
                      >
                        Delete all my data
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

export default Settings;
