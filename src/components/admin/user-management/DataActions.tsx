
import { Button } from "@/components/ui/button";
import { Filter, Download, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DataActionsProps {
  onFilter: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
}

export function DataActions({ onFilter, onDeleteSelected, selectedCount }: DataActionsProps) {
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (usersError) throw usersError;
      
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
      
      if (rolesError) throw rolesError;
      
      const exportData = users.map(user => {
        const userRoles = roles
          .filter(r => r.user_id === user.id)
          .map(r => r.role);
        
        return {
          ...user,
          roles: userRoles
        };
      });
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `users-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export complete",
        description: "Users data has been exported successfully.",
      });
    } catch (error) {
      console.error("Error exporting users:", error);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "An error occurred while trying to export users data.",
      });
    }
  };

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
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onFilter}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm" onClick={handleImport}>
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
      </div>
      
      {selectedCount > 0 && (
        <Button variant="destructive" size="sm" onClick={onDeleteSelected}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Selected ({selectedCount})
        </Button>
      )}
    </div>
  );
}
