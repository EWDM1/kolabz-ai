
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Filter } from "lucide-react";

export interface UserManagementHeaderProps {
  selectedCount: number;
  onDelete: () => void;
  onRefresh: () => Promise<void> | void;
  onDeleteSelected?: () => void;
  toggleFilterVisible?: () => void;
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  selectedCount,
  onDelete,
  onRefresh,
  onDeleteSelected,
  toggleFilterVisible
}) => {
  // Use the appropriate handler based on what was passed
  const handleDeleteClick = onDeleteSelected || onDelete;
  
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold">User Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage users and permissions
        </p>
      </div>
      <div className="flex space-x-2">
        {selectedCount > 0 && (
          <Button variant="destructive" onClick={handleDeleteClick}>
            Delete ({selectedCount})
          </Button>
        )}
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        {toggleFilterVisible && (
          <Button variant="outline" onClick={toggleFilterVisible}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        )}
      </div>
    </div>
  );
};
