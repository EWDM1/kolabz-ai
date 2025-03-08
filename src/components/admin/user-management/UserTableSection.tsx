
import { UserTable } from "@/components/admin/UserTable";
import { AdminUser } from "@/components/admin/user-management/types";
import { Card, CardContent } from "@/components/ui/card";

interface UserTableSectionProps {
  users: AdminUser[];
  loading: boolean;
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
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
    <UserTable
      users={users}
      loading={loading}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
