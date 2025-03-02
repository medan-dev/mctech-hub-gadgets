
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/products";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="/" 
            className="text-2xl font-display font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            Mctech-hub Gadgets
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {category.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </button>
          
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background z-40 transition-all duration-300 ease-in-out transform",
          isMobileMenuOpen 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <Container className="pt-24 pb-6">
          <nav className="flex flex-col space-y-6">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="text-lg font-medium hover:text-accent-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </a>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
