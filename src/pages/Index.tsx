
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SupabaseConnectionTest from "@/components/SupabaseConnectionTest";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showConnectionTest, setShowConnectionTest] = useState(false);

  // Add a key combo to show the connection test (Cmd+Shift+S on Mac, Ctrl+Shift+S on Windows/Linux)
  // or alternatively Alt+S/Option+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+Shift+S on Mac or Ctrl+Shift+S on other platforms
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setShowConnectionTest(prev => !prev);
        console.log("Keyboard shortcut triggered: Cmd/Ctrl+Shift+S");
      }
      // Alternative: Alt+S (Option+S on Mac)
      else if (e.altKey && e.key === 's') {
        e.preventDefault();
        setShowConnectionTest(prev => !prev);
        console.log("Keyboard shortcut triggered: Alt/Option+S");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Log that the event listener was added
    console.log("Keyboard event listener added");
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      console.log("Keyboard event listener removed");
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        
        {/* Add a visible button to toggle the connection test */}
        <div className="container py-8 flex justify-center">
          <Button 
            onClick={() => setShowConnectionTest(prev => !prev)}
            className="bg-primary hover:bg-primary/90"
          >
            {showConnectionTest ? "Hide" : "Show"} Supabase Connection Test
          </Button>
        </div>
        
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
