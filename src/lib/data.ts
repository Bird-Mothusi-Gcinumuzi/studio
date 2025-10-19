import { User, Product, CheckoutLog } from '@/lib/definitions';

export const users: User[] = [
  { id: 'usr_1', name: 'Admin User', email: 'admin@verdant.com', status: 'approved', role: 'admin' },
  { id: 'usr_2', name: 'Jane Doe', email: 'jane.doe@email.com', status: 'approved', role: 'customer' },
  { id: 'usr_3', name: 'John Smith', email: 'john.smith@email.com', status: 'pending', role: 'customer' },
  { id: 'usr_4', name: 'Sam Wilson', email: 'sam.wilson@email.com', status: 'banned', role: 'customer' },
];

export const products: Product[] = [
    {
      id: "prod_cannabis_1",
      name: "OG Kush",
      description: "A classic Indica strain known for its relaxing effects.",
      price: 45.00,
      imageUrl: "https://picsum.photos/seed/c1/600/400",
      imageHint: "cannabis buds",
      category: 'cannabis',
      stock: 50,
    },
    {
      id: "prod_cannabis_2",
      name: "CBD Oil 500mg",
      description: "High-quality CBD oil for wellness and relief.",
      price: 60.00,
      imageUrl: "https://picsum.photos/seed/c2/600/400",
      imageHint: "cbd oil",
      category: 'cannabis',
      stock: 30,
    },
    {
      id: "prod_cannabis_3",
      name: "Gummy Bites",
      description: "Delicious and potent THC-infused edible gummies.",
      price: 25.00,
      imageUrl: "https://picsum.photos/seed/c3/600/400",
      imageHint: "cannabis edibles",
      category: 'cannabis',
      stock: 100,
    },
    {
      id: "prod_cannabis_4",
      name: "Sour Diesel",
      description: "An invigorating Sativa strain with a pungent, diesel-like aroma.",
      price: 50.00,
      imageUrl: "https://picsum.photos/seed/c4/600/400",
      imageHint: "cannabis flower",
      category: 'cannabis',
      stock: 42,
    },
    {
      id: "prod_merch_1",
      name: "Verdant Vista Tee",
      description: "Comfortable black t-shirt with the Verdant Vista logo.",
      price: 25.00,
      imageUrl: "https://picsum.photos/seed/m1/600/400",
      imageHint: "black t-shirt",
      category: 'merch',
      stock: 80,
    },
    {
      id: "prod_merch_2",
      name: "Vista Snapback",
      description: "Stylish snapback cap to represent your favorite brand.",
      price: 30.00,
      imageUrl: "https://picsum.photos/seed/m2/600/400",
      imageHint: "baseball cap",
      category: 'merch',
      stock: 60,
    },
    {
      id: "prod_merch_3",
      name: "Herb Grinder",
      description: "A premium 4-piece metal grinder for the perfect consistency.",
      price: 35.00,
      imageUrl: "https://picsum.photos/seed/m3/600/400",
      imageHint: "herb grinder",
      category: 'merch',
      stock: 75,
    },
    {
      id: "prod_merch_4",
      name: "Rolling Papers",
      description: "King-size, unbleached rolling papers for a smooth experience.",
      price: 5.00,
      imageUrl: "https://picsum.photos/seed/m4/600/400",
      imageHint: "rolling papers",
      category: 'merch',
      stock: 200,
    },
];

export const checkoutLogs: CheckoutLog[] = [
    {
        id: 'chk_1',
        userId: 'usr_2',
        userName: 'Jane Doe',
        items: [
            { productName: 'OG Kush', quantity: 1, price: 45.00 },
            { productName: 'Verdant Vista Tee', quantity: 1, price: 25.00 },
        ],
        total: 70.00,
        timestamp: new Date('2023-10-26T10:00:00Z'),
    },
    {
        id: 'chk_2',
        userId: 'usr_2',
        userName: 'Jane Doe',
        items: [
            { productName: 'Gummy Bites', quantity: 2, price: 25.00 },
        ],
        total: 50.00,
        timestamp: new Date('2023-10-27T14:30:00Z'),
    }
];
