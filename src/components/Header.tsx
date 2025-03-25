
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/products";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };
  
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
          <Link 
            to="/" 
            className="text-2xl font-display font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            Mctech-hub Gadgets
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="relative group"
              onMouseEnter={() => handleCategoryHover(category.id)}
              onMouseLeave={handleCategoryLeave}
            >
              <Link
                to={`/category/${category.id}`}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 flex items-center gap-1",
                  activeCategory === category.id 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category.name}
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Link>
              
              {/* Dropdown for subcategories */}
              <div className={cn(
                "absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 transition-all duration-200 transform origin-top-left",
                activeCategory === category.id 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-95 pointer-events-none"
              )}>
                {category.subcategories?.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/category/${category.id}/${subcategory.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => setActiveCategory(null)}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-primary rounded-full text-[10px] font-bold flex items-center justify-center text-primary-foreground">0</span>
            <span className="sr-only">Cart</span>
          </Button>
          
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
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
              <div key={category.id} className="space-y-2">
                <Link
                  to={`/category/${category.id}`}
                  className="text-lg font-medium hover:text-accent-foreground transition-colors inline-flex items-center gap-2"
                  onClick={toggleMobileMenu}
                >
                  {category.name}
                </Link>
                {category.subcategories && (
                  <div className="pl-4 space-y-2 border-l-2 border-muted">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/category/${category.id}/${subcategory.id}`}
                        className="text-base text-muted-foreground hover:text-foreground transition-colors block"
                        onClick={toggleMobileMenu}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="mt-8 space-y-4">
            <Link
              to="/account"
              className="flex items-center gap-2 text-lg font-medium hover:text-accent-foreground transition-colors"
              onClick={toggleMobileMenu}
            >
              My Account
            </Link>
            <Link
              to="/support"
              className="flex items-center gap-2 text-lg font-medium hover:text-accent-foreground transition-colors"
              onClick={toggleMobileMenu}
            >
              Support
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Header;
