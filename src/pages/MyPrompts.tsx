
import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const MyPrompts = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">{t("prompts.my_prompts")}</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("prompts.create")}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Input 
            placeholder={t("prompts.search")} 
            className="max-w-sm" 
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("prompts.my_prompts")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">{t("prompts.no_results")}</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t("prompts.create")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyPrompts;
