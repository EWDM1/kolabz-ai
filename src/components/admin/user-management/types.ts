
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  subscription?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserTableProps {
  users: AdminUser[];
  loading: boolean;
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
  onEdit?: (user: AdminUser) => void;
  onDelete?: (user: AdminUser) => void;
}

export interface DeleteDialogData {
  isMultiple: boolean;
  userId?: string;
}

// Update action props interfaces to match component implementations
export interface DataActionsProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onRefresh: () => void;
  onFilter: () => void; // Add missing onFilter prop
}

export interface ExportActionsProps {
  selectedUsers?: string[]; // Make optional to accommodate usage in components
  allUsers?: AdminUser[];  // Make optional to accommodate usage in components
  users?: AdminUser[];     // Add users property for backward compatibility
}

export interface ImportActionsProps {
  onImportComplete?: () => void; // Make optional
}
