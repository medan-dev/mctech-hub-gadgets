
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PaymentFormProps {
  productName: string;
  productPrice: number;
  onSuccess?: () => void;
}

const PaymentForm = ({ productName, productPrice, onSuccess }: PaymentFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('stripe-payment', {
        body: { 
          amount: productPrice,
          currency: "USD",
          productName: productName,
          email: email
        }
      });

      if (error) throw error;
      
      // In a real implementation, you would use Stripe.js to complete the payment
      // This is just a simulation
      console.log("Payment intent created:", data);
      
      toast.success("Payment processed successfully!");
      
      // Send confirmation email
      await supabase.functions.invoke('send-email', {
        body: {
          to: email,
          subject: `Order Confirmation #${Date.now().toString().slice(-6)}`,
          html: `
            <h1>Thank you for your purchase!</h1>
            <p>Your order for <strong>${productName}</strong> has been confirmed.</p>
            <p>Total: $${productPrice.toFixed(2)}</p>
            <p>We'll ship your item soon!</p>
          `,
          type: "order_confirmation"
        }
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Complete Your Purchase</CardTitle>
        <CardDescription>Enter your details to purchase {productName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">Product</p>
          <p className="font-bold">{productName}</p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Price</p>
          <p className="font-bold">${productPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Email for receipt</p>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handlePayment} 
          disabled={loading || !email.trim()} 
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ${productPrice.toFixed(2)}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
