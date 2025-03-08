
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
  users: AdminUser[];
  loading?: boolean;
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onEdit?: (user: AdminUser) => void;
  onDelete?: (user: AdminUser) => void;
}

export interface UserManagementHeaderProps {
  selectedCount: number;
  onDelete: () => void;
  onRefresh: () => Promise<void> | void;
  onDeleteSelected: () => void;
  toggleFilterVisible: () => void;
}

export interface ImportActionsProps {
  onImportComplete?: () => Promise<void> | void;
}

export interface ExportActionsProps {
  users?: AdminUser[];
}

export interface DataActionsProps {
  onFilter: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
}

export interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isMultiple?: boolean;
  title?: string;
  description?: string;
  count?: number;
}
