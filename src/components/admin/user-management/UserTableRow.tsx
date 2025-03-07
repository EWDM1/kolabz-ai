
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { AdminUser } from "./types";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserStatusBadge } from "./UserStatusBadge";

interface UserTableRowProps {
  user: AdminUser;
  isSelected: boolean;
  onSelect: (userId: string) => void;
  onEdit?: (user: AdminUser) => void;
  onDelete?: (userId: string) => void;
}

export function UserTableRow({ 
  user, 
  isSelected, 
  onSelect, 
  onEdit, 
  onDelete 
}: UserTableRowProps) {
  return (
    <tr key={user.id} className="border-b hover:bg-muted/50">
      <td className="py-3 px-4">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onSelect(user.id)}
        />
      </td>
      <td className="py-3 px-4">{user.name}</td>
      <td className="py-3 px-4">{user.email}</td>
      <td className="py-3 px-4">
        <UserRoleBadge role={user.role} />
      </td>
      <td className="py-3 px-4">
        <UserStatusBadge status={user.status} />
      </td>
      <td className="py-3 px-4">{user.lastActive}</td>
      <td className="py-3 px-4 text-right">
        <div className="flex justify-end space-x-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
              onClick={() => onEdit(user)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              onClick={() => onDelete(user.id)}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
