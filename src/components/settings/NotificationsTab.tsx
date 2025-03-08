
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NotificationsTabProps {
  onSaveNotifications: () => void;
}

const NotificationsTab = ({ onSaveNotifications }: NotificationsTabProps) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [promptUpdates, setPromptUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
        <CardDescription>
          Choose what updates you want to receive in your email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Email Notifications</div>
            <div className="text-sm text-muted-foreground">
              Receive general notifications via email
            </div>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Prompt Updates</div>
            <div className="text-sm text-muted-foreground">
              Get notified when we add new prompt templates
            </div>
          </div>
          <Switch
            checked={promptUpdates}
            onCheckedChange={setPromptUpdates}
          />
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Security Alerts</div>
            <div className="text-sm text-muted-foreground">
              Get notified about security issues and login attempts
            </div>
          </div>
          <Switch
            checked={securityAlerts}
            onCheckedChange={setSecurityAlerts}
          />
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Marketing Emails</div>
            <div className="text-sm text-muted-foreground">
              Receive updates about new features and promotional offers
            </div>
          </div>
          <Switch
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSaveNotifications}>
          Save Notification Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsTab;
