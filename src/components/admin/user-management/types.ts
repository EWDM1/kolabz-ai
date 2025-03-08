
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
