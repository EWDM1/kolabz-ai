
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Check, Download, FileText } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
}

interface BillingHistoryCardProps {
  handleDownloadInvoice: (invoiceId: string) => void;
}

export const BillingHistoryCard = ({ handleDownloadInvoice }: BillingHistoryCardProps) => {
  const { t } = useLanguage();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real implementation, you would fetch actual invoices from Stripe
    // via your backend or Supabase Edge Function
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        // This would be replaced with real invoice data in production
        setInvoices([]);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("billing.history.title", "Billing History")}</CardTitle>
          <CardDescription>{t("billing.history.description", "View and download past invoices")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">{t("billing.loading", "Loading invoices...")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("billing.history.title", "Billing History")}</CardTitle>
        <CardDescription>{t("billing.history.description", "View and download past invoices")}</CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? (
          <div className="rounded-lg border">
            <div className="grid grid-cols-4 p-4 bg-muted text-sm font-medium">
              <div>{t("billing.date", "Date")}</div>
              <div>{t("billing.amount", "Amount")}</div>
              <div>{t("billing.status", "Status")}</div>
              <div className="text-right">{t("billing.invoice", "Invoice")}</div>
            </div>
            <Separator />
            {invoices.map((invoice, i) => (
              <div key={invoice.id}>
                <div className="grid grid-cols-4 p-4 text-sm items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {invoice.date}
                  </div>
                  <div>{invoice.amount}</div>
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Check className="h-3 w-3" /> {invoice.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 gap-1"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      <Download className="h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </div>
                {i < invoices.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border rounded-lg">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="text-sm font-medium mb-1">{t("billing.no_invoices.title", "No invoices yet")}</h3>
            <p className="text-sm text-muted-foreground">{t("billing.no_invoices.description", "Your billing history will appear here")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
