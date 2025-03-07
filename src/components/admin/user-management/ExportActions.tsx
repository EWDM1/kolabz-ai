
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { exportUsersAsJson, exportUsersAsCsv } from "@/utils/exportUtils";

export function ExportActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportUsersAsJson}>
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportUsersAsCsv}>
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
