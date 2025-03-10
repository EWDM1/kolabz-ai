
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "./TableActions";
import { EmptyState } from "./EmptyState";
import { SubscriptionPlan } from "@/hooks/subscription/use-subscription-plans";

interface TableBodyContentProps {
  plans: SubscriptionPlan[];
  loading: boolean;
  formatCurrency: (amount: number, currency?: string) => string;
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (planId: string) => void;
  onToggleStatus: (planId: string, active: boolean) => void;
  onSyncWithStripe: (planId: string) => void;
  stripeEnabled: boolean;
}

export function TableBodyContent({
  plans,
  loading,
  formatCurrency,
  onEdit,
  onDelete,
  onToggleStatus,
  onSyncWithStripe,
  stripeEnabled
}: TableBodyContentProps) {
  return (
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
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
                onSyncWithStripe={onSyncWithStripe}
                stripeEnabled={stripeEnabled}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
}
