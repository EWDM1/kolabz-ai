
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Settings as SettingsIcon,
  LogOut,
  User,
  CreditCard,
  Check,
  ArrowLeft,
  ChevronRight,
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
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const UserChangePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro"); // Default to current plan
  const { toast } = useToast();
  const navigate = useNavigate();

  const plans = [
    {
      id: "free",
      name: "Free Trial",
      price: "$0/month",
      description: "Basic features to get started",
      features: [
        "5 prompt optimizations",
        "Save up to 5 prompts",
        "Access to basic templates",
      ],
      limitations: [
        "No team collaboration",
        "Limited template access",
        "No priority support",
      ],
      cta: "Downgrade to Free",
      recommended: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$10/month",
      description: "Perfect for individual creators",
      features: [
        "Unlimited prompt optimizations",
        "Unlimited prompt library",
        "Access to all templates",
        "1-click export to any platform",
      ],
      limitations: ["No team collaboration"],
      cta: "Current Plan",
      recommended: true,
    },
    {
      id: "team",
      name: "Team",
      price: "$24/month",
      description: "Ideal for teams and businesses",
      features: [
        "Everything in Pro",
        "Team workspaces",
        "Collaboration features",
        "Custom templates",
        "Dedicated support",
      ],
      limitations: [],
      cta: "Upgrade to Team",
      recommended: false,
    },
  ];

  const handleChangePlan = () => {
    if (selectedPlan === "pro") {
      toast({
        title: "No changes made",
        description: "You're already on the Pro plan",
      });
      navigate("/user-subscription");
      return;
    }

    toast({
      title: "Plan change initiated",
      description: `You're switching to the ${
        plans.find((p) => p.id === selectedPlan)?.name
      } plan. This will take effect on your next billing date.`,
    });
    
    // Simulating API call delay
    setTimeout(() => {
      navigate("/user-subscription");
    }, 1000);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
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
                onClick={() => navigate("/user-subscription")}
              >
                Manage Subscription
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-[#080c16]">
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              className="mb-6 text-gray-400 hover:text-gray-300"
              onClick={() => navigate("/user-subscription")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Subscription
            </Button>

            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                <CreditCard className="mr-2 h-6 w-6 text-blue-400" />
                Change Your Plan
              </h1>
              <p className="text-gray-400">
                Select the plan that best fits your needs. Changes will take effect on your next billing cycle.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative overflow-hidden border-2 ${
                    selectedPlan === plan.id 
                      ? "border-blue-500 bg-[#0f1728]" 
                      : "border-gray-800 bg-[#0a101e] hover:bg-[#0f1525]"
                  } transition-all`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-bl">
                      Recommended
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white flex justify-between items-center">
                      {plan.name}
                      <div 
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === plan.id 
                            ? "border-blue-500 bg-blue-500" 
                            : "border-gray-600"
                        }`}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        {selectedPlan === plan.id && <Check className="h-3 w-3 text-white" />}
                      </div>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-white">{plan.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-400 mr-2">×</span>
                              <span className="text-sm text-gray-400">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        plan.id === "pro" 
                          ? "bg-gray-700 hover:bg-gray-600 cursor-default" 
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={plan.id === "pro"}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end items-center bg-[#0a101e] p-4 rounded-lg border border-gray-800">
              <Button
                variant="outline"
                onClick={() => navigate("/user-subscription")}
                className="w-full sm:w-auto bg-[#131c2e] border-gray-700 text-gray-300 hover:bg-[#1a2235]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePlan}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                disabled={selectedPlan === "pro"}
              >
                Confirm Plan Change
              </Button>
            </div>

            <div className="mt-8 p-4 bg-[#0a101e] rounded-lg border border-gray-800 text-sm text-gray-400">
              <h3 className="font-medium text-gray-300 mb-2">Plan Change Policy</h3>
              <p className="mb-2">
                When you change your plan, the new plan will take effect at the start of your next billing cycle.
                You will be charged the new rate on your next billing date.
              </p>
              <p>
                If you downgrade, you'll maintain access to your current features until the end of your current billing period.
                If you upgrade, the new features will be available immediately and we'll prorate the difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChangePlan;
