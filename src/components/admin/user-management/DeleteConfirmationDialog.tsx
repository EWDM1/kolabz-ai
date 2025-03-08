
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isMultiple?: boolean;
  title?: string;
  description?: string;
  count?: number;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isMultiple = false,
  title,
  description,
  count = 0
}) => {
  // Default title and description based on whether multiple items are being deleted
  const defaultTitle = isMultiple
    ? `Delete ${count || 'multiple'} users?`
    : "Delete user?";
  
  const defaultDescription = isMultiple
    ? `Are you sure you want to delete ${count || 'these'} users? This action cannot be undone.`
    : "Are you sure you want to delete this user? This action cannot be undone.";

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || defaultTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
