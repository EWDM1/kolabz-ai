
import { UserTable } from "@/components/admin/UserTable";
import { DataActions } from "@/components/admin/user-management/DataActions";
import { AdminUser } from "@/components/admin/user-management/types";

interface UserTableSectionProps {
  users: AdminUser[];
  filteredUsers: AdminUser[];
  loading: boolean;
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (userId: string) => void;
  onDeleteSelected: () => void;
  onFilter: () => void;
}

export function UserTableSection({
  users,
  filteredUsers,
  loading,
  selectedUsers,
  setSelectedUsers,
  onEdit,
  onDelete,
  onDeleteSelected,
  onFilter
}: UserTableSectionProps) {
  return (
    <>
      <DataActions 
        onFilter={onFilter}
        onDeleteSelected={onDeleteSelected}
        selectedCount={selectedUsers.length}
      />
      <UserTable
        users={filteredUsers}
        loading={loading}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}
