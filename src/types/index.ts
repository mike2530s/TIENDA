export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'ropa' | 'calzado' | 'regalos';
  stock: number;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}