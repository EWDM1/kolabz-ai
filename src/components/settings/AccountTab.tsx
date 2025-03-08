
import React, { useState } from "react";
import { User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AccountTabProps {
  onSaveProfile: () => void;
}

const AccountTab = ({ onSaveProfile }: AccountTabProps) => {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your account details and personal information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <Button variant="outline" className="mb-2">
                Upload New Picture
              </Button>
              <p className="text-xs text-muted-foreground">
                JPEG, PNG or GIF, max 2MB
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSaveProfile}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountTab;
