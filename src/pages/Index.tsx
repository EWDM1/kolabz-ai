
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SupabaseConnectionTest from "@/components/SupabaseConnectionTest";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Heart, Bookmark } from "lucide-react";

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
        
        {/* About Us Section */}
        <section id="about" className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Kolabz</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're on a mission to help creators, developers, and businesses harness the power of AI through better prompts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                    <p className="text-muted-foreground">
                      Founded by AI enthusiasts and prompt engineering experts with a passion for making AI more accessible.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Expertise</h3>
                    <p className="text-muted-foreground">
                      Specialized in prompt engineering, AI model optimization, and creating user-friendly AI tools.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                    <p className="text-muted-foreground">
                      We believe in democratizing AI, transparency, and creating tools that respect privacy and ethics.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Bookmark className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To empower everyone to unlock the full potential of AI through better prompts and intuitive tools.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
                Founded in 2023, Kolabz has helped thousands of users create better AI outputs through optimized prompts. 
                Our platform is designed for everyone from beginners to advanced users looking to get the most out of AI models.
              </p>
              <Button
                variant="outline"
                className="rounded-full px-8"
                onClick={() => window.open("/contact", "_self")}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
        
        {/* Supabase Connection Test */}
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
