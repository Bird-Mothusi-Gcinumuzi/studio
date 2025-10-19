'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { ProductCard } from '@/components/shop/product-card';
import { Product } from '@/lib/definitions';

const db = getFirestore(app);

export default function CannabisPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'products'),
      where('category', '==', 'cannabis'),
      where('stockLevel', '>', 0)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-headline tracking-wider mb-6">Cannabis Selection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
