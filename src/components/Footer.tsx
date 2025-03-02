
import { Container } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 mt-auto">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Mctech-hub Gadgets</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Premium gadgets designed to enhance your digital lifestyle with elegance and performance.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              {["All Products", "Monitors", "Accessories", "Audio", "Wearables"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Sustainability", "Stores"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {["Contact Us", "FAQs", "Shipping", "Returns", "Warranty"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Mctech-hub Gadgets. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
