
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Settings as SettingsIcon,
  LogOut,
  User,
  CreditCard,
  Clock,
  ArrowRight,
  Download,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const UserSubscription = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample data for subscription
  const subscription = {
    plan: "Pro",
    status: "active",
    startDate: "July 12, 2023",
    nextBillingDate: "August 12, 2023",
    amount: "$10.00",
    paymentMethod: "Visa ending in 4242",
    features: [
      "Unlimited prompt optimizations",
      "Unlimited prompt library",
      "Access to all templates",
      "1-click export to any platform",
    ],
  };

  // Sample data for billing history
  const billingHistory = [
    {
      id: "INV-001",
      date: "July 12, 2023",
      amount: "$10.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "June 12, 2023",
      amount: "$10.00",
      status: "Paid",
    },
    {
      id: "INV-003",
      date: "May 12, 2023",
      amount: "$10.00",
      status: "Paid",
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const handleCancelSubscription = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period."
    );
    
    if (confirmed) {
      toast({
        title: "Subscription canceled",
        description: "Your subscription has been canceled and will end on August 12, 2023.",
      });
    }
  };

  const handleChangePlan = () => {
    navigate("/user-change-plan");
  };

  const handleUpdatePayment = () => {
    toast({
      title: "Update payment method",
      description: "This feature is coming soon.",
    });
  };

  return (
    <div className="min-h-screen bg-[#080c16] text-white">
      {/* Dashboard header */}
      <header className="border-b border-gray-800 bg-[#0a101e]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/df8a7871-32f3-4d83-826c-be5a1d06f2f1.png" 
              alt="Kolabz Logo" 
              className="h-8" 
            />
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm font-medium hidden md:inline-block text-gray-300">
                John Doe
              </span>
              <div className="h-8 w-8 rounded-full bg-gray-700 text-gray-200 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Sidebar */}
        <div className="w-64 min-h-full bg-[#0a101e] border-r border-gray-800 flex-shrink-0 hidden md:block">
          <div className="py-6 px-4">
            <nav className="space-y-1">
              <Link
                to="/user-dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/user-prompts"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <ListChecks className="h-5 w-5" />
                <span>My Prompts</span>
              </Link>
              <Link
                to="/user-settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full"
              >
                <SettingsIcon className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-[#131c2e] w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          <div className="px-4 pt-6 pb-8 border-t border-gray-800">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
              SUBSCRIPTION
            </h4>
            <div className="bg-[#131c2e] rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pro Plan</span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-xs text-gray-400 mb-3">
                Next billing on Aug 12, 2023
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs bg-[#1a2235] border-gray-700 text-gray-300 hover:bg-[#252e3f]" 
              >
                Manage Subscription
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-[#080c16]">
          <div className="container mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                <CreditCard className="mr-2 h-6 w-6 text-blue-400" />
                Subscription Management
              </h1>
              <p className="text-gray-400">
                View and manage your subscription plan, billing history, and payment methods
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
              <Card className="bg-[#0a101e] border-gray-800 md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Current Plan</CardTitle>
                      <CardDescription className="text-gray-400">
                        Your subscription details
                      </CardDescription>
                    </div>
                    <span className="text-sm px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      {subscription.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">{subscription.plan} Plan</h3>
                      <p className="text-blue-400 font-medium text-lg mb-3">{subscription.amount}/month</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Started on {subscription.startDate}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Next billing on {subscription.nextBillingDate}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span>{subscription.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-300 mb-2">Features included:</h3>
                      <ul className="space-y-2">
                        {subscription.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                    onClick={handleChangePlan}
                  >
                    Change Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
                    onClick={handleUpdatePayment}
                  >
                    Update Payment Method
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full sm:w-auto"
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-[#0a101e] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Plan Comparison</CardTitle>
                  <CardDescription className="text-gray-400">
                    See how your plan compares
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Free Trial</span>
                      <span className="text-gray-400">$0/mo</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#131c2e] p-2 rounded-md">
                      <span className="text-blue-400 font-medium">Pro (Current)</span>
                      <span className="text-blue-400 font-medium">$10/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Team Plan</span>
                      <span className="text-gray-400">$24/mo</span>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-800 my-4" />
                  
                  <div className="text-center">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleChangePlan}
                    >
                      View All Plans
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#0a101e] border-gray-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Billing History</CardTitle>
                <CardDescription className="text-gray-400">
                  Your recent invoices and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase text-gray-400 border-b border-gray-800">
                      <tr>
                        <th className="px-4 py-3">Invoice</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {billingHistory.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-[#0f1525]">
                          <td className="px-4 py-3 text-white">{invoice.id}</td>
                          <td className="px-4 py-3 text-gray-300">{invoice.date}</td>
                          <td className="px-4 py-3 text-gray-300">{invoice.amount}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-gray-300 hover:bg-[#1a2235]"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0a101e] border-gray-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
                <CardDescription className="text-gray-400">
                  Have questions about your subscription?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  If you have any questions about billing, plans, or need assistance, our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
                  >
                    Contact Support
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
                  >
                    View Billing FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSubscription;
