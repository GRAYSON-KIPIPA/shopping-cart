export interface Product {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface ResponseProduct extends Product {
  _id: string;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface ResponseUser extends User {
  _id: string;
}

export interface CartItemI {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface CartContextType {
  cart: CartItemI[];
  addToCart: (product: CartItemI) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export interface JwtDecode {
  exp: number;
  iat: number;
  isAdmin: boolean;
  userId: string;
}

export interface CartItem {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  productId?: string; // Used for MongoDB
}
