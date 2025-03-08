
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export const FAQCard = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("faq.title", "Frequently Asked Questions")}</CardTitle>
        <CardDescription>{t("faq.description", "Common questions about billing and subscriptions")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">{t("faq.upgrade.title", "How can I upgrade my plan?")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("faq.upgrade.description", "You can upgrade your plan at any time by clicking the \"Change Plan\" button above. The price difference will be prorated for the remainder of your billing cycle.")}
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-medium">{t("faq.charge.title", "When will I be charged?")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("faq.charge.description", "Your subscription will renew automatically on your billing date. For annual plans, you'll be charged once per year on the anniversary of your signup date.")}
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-medium">{t("faq.cancel.title", "How do I cancel my subscription?")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("faq.cancel.description", "You can cancel your subscription at any time. Click the \"Cancel Subscription\" button above or contact our support team. Note that cancelling stops automatic renewal but you'll still have access until the end of your current billing period.")}
          </p>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg flex gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-medium">{t("faq.help.title", "Need help?")}</span>{" "}
            {t("faq.help.description", "Contact our support team at")}{" "}
            <a href="mailto:support@kolabz.com" className="text-primary hover:underline">
              support@kolabz.com
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
