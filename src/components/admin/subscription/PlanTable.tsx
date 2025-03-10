
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "./table/TableActions";
import { DeleteConfirmDialog } from "./table/DeleteConfirmDialog";
import { EmptyState } from "./table/EmptyState";
import { SubscriptionPlan } from "@/hooks/subscription/use-subscription-plans";

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

  const formatCurrency = (amount: number, currency: string = 'usd') => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    
    return formatter.format(amount / 100);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
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
          <TableBody>
            {plans.length === 0 && !loading ? (
              <EmptyState />
            ) : (
              plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.trial_days} days</TableCell>
                  <TableCell>{formatCurrency(plan.price_monthly, plan.currency)}</TableCell>
                  <TableCell>{formatCurrency(plan.price_annual, plan.currency)}</TableCell>
                  <TableCell>
                    <Badge variant={plan.active ? "default" : "secondary"}>
                      {plan.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <TableActions
                      plan={plan}
                      onEdit={onEdit}
                      onDelete={handleDeleteClick}
                      onToggleStatus={onToggleStatus}
                      onSyncWithStripe={onSyncWithStripe}
                      stripeEnabled={stripeEnabled}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
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
