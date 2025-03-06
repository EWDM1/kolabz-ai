import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthContext";
import { LanguageProvider } from "@/components/LanguageContext";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/integrations/stripe/stripeService";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import UserFilter from "./pages/admin/UserFilter";
import ManageSubscription from "./pages/ManageSubscription";
import ChangePlan from "./pages/ChangePlan";
import MyPrompts from "./pages/MyPrompts";
import MySettings from "./pages/MySettings";
import StripeSettings from "./pages/admin/StripeSettings";
import IntegrationsSettings from "./pages/admin/IntegrationsSettings";
import AdminSettings from "./pages/admin/AdminSettings";
import LandingPageEdit from "./pages/admin/LandingPageEdit";
import LandingPageEditor from "./pages/admin/LandingPageEditor";
import LandingSEO from "./pages/admin/LandingSEO";
import Checkout from "./pages/Checkout";
import PromptingTools from "./pages/PromptingTools";

// Reset default app CSS
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="kolabz-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Router>
            <AuthProvider>
              <Elements stripe={getStripe()}>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/index" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/my-prompts" element={<MyPrompts />} />
                  <Route path="/manage-subscription" element={<ManageSubscription />} />
                  <Route path="/change-plan" element={<ChangePlan />} />
                  <Route path="/my-settings" element={<MySettings />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                  <Route path="/admin/users/new" element={<AddUser />} />
                  <Route path="/admin/users/edit/:id" element={<EditUser />} />
                  <Route path="/admin/users/filter" element={<UserFilter />} />
                  <Route path="/admin/stripe" element={<StripeSettings />} />
                  <Route path="/admin/integrations" element={<IntegrationsSettings />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  
                  {/* Website Routes */}
                  <Route path="/admin/landing/edit" element={<LandingPageEdit />} />
                  <Route path="/admin/landing/editor" element={<LandingPageEditor />} />
                  <Route path="/admin/landing/seo" element={<LandingSEO />} />
                  <Route path="/admin/website/pages" element={<NotFound />} />
                  <Route path="/admin/website/new-page" element={<NotFound />} />
                  
                  {/* Blog Routes */}
                  <Route path="/admin/blog/posts" element={<NotFound />} />
                  <Route path="/admin/blog/new-post" element={<NotFound />} />
                  <Route path="/admin/blog/categories" element={<NotFound />} />
                  <Route path="/admin/blog/tags" element={<NotFound />} />
                  
                  <Route path="/prompting-tools" element={<PromptingTools />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Elements>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
