
import { 
  TableHead, 
  TableHeader as UITableHeader, 
  TableRow 
} from "@/components/ui/table";

export function SubscriptionTableHeader() {
  return (
    <UITableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Trial Period</TableHead>
        <TableHead>Monthly Price</TableHead>
        <TableHead>Annual Price</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </UITableHeader>
  );
}
