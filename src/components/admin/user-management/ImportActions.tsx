
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImportActionsProps } from "./types";

export function ImportActions({ onImportComplete }: ImportActionsProps) {
  const { toast } = useToast();

  const handleImport = async () => {
    // Simulate an import process
    toast({
      title: "Import started",
      description: "Your user import has been initiated",
    });

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Import complete",
      description: "Your users have been imported successfully",
    });

    // Call the callback if provided
    if (onImportComplete) {
      await onImportComplete();
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleImport}>
      <Upload className="mr-2 h-4 w-4" />
      Import
    </Button>
  );
}
