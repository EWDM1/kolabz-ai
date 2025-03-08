
import { useAuth } from "@/components/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AccountOverviewCard = () => {
  const { user } = useAuth();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Manage your profile and subscription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Plan</span>
          <span className="text-sm font-medium">
            {user?.subscription?.plan || "Free Plan"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Prompts Created</span>
          <span className="text-sm font-medium">
            {user?.stats?.promptsCreated || "0"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Usage</span>
          <span className="text-sm font-medium">
            {user?.stats?.usage || "0%"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to="/my-settings">Settings</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/manage-subscription">Subscription</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountOverviewCard;
