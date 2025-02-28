
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Auto-redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Custom centered header for landing page */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Center aligned nav */}
            <div className="hidden w-full md:flex md:items-center md:justify-center">
              <Link to="/" className="mr-8 flex items-center">
                <img 
                  src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                  alt="Kolabz" 
                  className="h-10 w-auto"
                />
              </Link>
              <nav className="flex space-x-8">
                <Link to="/" className="text-sm font-medium hover:text-primary">
                  Home
                </Link>
                <Link to="#features" className="text-sm font-medium hover:text-primary">
                  Features
                </Link>
                <Link to="#pricing" className="text-sm font-medium hover:text-primary">
                  Pricing
                </Link>
              </nav>
            </div>

            {/* Mobile logo - left aligned */}
            <div className="flex md:hidden">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                  alt="Kolabz" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <LanguageSelector />
              
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Link to="/login" className="ml-2">
                <Button size="sm">Log in</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
