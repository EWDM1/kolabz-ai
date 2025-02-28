
import { useState } from "react";
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
  ArrowLeft
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ManageSubscription = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const handleUpdateCard = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Card updated",
        description: "Your payment method has been updated successfully",
      });
    }, 1500);
  };

  const handleCancelSubscription = () => {
    toast({
      variant: "destructive",
      title: "Are you sure?",
      description: "Please contact support to cancel your subscription.",
    });
  };

  const handleDownloadInvoice = (invoiceDate: string) => {
    toast({
      title: "Invoice downloaded",
      description: `Invoice for ${invoiceDate} has been downloaded`,
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
              onClick={() => handleNavigation("/settings")}
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
                    onClick={() => handleNavigation("/dashboard")}
                    className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-left text-muted-foreground hover:bg-muted"
                  >
                    <ListChecks className="h-5 w-5" />
                    <span>My Prompts</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/settings")}
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
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Manage Subscription</h1>
            <p className="text-muted-foreground mb-6">Manage your plan, billing information and view payment history</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current plan card */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Review your current subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div>
                      <h3 className="font-bold text-lg">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">$10.00/month, billed annually</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1">
                      <Check className="h-3 w-3" /> Active
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Billing cycle</span>
                      <span className="font-medium">Annual (save 16%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next billing date</span>
                      <span className="font-medium">August 12, 2023</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount due</span>
                      <span className="font-medium">$100.00</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                  <Button variant="outline" className="w-full" onClick={() => handleNavigation("/change-plan")}>
                    Change Plan
                  </Button>
                  <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10" 
                    onClick={handleCancelSubscription}>
                    Cancel Subscription
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Payment method card */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 bg-background rounded flex items-center justify-center">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/24</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                      Default
                    </span>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-medium">Update Payment Method</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiration Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleUpdateCard} disabled={loading}>
                    {loading ? "Updating..." : "Update Payment Method"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Billing history card */}
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <div className="grid grid-cols-4 p-4 bg-muted text-sm font-medium">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div className="text-right">Invoice</div>
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
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about billing and subscriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">How can I upgrade my plan?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can upgrade your plan at any time by clicking the "Change Plan" button above. The 
                    price difference will be prorated for the remainder of your billing cycle.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">When will I be charged?</h3>
                  <p className="text-sm text-muted-foreground">
                    Your subscription will renew automatically on your billing date. For annual plans, 
                    you'll be charged once per year on the anniversary of your signup date.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">How do I cancel my subscription?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can cancel your subscription at any time. Click the "Cancel Subscription" button above
                    or contact our support team. Note that cancelling stops automatic renewal but you'll still
                    have access until the end of your current billing period.
                  </p>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg flex gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Need help?</span> Contact our support team at{" "}
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
