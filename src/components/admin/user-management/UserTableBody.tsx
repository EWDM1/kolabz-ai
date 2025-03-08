
import { UserTableRow } from "./UserTableRow";
import { AdminUser } from "./types";

interface UserTableBodyProps {
  users: AdminUser[];
  selectedUsers: string[];
  onSelect: (userId: string) => void;
  onEdit?: (user: AdminUser) => void;
  onDelete?: (user: AdminUser) => void;
}

export function UserTableBody({ 
  users, 
  selectedUsers, 
  onSelect, 
  onEdit, 
  onDelete 
}: UserTableBodyProps) {
  if (users.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={7} className="py-8 text-center text-muted-foreground">
            No users found matching your search criteria.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {users.map((user) => (
        <UserTableRow
          key={user.id}
          user={user}
          isSelected={selectedUsers.includes(user.id)}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </tbody>
  );
}
