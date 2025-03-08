
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Check, Download } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface BillingHistoryCardProps {
  handleDownloadInvoice: (invoiceDate: string) => void;
}

export const BillingHistoryCard = ({ handleDownloadInvoice }: BillingHistoryCardProps) => {
  const { t } = useLanguage();
  
  const invoices = [
    { date: "Jul 12, 2023", amount: "$10.00", status: "Paid" },
    { date: "Jun 12, 2023", amount: "$10.00", status: "Paid" },
    { date: "May 12, 2023", amount: "$10.00", status: "Paid" },
    { date: "Apr 12, 2023", amount: "$10.00", status: "Paid" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("billing.history.title", "Billing History")}</CardTitle>
        <CardDescription>{t("billing.history.description", "View and download past invoices")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <div className="grid grid-cols-4 p-4 bg-muted text-sm font-medium">
            <div>{t("billing.date", "Date")}</div>
            <div>{t("billing.amount", "Amount")}</div>
            <div>{t("billing.status", "Status")}</div>
            <div className="text-right">{t("billing.invoice", "Invoice")}</div>
          </div>
          <Separator />
          {invoices.map((invoice, i) => (
            <div key={i}>
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
                    onClick={() => handleDownloadInvoice(invoice.date)}
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
      </CardContent>
    </Card>
  );
};
