
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageContext";

interface LoginCheckoutPromptProps {
  planName: string;
  onLoginClick: () => void;
}

const LoginCheckoutPrompt = ({ planName, onLoginClick }: LoginCheckoutPromptProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>{t("checkout.login_required", "Login Required")}</CardTitle>
          <CardDescription>
            {t("checkout.login_to_continue", "Please login or create an account to continue with your subscription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-md">
            <p className="font-medium mb-1">{t("checkout.selected_plan", "Selected Plan")}</p>
            <p className="text-muted-foreground">{planName}</p>
          </div>
          
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 mt-0.5 text-primary" />
            <p>{t("checkout.account_benefits", "Your account allows you to manage your subscription, access your dashboard, and get support.")}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={onLoginClick}>
            {t("checkout.login", "Login")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="text-center text-sm mt-2">
            {t("checkout.no_account", "Don't have an account?")} {" "}
            <Link to="/signup" className="text-primary hover:underline">
              {t("checkout.create_account", "Create an account")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginCheckoutPrompt;
