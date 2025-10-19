"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const checkoutLog = {
      userId: user.uid,
      cartSnapshot: cart.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalValue: total,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "checkouts"), checkoutLog);

      const orderSummary = `Date: ${new Date().toLocaleString()}
Order ID: ${Date.now()}
Customer: ${user.fullName}

Items:
${cart
        .map(
          (item) =>
            `${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`
        )
        .join("\n")}

Total: $${total.toFixed(2)}`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        orderSummary
      )}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error during checkout: ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="relative h-24 w-24 mr-4">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h2 className="font-bold">{item.product.name}</h2>
                  <p>${item.product.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.product.id, parseInt(e.target.value))
                  }
                  className="w-16"
                />
                <Button variant="destructive" onClick={() => removeFromCart(item.product.id)} className="ml-4">Remove</Button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Total: ${total.toFixed(2)}
          </div>
          <div className="text-right mt-4">
            <Button onClick={handleCheckout}>Initiate Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
