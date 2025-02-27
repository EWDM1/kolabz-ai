
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-display font-bold"
          aria-label="Kolabz Home"
        >
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Kolabz</span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded opacity-70"></span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#features" className="text-sm font-medium opacity-80 hover:opacity-100 transition-all-200">
            Features
          </Link>
          <Link to="/#pricing" className="text-sm font-medium opacity-80 hover:opacity-100 transition-all-200">
            Pricing
          </Link>
          <Link to="/#about" className="text-sm font-medium opacity-80 hover:opacity-100 transition-all-200">
            About Us
          </Link>
          <Link to="/dashboard" className="text-sm font-medium opacity-80 hover:opacity-100 transition-all-200">
            Dashboard
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="sm" className="relative overflow-hidden group" asChild>
            <Link to="/signup">
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary group-hover:translate-y-0 translate-y-10 transition-transform duration-300"></span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            className="text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-10">
            <Link to="/" className="text-xl font-display font-bold" onClick={() => setIsMenuOpen(false)}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Kolabz</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 text-lg mb-auto">
            <Link
              to="/#features"
              className="py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              className="py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/#about"
              className="py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/dashboard"
              className="py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </nav>

          <div className="mt-auto pt-6 grid gap-4">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Log In
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
