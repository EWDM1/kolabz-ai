
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImportActions } from "@/components/admin/user-management/ImportActions";
import { ExportActions } from "@/components/admin/user-management/ExportActions";
import { AdminUser } from "@/components/admin/user-management/types";

interface UserActionsPanelProps {
  users: AdminUser[];
  onImportComplete: () => Promise<void>;
  onAddUser: () => void;
}

export function UserActionsPanel({
  users,
  onImportComplete,
  onAddUser
}: UserActionsPanelProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <TabsList>
        <TabsTrigger value="all">All Users</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="inactive">Inactive</TabsTrigger>
      </TabsList>

      <div className="flex flex-col sm:flex-row gap-3">
        <ImportActions onImportComplete={onImportComplete} />
        <ExportActions users={users} />
        <Button 
          variant="outline" 
          onClick={onAddUser}
        >
          Add User
        </Button>
      </div>
    </div>
  );
}
