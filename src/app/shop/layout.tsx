
import Header from "@/components/shop/header";
import { CartProvider } from "@/context/cart-context";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
