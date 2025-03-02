
import { useIntersectionObserver } from "@/lib/animations";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section 
      ref={ref}
      className="relative pt-32 pb-24 overflow-hidden md:min-h-[90vh] flex items-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-background -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "space-y-6 transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-medium tracking-wide mb-2">
                New Collection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                Technology that <br className="hidden md:block" />
                <span className="text-accent">elevates</span> your life
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Discover thoughtfully designed gadgets that seamlessly integrate into your daily routine.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#featured"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1"
              >
                Explore Products
              </a>
              <a
                href="#new"
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
              >
                New Arrivals
              </a>
            </div>
          </div>
          
          <div className={cn(
            "relative transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/20 backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1588200908342-23b585c03e26?q=80&w=1600&auto=format&fit=crop"
                alt="Premium display monitor"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            
            {/* Floating product info card */}
            <div className="absolute -bottom-6 -left-6 max-w-[180px] glass rounded-2xl p-4 shadow-lg">
              <span className="text-xs font-medium text-muted-foreground block mb-1">
                Pro Display XDR
              </span>
              <span className="text-lg font-semibold block">$4,999</span>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs ml-1 text-muted-foreground">5.0</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-24">
          {[
            { value: "30k+", label: "Satisfied Customers" },
            { value: "500+", label: "Premium Products" },
            { value: "15+", label: "Years Experience" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className={cn(
                "text-center p-6 rounded-xl bg-secondary/50 backdrop-blur-sm transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                { "delay-[500ms]": index === 0 },
                { "delay-[600ms]": index === 1 },
                { "delay-[700ms]": index === 2 },
                { "delay-[800ms]": index === 3 },
              )}
            >
              <div className="text-3xl font-display font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
