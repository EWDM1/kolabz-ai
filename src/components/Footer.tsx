
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", onClick: () => scrollToSection('features'), href: null },
        { name: "Pricing", onClick: () => scrollToSection('pricing'), href: null },
        { name: "Help Center", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", onClick: () => scrollToSection('about'), href: null },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", href: "#" },
    { icon: Instagram, name: "Instagram", href: "#" },
    { icon: Linkedin, name: "LinkedIn", href: "#" },
    { icon: Youtube, name: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container px-4 mx-auto py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
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
            <p className="text-muted-foreground mb-6 max-w-md">
              Kolabz helps you craft perfect prompts for any AI model, enhancing your productivity and creativity.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    {link.href ? (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <button
                        onClick={link.onClick}
                        className="text-muted-foreground hover:text-primary transition-colors text-left"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Kolabz. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-xs text-muted-foreground">Made with care for creators everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
