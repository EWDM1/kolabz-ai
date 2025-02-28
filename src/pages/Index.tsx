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
  return <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        
        {/* About Us Section */}
        <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-background/95 to-background">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Our Vision for AI Prompt Engineering
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                We're on a mission to help creators, developers, and businesses harness the power of AI through better prompts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all-200">
                <div className="p-6 md:p-8 bg-card">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold">Our Team</h3>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Founded by AI enthusiasts and prompt engineering experts with a passion for making AI more accessible.
                  </p>
                  <ul className="space-y-4 mt-8">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Industry experts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>AI researchers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Prompt engineers</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all-200">
                <div className="p-6 md:p-8 bg-card">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold">Our Expertise</h3>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Specialized in prompt engineering, AI model optimization, and creating user-friendly AI tools.
                  </p>
                  <ul className="space-y-4 mt-8">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Prompt optimization</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Model fine-tuning</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>AI workflow design</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all-200">
                <div className="p-6 md:p-8 bg-card">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold">Our Values</h3>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    We believe in democratizing AI, transparency, and creating tools that respect privacy and ethics.
                  </p>
                  <ul className="space-y-4 mt-8">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Ethical AI</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Transparency</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Privacy-first</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all-200">
                <div className="p-6 md:p-8 bg-card">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Bookmark className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    To empower everyone to unlock the full potential of AI through better prompts and intuitive tools.
                  </p>
                  <ul className="space-y-4 mt-8">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Accessibility</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Education</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </div>
                      <span>Innovation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-muted-foreground max-w-3xl mx-auto mb-8">Founded in 2024, Kolabz has helped thousands of users create better AI outputs through optimized prompts. Our platform is designed for everyone from beginners to advanced users looking to get the most out of AI models.</p>
              
            </div>
          </div>
        </section>
        
        {/* Supabase Connection Test */}
        <div className="container py-8 flex justify-center">
          <Button onClick={() => setShowConnectionTest(prev => !prev)} className="bg-primary hover:bg-primary/90">
            {showConnectionTest ? "Hide" : "Show"} Supabase Connection Test
          </Button>
        </div>
        
        {showConnectionTest && <section className="py-12 bg-muted">
            <div className="container">
              <SupabaseConnectionTest />
            </div>
          </section>}
      </main>
      <Footer />
    </>;
};
export default Index;