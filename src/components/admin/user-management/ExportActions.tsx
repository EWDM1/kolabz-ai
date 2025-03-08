
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ExportActionsProps, AdminUser } from "./types";

export function ExportActions({ selectedUsers = [], allUsers = [], users = [] }: ExportActionsProps) {
  const { toast } = useToast();
  // Use either users or allUsers, giving priority to users for backward compatibility
  const usersToExport: AdminUser[] = users?.length ? users : (allUsers || []);

  const handleExport = () => {
    // Simulate an export process
    toast({
      title: "Export successful",
      description: `${usersToExport.length} users have been exported to CSV`,
    });

    // Here you would implement the actual export functionality
    console.log("Exporting users:", usersToExport);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
  );
}
