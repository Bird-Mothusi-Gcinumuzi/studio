import { Timestamp } from "firebase/firestore";

export type User = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'deactivated';
  role: 'admin' | 'customer';
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: 'cannabis' | 'merch';
  stockLevel: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CheckoutLog = {
  id: string;
  userId: string;
  cartSnapshot: { productName: string; quantity: number; price: number }[];
  totalValue: number;
  timestamp: Timestamp;
};
