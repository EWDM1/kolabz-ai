
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthContext";
import { LanguageProvider } from "@/components/LanguageContext";
import { ProtectedAdminRoute } from "@/components/admin/ProtectedAdminRoute";

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
  // Protected admin routes
  {
    path: "/admin",
    element: <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/analytics",
    element: <ProtectedAdminRoute><Analytics /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/feature-management",
    element: <ProtectedAdminRoute><FeatureManagement /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/subscription-management",
    element: <ProtectedAdminRoute><SubscriptionManagement /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/subscription-management/create",
    element: <ProtectedAdminRoute><SubscriptionPlanEditor /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/subscription-management/edit/:planId",
    element: <ProtectedAdminRoute><SubscriptionPlanEditor /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/stripe-settings",
    element: <ProtectedAdminRoute><StripeSettings /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/integrations-settings",
    element: <ProtectedAdminRoute><IntegrationsSettings /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/email-manager",
    element: <ProtectedAdminRoute><EmailManager /></ProtectedAdminRoute>,
  },
  {
    path: "/admin/help",
    element: <ProtectedAdminRoute><Help /></ProtectedAdminRoute>,
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
