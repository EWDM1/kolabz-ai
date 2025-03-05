
import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/components/AuthContext";

const MySettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t("settings.title")}</h1>

        <Card>
          <CardHeader>
            <CardTitle>{t("settings.profile")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.login.email")}</Label>
              <Input id="email" disabled value={user?.email || ''} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">{t("auth.signup.name")}</Label>
              <Input id="name" />
            </div>
            
            <Button>{t("settings.save")}</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MySettings;
