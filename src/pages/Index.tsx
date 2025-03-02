
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { Container } from "@/components/ui/container";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-16 w-64 bg-secondary rounded-md mb-8"></div>
          <div className="h-2 w-48 bg-secondary rounded-md mx-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturedProducts />
        
        {/* AI Assistant Section */}
        <section className="py-20 bg-secondary/10">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold tracking-tight mb-4 text-center">
                Ask Our AI Assistant
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
                Get personalized tech advice, product recommendations, and answers to your tech questions instantly.
              </p>
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/5 rounded-xl blur-xl -z-10 opacity-70"></div>
                <AIChat />
              </div>
            </div>
          </Container>
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
