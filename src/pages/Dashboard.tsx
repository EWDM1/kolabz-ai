import React from "react";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">
            {t("dashboard.welcome")}, {user?.email}
          </h1>
          <Button asChild>
            <Link to="/my-prompts">{t("dashboard.create_new")}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.recent")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="text-muted-foreground mb-4">{t("dashboard.no_prompts")}</p>
              <Button asChild>
                <Link to="/my-prompts">{t("dashboard.get_started")}</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Additional dashboard cards can be added here */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
