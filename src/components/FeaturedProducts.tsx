
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ProductCard";
import { categories, getFeaturedProducts, getProductsByCategory } from "@/lib/products";
import { useIntersectionObserver } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { ref, isVisible } = useIntersectionObserver();
  
  const products = activeCategory === "all" 
    ? getFeaturedProducts() 
    : getProductsByCategory(activeCategory);
  
  return (
    <section 
      id="featured" 
      ref={ref}
      className="py-20 bg-secondary/30"
    >
      <Container>
        <div className={cn(
          "max-w-lg mx-auto text-center mb-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl font-display font-bold tracking-tight mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground">
            Explore our collection of premium gadgets designed to enhance your everyday experience.
          </p>
        </div>
        
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === category.id 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500",
          isVisible ? "opacity-100" : "opacity-0",
        )}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProducts;
