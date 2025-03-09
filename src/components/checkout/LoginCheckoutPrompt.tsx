
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface LoginCheckoutPromptProps {
  planName: string;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const LoginCheckoutPrompt = ({ 
  planName, 
  onLoginClick,
  onSignupClick 
}: LoginCheckoutPromptProps) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {t("checkout.login_required", "One Step Away")}
          </CardTitle>
          <CardDescription>
            {t("checkout.login_description", `You're about to subscribe to our ${planName} plan.`)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">
                  {t("checkout.secure_account", "Create a secure account")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("checkout.account_benefit", "Sign up to manage your subscription, access all features, and get support.")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button 
            onClick={onSignupClick} 
            className="w-full gap-2"
          >
            {t("checkout.create_account", "Create Account")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {t("checkout.already_account", "Already have an account?")}
            {' '}
            <Button variant="link" className="p-0 h-auto" onClick={onLoginClick}>
              {t("checkout.login", "Log in")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginCheckoutPrompt;
