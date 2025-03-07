
import { Shield, Crown, User as UserIcon } from "lucide-react";
import { UserRole } from "@/components/admin/feature-management/types";

interface UserRoleBadgeProps {
  role: UserRole;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const getBadgeClass = () => {
    switch (role) {
      case "superadmin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "user":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  const getRoleIcon = () => {
    switch (role) {
      case "superadmin":
        return <Crown className="h-4 w-4 mr-1.5" />;
      case "admin":
        return <Shield className="h-4 w-4 mr-1.5" />;
      case "user":
      default:
        return <UserIcon className="h-4 w-4 mr-1.5" />;
    }
  };

  return (
    <div className="flex items-center">
      {getRoleIcon()}
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClass()}`}>
        {role}
      </span>
    </div>
  );
}
