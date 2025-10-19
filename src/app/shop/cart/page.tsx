'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth } from '@/lib/firebase';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCheckout = () => {
    startTransition(async () => {
      const functions = getFunctions(app);
      const triggerCheckoutAndWhatsapp = httpsCallable(functions, 'triggerCheckoutAndWhatsapp');

      try {
        const result = await triggerCheckoutAndWhatsapp({
          uid: auth.currentUser?.uid,
          cartContents: cartItems.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        });

        const data = result.data as { whatsappUrl: string };

        // Open WhatsApp in a new tab
        window.open(data.whatsappUrl, '_blank');

        toast({
          title: 'Order Sent!',
          description: 'Your order has been formatted and sent to WhatsApp for completion.',
        });

        clearCart();
      } catch (error) {
        console.error('Error triggering checkout:', error);
        toast({
          variant: 'destructive',
          title: 'Checkout Error',
          description: 'There was an error processing your checkout. Please try again.',
        });
      }
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-12 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-6 text-3xl font-headline tracking-wider">Your Cart is Empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/shop/cannabis">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-headline tracking-wider mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {cartItems.map(item => (
                  <li key={item.product.id} className="flex items-center gap-4 p-4">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                      data-ai-hint={item.product.imageHint}
                    />
                    <div className="flex-grow">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10) || 1)}
                        className="w-16 h-8 text-center"
                      />
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="w-20 text-right font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout} disabled={isPending}>
                {isPending ? 'Processing...' : 'Checkout via WhatsApp'}
              </Button>
            </CardFooter>
          </Card>
           <p className="text-xs text-muted-foreground mt-4 text-center">
            Clicking checkout will open WhatsApp with your pre-filled order. You can then confirm and send your order to us.
          </p>
        </div>
      </div>
    </div>
  );
}
