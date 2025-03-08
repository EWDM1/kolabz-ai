
import React from "react";
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BillingTabProps {
  onManageSubscription: () => void;
  onChangePlan: () => void;
  onUpdatePaymentMethod: () => void;
}

const BillingTab = ({ 
  onManageSubscription, 
  onChangePlan, 
  onUpdatePaymentMethod 
}: BillingTabProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          Current plan and payment information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-medium">Pro Plan</h3>
              <p className="text-primary font-medium text-lg">$10.00/month</p>
            </div>
            <span className="text-sm px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
              Active
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Next billing date: August 12, 2023
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onManageSubscription}>
              Manage Subscription
            </Button>
            <Button variant="outline" onClick={onChangePlan}>
              Change Plan
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Payment Method</h3>
          <div className="flex items-center p-3 bg-muted rounded-md border">
            <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/25</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-2" onClick={onUpdatePaymentMethod}>
            Update Payment Method
          </Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Billing History</h3>
          <div className="bg-muted rounded-md overflow-hidden">
            <div className="text-xs text-muted-foreground uppercase border-b px-4 py-2 grid grid-cols-3">
              <span>Date</span>
              <span>Amount</span>
              <span className="text-right">Status</span>
            </div>
            <div className="text-sm p-4 grid grid-cols-3 border-b">
              <span>Jul 12, 2023</span>
              <span>$10.00</span>
              <span className="text-right text-green-600 dark:text-green-400">Paid</span>
            </div>
            <div className="text-sm p-4 grid grid-cols-3 border-b">
              <span>Jun 12, 2023</span>
              <span>$10.00</span>
              <span className="text-right text-green-600 dark:text-green-400">Paid</span>
            </div>
            <div className="text-sm p-4 grid grid-cols-3">
              <span>May 12, 2023</span>
              <span>$10.00</span>
              <span className="text-right text-green-600 dark:text-green-400">Paid</span>
            </div>
          </div>
          <Button 
            className="w-full mt-2" 
            variant="outline" 
            size="sm" 
            onClick={onManageSubscription}
          >
            View All Invoices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
