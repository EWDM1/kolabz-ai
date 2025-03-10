
import { 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export function TableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Trial Period</TableHead>
        <TableHead>Monthly Price</TableHead>
        <TableHead>Annual Price</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
