
import { Container } from "@/components/ui/container";
import { useIntersectionObserver } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const { ref, isVisible } = useIntersectionObserver();
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    // Simulate API call
    toast.success("Thanks for subscribing!");
    setEmail("");
  };
  
  return (
    <section 
      ref={ref}
      className="py-20 bg-accent text-accent-foreground"
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className={cn(
            "glass rounded-2xl p-8 md:p-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold tracking-tight mb-4 text-white">
                  Stay Updated
                </h2>
                <p className="text-white/80 mb-6">
                  Subscribe to our newsletter to receive updates on new products, exclusive offers, and technology insights.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-white/90 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-12 px-4 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full h-12 rounded-md bg-white text-accent font-medium transition-colors hover:bg-white/90"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              
              <div className="hidden md:block">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1600&auto=format&fit=crop"
                    alt="Smart Watch Ultra"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Newsletter;
