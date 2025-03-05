
import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";

const ManageSubscription = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t("settings.subscription")}</h1>

        <Card>
          <CardHeader>
            <CardTitle>{t("pricing.pro.name")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{t("pricing.pro.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline">
                <Link to="/change-plan">{t("pricing.cta.subscribe")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManageSubscription;
