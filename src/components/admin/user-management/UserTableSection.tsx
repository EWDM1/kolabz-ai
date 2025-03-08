
import { UserTable } from "@/components/admin/UserTable";
import { AdminUser } from "./types";

interface UserTableSectionProps {
  users: AdminUser[];
  loading: boolean;
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onEdit?: (user: AdminUser) => void;
  onDelete?: (user: AdminUser) => void;
}

export function UserTableSection({
  users,
  loading,
  selectedUsers,
  setSelectedUsers,
  onEdit,
  onDelete
}: UserTableSectionProps) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <UserTable
        users={users}
        loading={loading}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
