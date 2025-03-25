
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  new: boolean;
  rating: number;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories?: Subcategory[];
  products?: Product[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Pro Display XDR",
    description: "Stunning 32-inch Retina 6K display with extreme dynamic range",
    price: 4999,
    image: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?q=80&w=1600&auto=format&fit=crop",
    category: "Monitors",
    featured: true,
    new: false,
    rating: 4.9
  },
  {
    id: "2",
    name: "Studio Display",
    description: "Beautiful 27-inch 5K Retina display with 12MP Ultra Wide camera",
    price: 1599,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1600&auto=format&fit=crop",
    category: "Monitors",
    featured: true,
    new: true,
    rating: 4.7
  },
  {
    id: "3",
    name: "Smart Keyboard",
    description: "Full-size keyboard with backlit keys and touch ID",
    price: 199,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1600&auto=format&fit=crop",
    category: "Accessories",
    featured: true,
    new: true,
    rating: 4.8
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with active noise cancellation",
    price: 249,
    image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=80&w=1600&auto=format&fit=crop",
    category: "Audio",
    featured: true,
    new: false,
    rating: 4.6
  },
  {
    id: "5",
    name: "Smart Watch Ultra",
    description: "Advanced health monitoring and fitness tracking",
    price: 799,
    image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1600&auto=format&fit=crop",
    category: "Wearables",
    featured: true,
    new: true,
    rating: 4.9
  },
  {
    id: "6",
    name: "Pro Tablet",
    description: "12.9-inch Liquid Retina XDR display with M1 chip",
    price: 1099,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1600&auto=format&fit=crop",
    category: "Tablets",
    featured: true,
    new: false,
    rating: 4.8
  }
];

// Helper functions to group products by category
const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === "all") return products;
  return products.filter(product => 
    product.category.toLowerCase() === categoryId.toLowerCase()
  );
};

export const categories: Category[] = [
  { 
    id: "all", 
    name: "All Products",
    description: "Browse our complete catalog of premium tech products",
    products: products
  },
  { 
    id: "monitors", 
    name: "Monitors", 
    description: "High-quality displays for professionals and creatives",
    products: getProductsByCategory("monitors"),
    subcategories: [
      { id: "gaming-monitors", name: "Gaming Monitors", description: "High refresh rate monitors for gamers" },
      { id: "professional", name: "Professional Displays", description: "Color-accurate displays for creative work" }
    ]
  },
  { 
    id: "accessories", 
    name: "Accessories",
    description: "Essential add-ons to enhance your tech experience",
    products: getProductsByCategory("accessories"),
    subcategories: [
      { id: "keyboards", name: "Keyboards", description: "Mechanical and wireless keyboards" },
      { id: "mice", name: "Mice & Trackpads", description: "Precision pointing devices" }
    ]
  },
  { 
    id: "audio", 
    name: "Audio",
    description: "Premium audio equipment for the perfect sound experience",
    products: getProductsByCategory("audio"),
    subcategories: [
      { id: "headphones", name: "Headphones", description: "Over-ear and in-ear headphones" },
      { id: "speakers", name: "Speakers", description: "Bluetooth and smart speakers" }
    ]
  },
  { 
    id: "wearables", 
    name: "Wearables",
    description: "Smart devices designed to be worn throughout the day",
    products: getProductsByCategory("wearables"),
    subcategories: [
      { id: "smartwatches", name: "Smartwatches", description: "Fitness and lifestyle watches" },
      { id: "fitness", name: "Fitness Trackers", description: "Activity and health monitoring devices" }
    ]
  },
  { 
    id: "tablets", 
    name: "Tablets",
    description: "Portable touchscreen devices for work and entertainment",
    products: getProductsByCategory("tablets"),
    subcategories: [
      { id: "pro-tablets", name: "Pro Tablets", description: "High-performance tablets for professionals" },
      { id: "budget", name: "Budget Tablets", description: "Affordable options for everyday use" }
    ]
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export { getProductsByCategory };
