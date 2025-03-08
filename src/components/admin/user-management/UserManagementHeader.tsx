
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { UserManagementHeaderProps } from "./types";

export function UserManagementHeader({ 
  selectedCount, 
  onDelete, 
  onRefresh 
}: UserManagementHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage your platform users
        </p>
      </div>
      
      <div className="flex gap-2">
        {selectedCount > 0 && (
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected ({selectedCount})
          </Button>
        )}
        
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        
        <Link to="/admin/users/new">
          <Button>
            <UserRoundPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </Link>
      </div>
    </div>
  );
}
