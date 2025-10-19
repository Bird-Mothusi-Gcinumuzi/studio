import { products } from '@/lib/data';
import { ProductCard } from '@/components/shop/product-card';

export default function CannabisPage() {
  const cannabisProducts = products.filter(p => p.category === 'cannabis');

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-headline tracking-wider mb-6">Cannabis Selection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cannabisProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
