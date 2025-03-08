
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserFiltersPanelProps {
  filterValues: {
    name: string;
    email: string;
    role: string;
    status: string;
  };
  onFilterChange: (field: string, value: string) => void;
  onResetFilters: () => void;
}

export function UserFiltersPanel({
  filterValues,
  onFilterChange,
  onResetFilters
}: UserFiltersPanelProps) {
  return (
    <div className="bg-muted/40 p-4 rounded-lg mb-4 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="name-filter" className="text-sm font-medium mb-1 block">
            Name
          </label>
          <Input
            id="name-filter"
            placeholder="Filter by name"
            value={filterValues.name}
            onChange={(e) => onFilterChange("name", e.target.value)}
            className="bg-background"
          />
        </div>
        
        <div>
          <label htmlFor="email-filter" className="text-sm font-medium mb-1 block">
            Email
          </label>
          <Input
            id="email-filter"
            placeholder="Filter by email"
            value={filterValues.email}
            onChange={(e) => onFilterChange("email", e.target.value)}
            className="bg-background"
          />
        </div>
        
        <div>
          <label htmlFor="role-filter" className="text-sm font-medium mb-1 block">
            Role
          </label>
          <Select
            value={filterValues.role}
            onValueChange={(value) => onFilterChange("role", value)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All roles</SelectItem>
              <SelectItem value="superadmin">Superadmin</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="status-filter" className="text-sm font-medium mb-1 block">
            Status
          </label>
          <Select
            value={filterValues.status}
            onValueChange={(value) => onFilterChange("status", value)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={onResetFilters} size="sm">
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
