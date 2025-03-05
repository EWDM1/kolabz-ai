
import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CheckCircle } from "lucide-react";

const ChangePlan = () => {
  const { t } = useLanguage();

  const [billingPeriod, setBillingPeriod] = React.useState<"monthly" | "annual">("monthly");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t("settings.subscription")}</h1>

        <div className="flex justify-center mb-6">
          <div className="bg-secondary rounded-full p-1 flex items-center">
            <Button
              variant={billingPeriod === "monthly" ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
              onClick={() => setBillingPeriod("monthly")}
            >
              {t("pricing.toggle.monthly")}
            </Button>
            <Button
              variant={billingPeriod === "annual" ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
              onClick={() => setBillingPeriod("annual")}
            >
              {t("pricing.toggle.annual")}
              <span className="ml-1.5 text-xs bg-primary-foreground text-primary px-1.5 py-0.5 rounded-full">
                {t("pricing.save")}
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pro Plan */}
          <Card className="flex flex-col border-primary">
            <CardHeader>
              <CardTitle>{t("pricing.pro.name")}</CardTitle>
              <p className="text-muted-foreground">{t("pricing.pro.description")}</p>
              <div className="mt-2">
                <span className="text-3xl font-bold">
                  {billingPeriod === "monthly" ? "$9.99" : "$99.99"}
                </span>
                <span className="text-muted-foreground">
                  /{billingPeriod === "monthly" ? t("pricing.toggle.monthly").toLowerCase() : t("pricing.toggle.annual").toLowerCase()}
                </span>
              </div>
              {billingPeriod === "annual" && (
                <div className="text-sm text-primary">
                  {t("pricing.save_amount")} {t("pricing.savings.pro")}
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>{t("pricing.features.unlimited_opt")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>{t("pricing.features.unlimited_lib")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>{t("pricing.features.all_templates")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>{t("pricing.features.export")}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t("pricing.cta.subscribe")}</Button>
            </CardFooter>
          </Card>

          {/* Team Plan */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>{t("pricing.team.name")}</CardTitle>
              <p className="text-muted-foreground">{t("pricing.team.description")}</p>
              <div className="mt-2">
                <span className="text-3xl font-bold">
                  {billingPeriod === "monthly" ? "$19.99" : "$199.99"}
                </span>
                <span className="text-muted-foreground">
                  /{billingPeriod === "monthly" ? t("pricing.toggle.monthly").toLowerCase() : t("pricing.toggle.annual").toLowerCase()}
                </span>
              </div>
              {billingPeriod === "annual" && (
                <div className="text-sm text-primary">
                  {t("pricing.save_amount")} {t("pricing.savings.team")}
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>{t("pricing.features.everything")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>{t("pricing.features.workspaces")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>{t("pricing.features.collab_features")}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0" />
                  <span>{t("pricing.features.dedicated")}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">{t("pricing.cta.subscribe")}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChangePlan;
