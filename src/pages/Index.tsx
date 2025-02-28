
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SupabaseConnectionTest from "@/components/SupabaseConnectionTest";

const Index = () => {
  const [showConnectionTest, setShowConnectionTest] = useState(false);

  // Add a key combo to show the connection test (Ctrl+Shift+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setShowConnectionTest(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        {showConnectionTest && (
          <section className="py-12 bg-muted">
            <div className="container">
              <SupabaseConnectionTest />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Index;
