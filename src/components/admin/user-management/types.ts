
import { UserRole } from "@/components/admin/feature-management/types";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: "active" | "inactive";
  lastLogin?: string;
  lastActive?: string;
}

export interface UserTableProps {
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onEdit?: (user: AdminUser) => void;
  onDelete?: (userId: string) => void;
}
