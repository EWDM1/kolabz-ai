
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Database, ChevronRight, Sparkles } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const DatasetsPreview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Featured datasets
  const featuredDatasets = [
    {
      name: "Chain-of-Thought Prompting",
      description: "Step-by-step reasoning techniques",
      category: "Techniques",
    },
    {
      name: "Customer Support Templates",
      description: "Pre-built service templates",
      category: "Applications",
    },
    {
      name: "GPT-4 Best Practices",
      description: "Optimization strategies",
      category: "Models",
    },
  ];

  // Direct the user to signup with Pro plan selected
  const handleGetStartedClick = () => {
    navigate("/signup", { 
      state: { 
        returnUrl: "/checkout",
        planId: "pro",
        isAnnual: true
      }
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background/10 to-background relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            New Feature
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Premium Prompt Datasets
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Access pre-built datasets that make creating powerful AI applications faster and easier
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {featuredDatasets.map((dataset, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {dataset.category}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">{dataset.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {dataset.description}
              </p>
              {user ? (
                <Button variant="outline" size="sm" className="w-full justify-between">
                  View Dataset <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-between"
                  onClick={handleGetStartedClick}
                >
                  Sign Up to Access <Sparkles className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => user ? navigate("/datasets") : handleGetStartedClick()}
            className="px-8"
          >
            {user ? "Browse All Datasets" : "Get Started With Pro"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default DatasetsPreview;
