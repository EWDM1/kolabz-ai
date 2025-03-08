
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UserRoleBadgeProps {
  role: string;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  let badgeClass = '';
  let label = role;
  
  switch (role) {
    case 'admin':
      badgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      break;
    case 'superadmin':
      badgeClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      break;
    case 'user':
      badgeClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      label = 'User';
      break;
    default:
      badgeClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }

  return (
    <Badge className={cn("font-normal capitalize", badgeClass)}>
      {label}
    </Badge>
  );
}
