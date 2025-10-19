import { ShopHeader } from '@/components/shop/header';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ShopHeader />
      <main>{children}</main>
    </div>
  );
}
