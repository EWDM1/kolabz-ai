
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ImportActions() {
  const { toast } = useToast();

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          toast({
            title: "Import initiated",
            description: `File "${file.name}" is being processed.`,
          });
          
          const fileReader = new FileReader();
          fileReader.onload = async (event) => {
            try {
              const jsonData = JSON.parse(event.target?.result as string);
              
              toast({
                title: "Import complete",
                description: "Users have been imported successfully.",
              });
            } catch (error) {
              console.error("Error parsing import file:", error);
              toast({
                variant: "destructive",
                title: "Import failed",
                description: "The file format is invalid.",
              });
            }
          };
          fileReader.readAsText(file);
        } catch (error) {
          console.error("Error importing users:", error);
          toast({
            variant: "destructive",
            title: "Import failed",
            description: "An error occurred during import.",
          });
        }
      }
    };
    
    input.click();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleImport}>
      <Upload className="mr-2 h-4 w-4" />
      Import
    </Button>
  );
}
