
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            About Us
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Built by prompt engineers, for everyone
          </h2>
          <p className="text-muted-foreground text-lg">
            Our team of AI experts and engineers created Kolabz to make advanced prompt engineering accessible to all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold">Our Story</h3>
            <p className="text-muted-foreground">
              Kolabz was born from our own struggles with getting consistent, high-quality results from AI models. 
              We found that the difference between mediocre and amazing AI outputs often came down to how well the prompts were crafted.
            </p>
            <p className="text-muted-foreground">
              After developing our own internal tools and frameworks for prompt optimization, we realized these same techniques could help everyone who uses AI—from professionals and creators to students and hobbyists.
            </p>
            <h3 className="text-2xl font-display font-bold pt-4">Our Mission</h3>
            <p className="text-muted-foreground">
              We're on a mission to democratize effective AI communication by empowering users with the tools they need to get the most out of any AI model.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all-200 border border-border h-full">
                <h4 className="text-xl font-display font-semibold mb-3">Expertise</h4>
                <p className="text-muted-foreground">Our team combines expertise in AI research, prompt engineering, and user experience design.</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all-200 border border-border h-full">
                <h4 className="text-xl font-display font-semibold mb-3">Innovation</h4>
                <p className="text-muted-foreground">We're constantly researching and testing new prompt techniques to improve your results.</p>
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all-200 border border-border h-full">
                <h4 className="text-xl font-display font-semibold mb-3">Community</h4>
                <p className="text-muted-foreground">Join our growing community of AI enthusiasts and prompt engineering experts.</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all-200 border border-border h-full">
                <h4 className="text-xl font-display font-semibold mb-3">Support</h4>
                <p className="text-muted-foreground">We provide responsive support to help you get the most from our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
