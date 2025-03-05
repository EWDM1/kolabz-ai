
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Settings,
  LogOut,
  User,
  CreditCard,
  Calendar,
  Download,
  Clock,
  Check,
  X,
  AlertCircle,
  ArrowLeft,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/LanguageContext";
import { useAuth } from "@/components/AuthContext";
import { 
  isTestMode, 
  toggleStripeTestMode 
} from "@/integrations/stripe/stripeConfig";
import { 
  cancelSubscription, 
  formatCardDetails
} from "@/integrations/stripe/stripeService";
import { PaymentMethodFormWrapper } from "@/components/stripe/PaymentMethodForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

const ManageSubscription = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { isAdmin, isSuperAdmin } = useAuth();
  const [testMode, setTestMode] = useState(isTestMode());
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  
  // Admin check for test mode visibility
  const canAccessTestMode = isAdmin || isSuperAdmin;
  
  // Mock payment method data - in a real app, this would come from your backend
  const [paymentMethod, setPaymentMethod] = useState({
    last4: '4242',
    expiry: '12/24'
  });

  useEffect(() => {
    // In a real implementation, you would fetch the customer's payment method
    // from your backend/Stripe
    console.log("Stripe test mode is", testMode ? "enabled" : "disabled");
  }, [testMode]);

  const handleLogout = () => {
    toast({
      title: t("logout.title", "Logged out"),
      description: t("logout.description", "You have been successfully logged out"),
    });
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const handleToggleTestMode = () => {
    const newMode = !testMode;
    toggleStripeTestMode(newMode);
    setTestMode(newMode);
    
    toast({
      title: newMode ? "Test Mode Enabled" : "Live Mode Enabled",
      description: newMode 
        ? "You are now using Stripe in test mode. No real charges will be made." 
        : "Warning: You are now using Stripe in live mode. Real charges will be made.",
      variant: newMode ? "default" : "destructive",
    });
  };
  
  const handleUpdateCard = async (paymentMethod: any) => {
    setLoading(true);
    
    try {
      // In a real implementation, you would send this payment method to your backend
      console.log("Payment method updated:", paymentMethod);
      
      // Update local state with new card details
      setPaymentMethod({
        last4: paymentMethod.card.last4,
        expiry: `${paymentMethod.card.exp_month.toString().padStart(2, '0')}/${paymentMethod.card.exp_year.toString().slice(-2)}`
      });
      
      // Close the dialog
      setPaymentDialogOpen(false);
      
      toast({
        title: t("payment.updated.title", "Card updated"),
        description: t("payment.updated.description", "Your payment method has been updated successfully"),
      });
    } catch (error) {
      console.error("Error updating payment method:", error);
      toast({
        variant: "destructive",
        title: "Error updating card",
        description: "There was a problem updating your payment method. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    
    try {
      // Call the cancellation service
      const result = await cancelSubscription();
      
      if (result.success) {
        setCancelDialogOpen(false);
        
        toast({
          title: "Subscription Cancelled",
          description: "Your subscription has been cancelled successfully. You will have access until the end of your billing period.",
        });
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast({
        variant: "destructive",
        title: "Error cancelling subscription",
        description: "There was a problem cancelling your subscription. Please try again or contact support.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error);
    toast({
      variant: "destructive",
      title: "Payment Error",
      description: error.message || "There was a problem processing your payment. Please try again.",
    });
  };

  const handleDownloadInvoice = (invoiceDate: string) => {
    toast({
      title: t("invoice.download.title", "Invoice downloaded"),
      description: t("invoice.download.description", `Invoice for ${invoiceDate} has been downloaded`),
    });
  };

  return (
    <div className="min-h-screen bg-background/95">
      {/* Dashboard header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            {theme === 'dark' ? (
              <img 
                src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            ) : (
              <img 
                src="/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png" 
                alt="Kolabz Logo" 
                className="h-8" 
              />
            )}
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => handleNavigation("/my-settings")}
            >
              <span className="text-sm font-medium hidden md:inline-block">
                John Doe
              </span>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
              <div className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-prompts")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <ListChecks className="h-5 w-5" />
                    <span>My Prompts</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-settings")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>

              <div className="p-4 border-t border-border">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  SUBSCRIPTION
                </h4>
                <div className="bg-primary/10 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Pro Plan</span>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Next billing on Aug 12, 2023
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs bg-card">
                    Manage Subscription
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              
              {/* Test mode toggle - only visible to admins */}
              {canAccessTestMode && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleToggleTestMode}
                  className={`gap-1 ${testMode ? 'border-orange-300 text-orange-600 hover:text-orange-700 hover:border-orange-400 dark:border-orange-800 dark:text-orange-500' : ''}`}
                >
                  {testMode ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  {testMode ? 'Test Mode' : 'Live Mode'}
                </Button>
              )}
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{t("subscription.title", "Manage Subscription")}</h1>
            <p className="text-muted-foreground mb-6">{t("subscription.description", "Manage your plan, billing information and view payment history")}</p>
            
            {/* Test mode banner - only visible when test mode is active AND user is admin */}
            {testMode && canAccessTestMode && (
              <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300 p-4 rounded-lg mb-6 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Stripe Test Mode Active</h3>
                  <p className="text-sm mt-1">
                    You're currently in test mode. No real charges will be made. Use the test card <span className="font-medium">4242 4242 4242 4242</span> with any future expiration date and any CVC.
                  </p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current plan card */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("subscription.current_plan.title", "Current Plan")}</CardTitle>
                  <CardDescription>{t("subscription.current_plan.description", "Review your current subscription details")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div>
                      <h3 className="font-bold text-lg">{t("subscription.pro_plan", "Pro Plan")}</h3>
                      <p className="text-sm text-muted-foreground">{t("subscription.pro_plan.price", "$10.00/month, billed annually")}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1">
                      <Check className="h-3 w-3" /> {t("subscription.status.active", "Active")}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("subscription.billing_cycle", "Billing cycle")}</span>
                      <span className="font-medium">{t("subscription.billing_cycle.annual", "Annual (save 16%)")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("subscription.next_billing", "Next billing date")}</span>
                      <span className="font-medium">August 12, 2023</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("subscription.amount_due", "Amount due")}</span>
                      <span className="font-medium">$100.00</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/change-plan")}>
                    {t("subscription.change_plan", "Change Plan")}
                  </Button>
                  
                  <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
                        {t("subscription.cancel", "Cancel Subscription")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Subscription</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                          Your subscription will remain active until the end of your current billing period on <span className="font-medium">August 12, 2023</span>.
                        </p>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Keep Subscription</Button>
                        </DialogClose>
                        <Button 
                          variant="destructive" 
                          onClick={handleCancelSubscription}
                          disabled={loading}
                        >
                          {loading ? "Processing..." : "Confirm Cancellation"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
              
              {/* Payment method card */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("payment.title", "Payment Method")}</CardTitle>
                  <CardDescription>{t("payment.description", "Manage your payment information")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 bg-background rounded flex items-center justify-center">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• {paymentMethod.last4}</p>
                        <p className="text-xs text-muted-foreground">Expires {paymentMethod.expiry}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                      {t("payment.status.default", "Default")}
                    </span>
                  </div>
                  
                  <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        {t("payment.update", "Update Payment Method")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Payment Method</DialogTitle>
                        <DialogDescription>
                          Enter your new card details below
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <PaymentMethodFormWrapper
                          onSuccess={handleUpdateCard}
                          onError={handlePaymentError}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
            
            {/* Billing history card */}
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
                  {[
                    { date: "Jul 12, 2023", amount: "$10.00", status: "Paid" },
                    { date: "Jun 12, 2023", amount: "$10.00", status: "Paid" },
                    { date: "May 12, 2023", amount: "$10.00", status: "Paid" },
                    { date: "Apr 12, 2023", amount: "$10.00", status: "Paid" },
                  ].map((invoice, i) => (
                    <div key={i}>
                      <div className="grid grid-cols-4 p-4 text-sm items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {invoice.date}
                        </div>
                        <div>${invoice.amount}</div>
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
                      {i < 3 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* FAQ Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t("faq.title", "Frequently Asked Questions")}</CardTitle>
                <CardDescription>{t("faq.description", "Common questions about billing and subscriptions")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">{t("faq.upgrade.title", "How can I upgrade my plan?")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("faq.upgrade.description", "You can upgrade your plan at any time by clicking the \"Change Plan\" button above. The price difference will be prorated for the remainder of your billing cycle.")}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">{t("faq.charge.title", "When will I be charged?")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("faq.charge.description", "Your subscription will renew automatically on your billing date. For annual plans, you'll be charged once per year on the anniversary of your signup date.")}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">{t("faq.cancel.title", "How do I cancel my subscription?")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("faq.cancel.description", "You can cancel your subscription at any time. Click the \"Cancel Subscription\" button above or contact our support team. Note that cancelling stops automatic renewal but you'll still have access until the end of your current billing period.")}
                  </p>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg flex gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">{t("faq.help.title", "Need help?")}</span>{" "}
                    {t("faq.help.description", "Contact our support team at")}{" "}
                    <a href="mailto:support@kolabz.com" className="text-primary hover:underline">
                      support@kolabz.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;
