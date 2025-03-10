
import { useState } from "react";
import { Table } from "@/components/ui/table";
import { DeleteConfirmDialog } from "./table/DeleteConfirmDialog";
import { SubscriptionTableHeader } from "./table/TableHeader";
import { TableBodyContent } from "./table/TableBodyContent";
import { SubscriptionPlan } from "@/hooks/subscription/use-subscription-plans";
import { formatCurrency } from "./utils/formatCurrency";

interface PlanTableProps {
  plans: SubscriptionPlan[];
  loading: boolean;
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (planId: string) => void;
  onToggleStatus: (planId: string, active: boolean) => void;
  onSyncWithStripe: (planId: string) => void;
  stripeEnabled: boolean;
}

export function PlanTable({
  plans,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
  onSyncWithStripe,
  stripeEnabled
}: PlanTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const handleDeleteClick = (planId: string) => {
    setPlanToDelete(planId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (planToDelete) {
      onDelete(planToDelete);
      setPlanToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <SubscriptionTableHeader />
          <TableBodyContent
            plans={plans}
            loading={loading}
            formatCurrency={formatCurrency}
            onEdit={onEdit}
            onDelete={handleDeleteClick}
            onToggleStatus={onToggleStatus}
            onSyncWithStripe={onSyncWithStripe}
            stripeEnabled={stripeEnabled}
          />
        </Table>
      </div>
      
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
