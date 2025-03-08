
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ExportActionsProps } from "./types";

export function ExportActions({ users = [] }: ExportActionsProps) {
  const { toast } = useToast();

  const handleExport = () => {
    // Simulate an export process
    toast({
      title: "Export successful",
      description: `${users.length} users have been exported to CSV`,
    });

    // Here you would implement the actual export functionality
    console.log("Exporting users:", users);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
  );
}
