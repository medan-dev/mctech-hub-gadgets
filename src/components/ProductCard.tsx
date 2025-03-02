
import { useState } from "react";
import { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const delay = index * 100;
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card transition-all duration-300 hover:shadow-lg hover-lift",
        imageLoaded ? "opacity-100" : "opacity-0",
      )}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "scale-110" : "scale-100"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      {/* Product info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-muted-foreground text-sm">{product.category}</p>
          </div>
          <div className="text-lg font-semibold">${product.price}</div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    "w-4 h-4 fill-current",
                    star <= Math.round(product.rating) 
                      ? "text-yellow-500" 
                      : "text-muted"
                  )}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              ))}
            </div>
            <span className="text-xs ml-1 text-muted-foreground">
              {product.rating}
            </span>
          </div>
          
          <button 
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300",
              "bg-secondary hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Add to cart</span>
          </button>
        </div>
      </div>
      
      {/* Badge for new products */}
      {product.new && (
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
          New
        </div>
      )}
    </div>
  );
}

export default ProductCard;
