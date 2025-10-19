import { CartProvider } from '@/context/cart-context';

export default function ShopTemplate({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
