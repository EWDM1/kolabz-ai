
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthContext";
import { LanguageProvider } from "@/components/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/user-dashboard/UserDashboard";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import UserFilter from "./pages/admin/UserFilter";
import UserSubscription from "./pages/user-dashboard/UserSubscription";
import UserChangePlan from "./pages/user-dashboard/UserChangePlan";
import UserPrompts from "./pages/user-dashboard/UserPrompts";
import StripeSettings from "./pages/admin/StripeSettings";
import IntegrationsSettings from "./pages/admin/IntegrationsSettings";
import UserSettings from "./pages/user-dashboard/UserSettings";
import AdminSettings from "./pages/admin/AdminSettings";
import LandingPageEdit from "./pages/admin/LandingPageEdit";
import LandingPageEditor from "./pages/admin/LandingPageEditor";
import LandingSEO from "./pages/admin/LandingSEO";

// Reset default app CSS
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="kolabz-theme">
      <LanguageProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* User Dashboard Routes */}
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/user-prompts" element={<UserPrompts />} />
                <Route path="/user-subscription" element={<UserSubscription />} />
                <Route path="/user-change-plan" element={<UserChangePlan />} />
                <Route path="/user-settings" element={<UserSettings />} />
                
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
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
