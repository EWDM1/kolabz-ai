
import { CheckCircle, XCircle } from "lucide-react";

interface UserStatusBadgeProps {
  status: "active" | "inactive";
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  if (status === "inactive") {
    return (
      <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
        <XCircle className="h-4 w-4" />
        Inactive
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
      <CheckCircle className="h-4 w-4" />
      Active
    </span>
  );
}
