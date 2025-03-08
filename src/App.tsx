
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthContext";
import { LanguageProvider } from "@/components/LanguageContext";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/integrations/stripe/stripeService";

// Reset default app CSS
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="kolabz-theme">
      <LanguageProvider>
        <TooltipProvider>
          <AuthProvider>
            <Elements stripe={getStripe()}>
              <Toaster />
              <Sonner />
              <Outlet />
            </Elements>
          </AuthProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
