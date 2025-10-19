'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddProductDialog } from './components/add-product-dialog';
import { Product } from '@/lib/definitions';

const db = getFirestore(app);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (querySnapshot) => {
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>View, edit, and manage all products and their inventory.</CardDescription>
        </div>
        <AddProductDialog />
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={products} />
      </CardContent>
    </Card>
  );
}
