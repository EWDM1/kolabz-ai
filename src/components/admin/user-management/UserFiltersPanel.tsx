
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface FilterValues {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface UserFiltersPanelProps {
  filterValues: FilterValues;
  onFilterChange: (field: string, value: string) => void;
  onResetFilters: () => void;
}

export const UserFiltersPanel: React.FC<UserFiltersPanelProps> = ({
  filterValues,
  onFilterChange,
  onResetFilters
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Filter Users</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name-filter">Name</Label>
          <Input
            id="name-filter"
            value={filterValues.name}
            onChange={(e) => onFilterChange('name', e.target.value)}
            placeholder="Filter by name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email-filter">Email</Label>
          <Input
            id="email-filter"
            value={filterValues.email}
            onChange={(e) => onFilterChange('email', e.target.value)}
            placeholder="Filter by email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role-filter">Role</Label>
          <Select
            value={filterValues.role}
            onValueChange={(value) => onFilterChange('role', value)}
          >
            <SelectTrigger id="role-filter">
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="superadmin">Super Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select
            value={filterValues.status}
            onValueChange={(value) => onFilterChange('status', value)}
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={onResetFilters} className="ml-auto">
          Reset Filters
        </Button>
      </CardFooter>
    </Card>
  );
};
