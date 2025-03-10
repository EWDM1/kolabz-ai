
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/components/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Kolabz Home"
        >
          {theme === 'dark' ? (
            <img 
              src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
              alt="Kolabz Logo" 
              className="h-10" 
            />
          ) : (
            <img 
              src="/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png" 
              alt="Kolabz Logo" 
              className="h-10" 
            />
          )}
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-sm font-medium opacity-80 hover:opacity-100 transition-all duration-200"
          >
            {t("nav.features", "Features")}
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="text-sm font-medium opacity-80 hover:opacity-100 transition-all duration-200"
          >
            {t("nav.pricing", "Pricing")}
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-sm font-medium opacity-80 hover:opacity-100 transition-all duration-200"
          >
            {t("nav.about", "About Us")}
          </button>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center">
            <LanguageSelector />
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">{t("nav.login", "Log In")}</Link>
          </Button>
          <Button size="sm" className="relative overflow-hidden group" asChild>
            <Link to="/signup">
              <span className="relative z-10">{t("nav.signup", "Sign Up")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary group-hover:translate-y-0 translate-y-10 transition-transform duration-300"></span>
            </Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center space-x-1">
          <div className="flex items-center">
            <LanguageSelector />
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          <button
            className="text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-40 bg-background transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-10">
            <Link to="/" className="inline-block" onClick={() => setIsMenuOpen(false)}>
              {theme === 'dark' ? (
                <img 
                  src="/lovable-uploads/6f0894e0-a497-444b-9581-ab7a20b0164d.png" 
                  alt="Kolabz Logo" 
                  className="h-8" 
                />
              ) : (
                <img 
                  src="/lovable-uploads/f7eb7133-b8af-45b0-b0c4-d6f905e5c1e1.png" 
                  alt="Kolabz Logo" 
                  className="h-8" 
                />
              )}
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
            <button
              className="py-2 border-b border-border text-left"
              onClick={() => scrollToSection('features')}
            >
              {t("nav.features", "Features")}
            </button>
            <button
              className="py-2 border-b border-border text-left"
              onClick={() => scrollToSection('pricing')}
            >
              {t("nav.pricing", "Pricing")}
            </button>
            <button
              className="py-2 border-b border-border text-left"
              onClick={() => scrollToSection('about')}
            >
              {t("nav.about", "About Us")}
            </button>
          </nav>

          <div className="mt-auto pt-6 grid gap-4">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                {t("nav.login", "Log In")}
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                {t("nav.signup", "Sign Up")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
