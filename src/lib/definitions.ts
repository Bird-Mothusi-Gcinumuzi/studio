export type User = {
  id: string;
  name: string;
  email: string;
  status: 'approved' | 'pending' | 'banned';
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
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CheckoutLog = {
  id: string;
  userId: string;
  userName: string;
  items: { productName: string; quantity: number; price: number }[];
  total: number;
  timestamp: Date;
};
