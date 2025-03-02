
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

export const categories = [
  { id: "all", name: "All Products" },
  { id: "monitors", name: "Monitors" },
  { id: "accessories", name: "Accessories" },
  { id: "audio", name: "Audio" },
  { id: "wearables", name: "Wearables" },
  { id: "tablets", name: "Tablets" }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === "all") return products;
  return products.filter(product => 
    product.category.toLowerCase() === categoryId.toLowerCase()
  );
};
