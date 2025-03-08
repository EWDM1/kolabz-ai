
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export interface UserManagementHeaderProps {
  selectedCount: number;
  onDelete: () => void;
  onRefresh: () => Promise<void> | void;
  toggleFilterVisible?: () => void; // Making this optional
  onDeleteSelected?: () => void; // Making this optional
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  selectedCount,
  onDelete,
  onRefresh,
  toggleFilterVisible,
  onDeleteSelected
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
            Filter
          </Button>
        )}
      </div>
    </div>
  );
};
