
import React, { useState } from "react";
import { CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AppearanceTabProps {
  onSaveAppearance: () => void;
}

const AppearanceTab = ({ onSaveAppearance }: AppearanceTabProps) => {
  const [themePreference, setThemePreference] = useState('system');
  const [fontSize, setFontSize] = useState('medium');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Display Settings</CardTitle>
        <CardDescription>
          Customize the look and feel of your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className={`flex-col gap-2 h-auto py-4 ${themePreference === 'light' ? 'border-primary bg-primary/10' : ''}`}
              onClick={() => setThemePreference('light')}
            >
              <div className="h-6 w-6 bg-background rounded-full border shadow-sm"></div>
              <span>Light</span>
            </Button>
            <Button 
              variant="outline" 
              className={`flex-col gap-2 h-auto py-4 ${themePreference === 'dark' ? 'border-primary bg-primary/10' : ''}`}
              onClick={() => setThemePreference('dark')}
            >
              <div className="h-6 w-6 bg-foreground rounded-full border shadow-sm"></div>
              <span>Dark</span>
            </Button>
            <Button 
              variant="outline" 
              className={`flex-col gap-2 h-auto py-4 ${themePreference === 'system' ? 'border-primary bg-primary/10' : ''}`}
              onClick={() => setThemePreference('system')}
            >
              <div className="h-6 w-6 rounded-full border shadow-sm bg-gradient-to-tr from-foreground to-background"></div>
              <span>System</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Font Size</Label>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className={`${fontSize === 'small' ? 'border-primary bg-primary/10' : ''}`}
              onClick={() => setFontSize('small')}
            >
              Small
            </Button>
            <Button 
              variant="outline" 
              className={`${fontSize === 'medium' ? 'border-primary bg-primary/10' : ''}`}
              onClick={() => setFontSize('medium')}
            >
              Medium
            </Button>
            <Button 
              variant="outline" 
              className={`${fontSize === 'large' ? 'border-primary bg-primary/10' : ''}`}
              onClick={() => setFontSize('large')}
            >
              Large
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Language</Label>
          <div className="flex items-center border rounded-md p-3">
            <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
            <select className="bg-transparent outline-none w-full appearance-none">
              <option value="en-US">English (US)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This setting is system-wide and will affect all text in the interface
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSaveAppearance}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Appearance Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppearanceTab;
