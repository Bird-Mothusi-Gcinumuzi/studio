'use server';

import { z } from 'zod';
import type { CartItem } from '@/lib/definitions';
import { checkoutLogs } from '@/lib/data';

const checkoutSchema = z.array(
  z.object({
    product: z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
    }),
    quantity: z.number().min(1),
  })
);

// This is a placeholder for a real user session
const FAKE_USER_ID = 'usr_2';
const FAKE_USER_NAME = 'Jane Doe';

export async function processCheckout(cartItems: CartItem[]) {
  const validation = checkoutSchema.safeParse(cartItems);

  if (!validation.success) {
    return { error: 'Invalid cart data.' };
  }

  const validatedCartItems = validation.data;
  
  if (validatedCartItems.length === 0) {
    return { error: "Your cart is empty." };
  }
  
  const total = validatedCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // 1. Format for WhatsApp
  const orderDetails = validatedCartItems
    .map(item => `- ${item.quantity}x ${item.product.name}`)
    .join('\n');
  
  const whatsappMessage = `Hello Verdant Vista, I'd like to place an order:\n\n${orderDetails}\n\n*Total: $${total.toFixed(2)}*`;

  // 2. Log the checkout
  const newLogEntry = {
    id: `chk_${Date.now()}`,
    userId: FAKE_USER_ID,
    userName: FAKE_USER_NAME,
    items: validatedCartItems.map(item => ({
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    })),
    total,
    timestamp: new Date(),
  };

  // In a real app, you'd save this to a database
  checkoutLogs.unshift(newLogEntry);
  console.log('New checkout logged:', newLogEntry);

  return { 
    success: true, 
    whatsappMessage,
    // In a real app, you'd retrieve the number from env variables
    whatsappNumber: "15551234567" 
  };
}
