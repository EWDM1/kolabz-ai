
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle, useTheme } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Auto-redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Custom centered header for landing page */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left-aligned logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                {theme === "light" ? (
                  <img 
                    src="/lovable-uploads/1e5270d2-ba65-45db-bad2-3e937abd3201.png" 
                    alt="Kolabz" 
                    className="h-8 w-auto"
                  />
                ) : (
                  <img 
                    src="/lovable-uploads/57ae204a-def5-4ab7-ab03-2c4bcbd27557.png" 
                    alt="Kolabz" 
                    className="h-8 w-auto"
                  />
                )}
              </Link>
            </div>

            {/* Center aligned nav */}
            <div className="hidden md:flex md:items-center md:justify-center">
              <nav className="flex space-x-8">
                <button 
                  onClick={() => scrollToSection('top')} 
                  className="text-sm font-medium hover:text-primary cursor-pointer"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-sm font-medium hover:text-primary cursor-pointer"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-sm font-medium hover:text-primary cursor-pointer"
                >
                  Pricing
                </button>
                {isAuthenticated && (
                  <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
                    Dashboard
                  </Link>
                )}
              </nav>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <LanguageSelector />
              
              {isAuthenticated ? (
                <Button onClick={() => logout()} size="sm">
                  Log out
                </Button>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              {isAuthenticated ? (
                <Button onClick={() => logout()} size="sm">
                  Log out
                </Button>
              ) : (
                <Link to="/login" className="ml-2">
                  <Button size="sm">Log in</Button>
                </Link>
              )}
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
