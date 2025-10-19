import { products } from '@/lib/data';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function ProductsPage() {
  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>View, edit, and manage all products and their inventory.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
            </Button>
        </CardHeader>
        <CardContent>
            <DataTable columns={columns} data={products} />
        </CardContent>
    </Card>
  );
}
