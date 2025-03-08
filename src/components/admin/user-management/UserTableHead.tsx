
import { AdminUser } from "./types";

interface UserTableHeadProps {
  users: AdminUser[];
  selectedUsers: string[];
  onSelectAll: (selected: boolean) => void;
}

export function UserTableHead({ 
  users, 
  selectedUsers, 
  onSelectAll 
}: UserTableHeadProps) {
  const allSelected = users.length > 0 && selectedUsers.length === users.length;
  const someSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;
  
  return (
    <thead className="bg-muted/50">
      <tr className="border-b">
        <th className="py-3 px-4 text-left">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-primary focus:ring-primary/30"
            checked={allSelected}
            ref={input => {
              if (input) {
                input.indeterminate = someSelected;
              }
            }}
            onChange={(e) => onSelectAll(e.target.checked)}
            disabled={users.length === 0}
          />
        </th>
        <th className="py-3 px-4 text-left font-medium">Name</th>
        <th className="py-3 px-4 text-left font-medium">Email</th>
        <th className="py-3 px-4 text-left font-medium">Role</th>
        <th className="py-3 px-4 text-left font-medium">Status</th>
        <th className="py-3 px-4 text-left font-medium">Last Active</th>
        <th className="py-3 px-4 text-right font-medium">Actions</th>
      </tr>
    </thead>
  );
}
