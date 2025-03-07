
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

export function UserManagementHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage your platform users
        </p>
      </div>
      <Link to="/admin/users/new">
        <Button>
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </Link>
    </div>
  );
}
