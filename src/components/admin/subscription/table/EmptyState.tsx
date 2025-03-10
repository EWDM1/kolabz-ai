
import { TableCell, TableRow } from "@/components/ui/table";

export function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center">
        No subscription plans found
      </TableCell>
    </TableRow>
  );
}
