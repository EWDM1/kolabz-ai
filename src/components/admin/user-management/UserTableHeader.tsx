
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UserTableHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function UserTableHeader({ searchQuery, onSearchChange }: UserTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          className="pl-8 w-full sm:w-64"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
