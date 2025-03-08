
import { useState } from 'react';
import { UserTableProps } from "@/components/admin/user-management/types";
import { UserTableHeader } from "@/components/admin/user-management/UserTableHeader";
import { UserTableHead } from "@/components/admin/user-management/UserTableHead";
import { UserTableBody } from "@/components/admin/user-management/UserTableBody";

export function UserTable({ 
  users,
  loading,
  selectedUsers,
  setSelectedUsers,
  onEdit,
  onDelete 
}: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  if (loading) {
    return <div className="py-8 text-center">Loading users...</div>;
  }

  return (
    <div className="space-y-4">
      <UserTableHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <UserTableHead 
              users={users}
              selectedUsers={selectedUsers}
              onSelectAll={handleSelectAll}
            />
            <UserTableBody 
              users={filteredUsers}
              selectedUsers={selectedUsers}
              onSelect={handleRowSelection}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </table>
        </div>
      </div>
    </div>
  );
}

// Re-export AdminUser type to maintain backward compatibility
export { type AdminUser } from './user-management/types';
