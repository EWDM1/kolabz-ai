
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Mail, MessageCircle, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/settings/DashboardHeader";
import HelpSupportFooter from "@/components/settings/HelpSupportFooter";

const HelpSupport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const handleLogout = () => {
    toast({
      title: t("logout.title", "Logged out"),
      description: t("logout.description", "You have been successfully logged out"),
    });
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background/95">
      <DashboardHeader 
        userName={user?.name || "John Doe"} 
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <DashboardSidebar 
              handleNavigation={handleNavigation}
              handleLogout={handleLogout}
              activePage="settings"
            />
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="flex flex-col space-y-6 mb-8">
              <h1 className="text-2xl font-bold">{t("help.title", "Help & Support")}</h1>
              <p className="text-muted-foreground">
                {t("help.description", "Need assistance? We're here to help you with any questions or issues you may have.")}
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {t("help.documentation.title", "Documentation")}
                    </CardTitle>
                    <CardDescription>{t("help.documentation.subtitle", "Comprehensive guides and resources")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("help.documentation.description", "Browse our detailed documentation for step-by-step guides on using our platform.")}
                    </p>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-primary hover:text-primary/90"
                    >
                      {t("help.documentation.link", "View Documentation")} →
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      {t("help.contact.title", "Contact Support")}
                    </CardTitle>
                    <CardDescription>{t("help.contact.subtitle", "Get help from our team")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("help.contact.description", "Reach out to our support team directly for personalized assistance.")}
                    </p>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-primary hover:text-primary/90"
                    >
                      {t("help.contact.link", "Contact Support")} →
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      {t("help.community.title", "Community Forum")}
                    </CardTitle>
                    <CardDescription>{t("help.community.subtitle", "Connect with other users")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("help.community.description", "Join discussions, share experiences, and learn from other community members.")}
                    </p>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-primary hover:text-primary/90"
                    >
                      {t("help.community.link", "Visit Forum")} →
                    </a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      {t("help.videos.title", "Video Tutorials")}
                    </CardTitle>
                    <CardDescription>{t("help.videos.subtitle", "Learn with visual guides")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("help.videos.description", "Watch tutorials on how to make the most of our prompt optimization tools.")}
                    </p>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-primary hover:text-primary/90"
                    >
                      {t("help.videos.link", "Watch Tutorials")} →
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t("help.faq.title", "Frequently Asked Questions")}</CardTitle>
                  <CardDescription>{t("help.faq.subtitle", "Quick answers to common questions")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">{t("help.faq.q1", "How do I optimize my prompts?")}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t("help.faq.a1", "Use our Prompt Optimizer tool on your dashboard. Enter your base prompt, select your target AI model, and our system will suggest improvements.")}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{t("help.faq.q2", "Can I upgrade my subscription plan?")}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t("help.faq.a2", "Yes, you can upgrade your plan at any time from the Subscription page in your account.")}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{t("help.faq.q3", "How do I save my optimized prompts?")}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t("help.faq.a3", "All optimized prompts are automatically saved to your account. You can access them anytime from the My Prompts section.")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Help & Support Footer */}
            <HelpSupportFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
