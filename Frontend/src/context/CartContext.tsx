import { createContext, useContext, useEffect, useState } from "react";
import AxiosWithAuth from "../api";
import { CartItem } from "../modals/Modals";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const token = localStorage.getItem("authToken");
  const api = AxiosWithAuth();

  //Fnction to fetch Cart
  const fetchCart = async () => {
    const response = await api.get("/cart");
    setCart(response.data.items);
  };

  // Fetch cart from API if user is logged in
  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      // Load from localStorage for guest users
      const storedCart = localStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [token]);

  // Save cart to localStorage for guests
  useEffect(() => {
    if (!token) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, token]);

  // Add item to cart
  const addToCart = async (item: CartItem) => {
    if (token) {
      await api.post("/cart/add", item, {
        headers: { Authorization: token },
      });
      const { data } = await api.get("/cart", {
        headers: { Authorization: token },
      });
      setCart(data.items);
    } else {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = async (id: string) => {
    if (token) {
      await api.delete(`/cart/remove/${id}`, {
        headers: { Authorization: token },
      });

      const { data } = await api.get("/cart", {
        headers: { Authorization: token },
      });
      setCart(data.items);
    } else {
      setCart((prev) => prev.filter((item) => item._id !== id));
    }
  };

  // Update quantity
  const updateQuantity = async (id: string, quantity: number) => {
    if (token) {
      await api.put(
        "/cart/update",
        { productId: id, quantity },
        { headers: { Authorization: token } },
      );
      const { data } = await api.get("/cart");
      setCart(data.items);
    } else {
      setCart((prev) =>
        prev.map((item) => (item._id === id ? { ...item, quantity } : item)),
      );
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
