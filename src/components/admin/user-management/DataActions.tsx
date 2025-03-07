
import { Button } from "@/components/ui/button";
import { Filter, Trash2 } from "lucide-react";
import { ExportActions } from "./ExportActions";
import { ImportActions } from "./ImportActions";

interface DataActionsProps {
  onFilter: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
}

export function DataActions({ onFilter, onDeleteSelected, selectedCount }: DataActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onFilter}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <ExportActions />
        <ImportActions />
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
