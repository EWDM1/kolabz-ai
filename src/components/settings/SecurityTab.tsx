
import React, { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SecurityTabProps {
  onChangePassword: () => void;
}

const SecurityTab = ({ onChangePassword }: SecurityTabProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onChangePassword}>
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Two-Factor Authentication</div>
              <div className="text-xs text-muted-foreground">
                Receive a verification code to your phone when logging in
              </div>
            </div>
            <Button variant="outline">
              Enable
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Active Sessions</div>
              <div className="text-xs text-muted-foreground">
                Manage devices where you're currently logged in
              </div>
            </div>
            <Button variant="outline">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
