
import React from "react";
import { CurrentPlanCard } from "@/components/subscription/CurrentPlanCard";
import { PaymentMethodCard } from "@/components/subscription/PaymentMethodCard";
import { BillingHistoryCard } from "@/components/subscription/BillingHistoryCard";
import { FAQCard } from "@/components/subscription/FAQCard";

interface SubscriptionCardsGridProps {
  handleCancelSubscription: () => Promise<void>;
  handleUpdateCard: (paymentMethod: any) => Promise<void>;
  handlePaymentError: (error: any) => void;
  handleDownloadInvoice: (invoiceDate: string) => void;
  paymentMethod: {
    last4: string;
    expiry: string;
  };
  loading: boolean;
}

export const SubscriptionCardsGrid = ({
  handleCancelSubscription,
  handleUpdateCard,
  handlePaymentError,
  handleDownloadInvoice,
  paymentMethod,
  loading
}: SubscriptionCardsGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current plan card */}
        <CurrentPlanCard 
          handleCancelSubscription={handleCancelSubscription}
          loading={loading}
        />
        
        {/* Payment method card */}
        <PaymentMethodCard 
          paymentMethod={paymentMethod}
          handleUpdateCard={handleUpdateCard}
          handlePaymentError={handlePaymentError}
        />
      </div>
      
      {/* Billing history card */}
      <BillingHistoryCard handleDownloadInvoice={handleDownloadInvoice} />
      
      {/* FAQ Card */}
      <FAQCard />
    </>
  );
};
