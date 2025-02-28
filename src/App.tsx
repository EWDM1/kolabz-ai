
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthContext";
import { LanguageProvider } from "@/components/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import MyPrompts from "./pages/MyPrompts";
import MySettings from "./pages/MySettings";
import StripeSettings from "./pages/admin/StripeSettings";
import IntegrationsSettings from "./pages/admin/IntegrationsSettings";
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
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/index" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected User Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/my-prompts" element={
                  <ProtectedRoute>
                    <MyPrompts />
                  </ProtectedRoute>
                } />
                <Route path="/manage-subscription" element={
                  <ProtectedRoute>
                    <ManageSubscription />
                  </ProtectedRoute>
                } />
                <Route path="/my-settings" element={
                  <ProtectedRoute>
                    <MySettings />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute requiredRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users/new" element={
                  <ProtectedRoute requiredRole="admin">
                    <AddUser />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users/edit/:id" element={
                  <ProtectedRoute requiredRole="admin">
                    <EditUser />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users/filter" element={
                  <ProtectedRoute requiredRole="admin">
                    <UserFilter />
                  </ProtectedRoute>
                } />
                <Route path="/admin/stripe" element={
                  <ProtectedRoute requiredRole="admin">
                    <StripeSettings />
                  </ProtectedRoute>
                } />
                <Route path="/admin/integrations" element={
                  <ProtectedRoute requiredRole="admin">
                    <IntegrationsSettings />
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminSettings />
                  </ProtectedRoute>
                } />
                
                {/* Website Routes (Admin) */}
                <Route path="/admin/landing/edit" element={
                  <ProtectedRoute requiredRole="admin">
                    <LandingPageEdit />
                  </ProtectedRoute>
                } />
                <Route path="/admin/landing/editor" element={
                  <ProtectedRoute requiredRole="admin">
                    <LandingPageEditor />
                  </ProtectedRoute>
                } />
                <Route path="/admin/landing/seo" element={
                  <ProtectedRoute requiredRole="admin">
                    <LandingSEO />
                  </ProtectedRoute>
                } />
                <Route path="/admin/website/pages" element={
                  <ProtectedRoute requiredRole="admin">
                    <NotFound />
                  </ProtectedRoute>
                } />
                <Route path="/admin/website/new-page" element={
                  <ProtectedRoute requiredRole="admin">
                    <NotFound />
                  </ProtectedRoute>
                } />
                
                {/* Blog Routes (Admin) */}
                <Route path="/admin/blog/posts" element={
                  <ProtectedRoute requiredRole="admin">
                    <NotFound />
                  </ProtectedRoute>
                } />
                <Route path="/admin/blog/new-post" element={
                  <ProtectedRoute requiredRole="admin">
                    <NotFound />
                  </ProtectedRoute>
                } />
                <Route path="/admin/blog/categories" element={
                  <ProtectedRoute requiredRole="admin">
                    <NotFound />
                  </ProtectedRoute>
                } />
                <Route path="/admin/blog/tags" element={
                  <ProtectedRoute requiredRole="admin">
                    <NotFound />
                  </ProtectedRoute>
                } />
                
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
