
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthContext";
import { LanguageProvider } from "@/components/LanguageContext";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import MyDashboard from "@/pages/MyDashboard";
import MyPrompts from "@/pages/MyPrompts";
import MySettings from "@/pages/MySettings";
import Analytics from "@/pages/admin/Analytics";
import FeatureManagement from "@/pages/admin/FeatureManagement";
import EmailManager from "@/pages/admin/EmailManager";
import ManageSubscription from "@/pages/ManageSubscription";
import ChangePlan from "@/pages/ChangePlan";
import Checkout from "@/pages/Checkout";
import StripeSettings from "@/pages/admin/StripeSettings";
import SubscriptionManagement from "@/pages/admin/SubscriptionManagement";
import SubscriptionPlanEditor from "@/pages/admin/SubscriptionPlanEditor";
import IntegrationsSettings from "@/pages/admin/IntegrationsSettings";
import HelpSupport from "@/pages/HelpSupport";
import Help from "@/pages/admin/Help";

import "@/index.css";
import "@/App.css";

// Create React Query client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <MyDashboard />,
  },
  {
    path: "/prompts",
    element: <MyPrompts />,
  },
  {
    path: "/settings",
    element: <MySettings />,
  },
  {
    path: "/manage-subscription",
    element: <ManageSubscription />,
  },
  {
    path: "/change-plan",
    element: <ChangePlan />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/help-support",
    element: <HelpSupport />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/analytics",
    element: <Analytics />,
  },
  {
    path: "/admin/feature-management",
    element: <FeatureManagement />,
  },
  {
    path: "/admin/subscription-management",
    element: <SubscriptionManagement />,
  },
  {
    path: "/admin/subscription-management/create",
    element: <SubscriptionPlanEditor />,
  },
  {
    path: "/admin/subscription-management/edit/:planId",
    element: <SubscriptionPlanEditor />,
  },
  {
    path: "/admin/stripe-settings",
    element: <StripeSettings />,
  },
  {
    path: "/admin/integrations-settings",
    element: <IntegrationsSettings />,
  },
  {
    path: "/admin/email-manager",
    element: <EmailManager />,
  },
  {
    path: "/admin/help",
    element: <Help />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <LanguageProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
