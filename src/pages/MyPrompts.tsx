
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageContext";
import { PromptsPageLayout } from "@/components/prompts/layout/PromptsPageLayout";
import { PromptsContent } from "@/components/prompts/PromptsContent";

const MyPrompts = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    window.location.href = "/login";
  };

  return (
    <PromptsPageLayout>
      <PromptsContent 
        handleNavigation={handleNavigation}
        handleLogout={handleLogout}
      />
    </PromptsPageLayout>
  );
};

export default MyPrompts;
