
interface UserTableHeadProps {
  users: any[];
  selectedUsers: string[];
  onSelectAll: (selected: boolean) => void;
}

export function UserTableHead({ users, selectedUsers, onSelectAll }: UserTableHeadProps) {
  return (
    <thead>
      <tr className="bg-muted border-b">
        <th className="py-3 px-4 text-left font-medium">
          <input 
            type="checkbox" 
            className="rounded border-gray-300"
            onChange={(e) => onSelectAll(e.target.checked)}
            checked={selectedUsers.length === users.length && users.length > 0}
          />
        </th>
        <th className="py-3 px-4 text-left font-medium">User</th>
        <th className="py-3 px-4 text-left font-medium">Email</th>
        <th className="py-3 px-4 text-left font-medium">Role</th>
        <th className="py-3 px-4 text-left font-medium">Status</th>
        <th className="py-3 px-4 text-left font-medium">Last Active</th>
        <th className="py-3 px-4 text-right font-medium">Actions</th>
      </tr>
    </thead>
  );
}
