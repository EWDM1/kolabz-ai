
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterValues } from "@/hooks/use-user-management-page";

interface UserFiltersPanelProps {
  filterValues: FilterValues;
  onFilterChange: (field: keyof FilterValues, value: string) => void;
  onResetFilters: () => void;
}

export function UserFiltersPanel({
  filterValues,
  onFilterChange,
  onResetFilters
}: UserFiltersPanelProps) {
  return (
    <div className="border rounded-md p-4 mb-6">
      <h3 className="font-medium mb-3">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Input
            placeholder="Filter by name"
            value={filterValues.name || ''}
            onChange={(e) => onFilterChange('name', e.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="Filter by email"
            value={filterValues.email || ''}
            onChange={(e) => onFilterChange('email', e.target.value)}
          />
        </div>
        <div>
          <Select
            value={filterValues.role || ''}
            onValueChange={(value) => onFilterChange('role', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All roles</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="superadmin">Superadmin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            value={filterValues.status || ''}
            onValueChange={(value) => onFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onResetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
