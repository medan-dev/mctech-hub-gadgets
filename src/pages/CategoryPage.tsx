
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const { categoryId, subcategoryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Find the current category and subcategory
  const category = categories.find(c => c.id === categoryId);
  const subcategory = subcategoryId 
    ? category?.subcategories?.find(s => s.id === subcategoryId) 
    : null;
  
  // Set page title based on category/subcategory
  const pageTitle = subcategory 
    ? `${subcategory.name} - ${category?.name}` 
    : category?.name || "Products";
  
  // Products to display - would normally come from API
  const products = category?.products || [];
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [categoryId, subcategoryId]);
  
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
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Container className="flex-1 py-24 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
        </Container>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">{category.name}</span>
            {subcategory && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">{subcategory.name}</span>
              </>
            )}
          </div>
          
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold tracking-tight mb-4">{pageTitle}</h1>
            <p className="text-muted-foreground max-w-2xl">
              {subcategory?.description || category.description}
            </p>
          </div>
          
          {/* Subcategories navigation (if on main category page) */}
          {!subcategoryId && category.subcategories && category.subcategories.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-medium mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.subcategories.map((sub) => (
                  <a 
                    key={sub.id}
                    href={`/category/${category.id}/${sub.id}`} 
                    className="p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors text-center"
                  >
                    <span className="font-medium">{sub.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {/* Empty state */}
            {products.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}
