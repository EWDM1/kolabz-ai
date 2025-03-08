
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UserTableHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function UserTableHeader({ 
  searchQuery, 
  onSearchChange 
}: UserTableHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between pb-4 gap-4">
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
}
