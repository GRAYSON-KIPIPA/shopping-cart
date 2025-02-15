import { create } from "zustand";
import AxiosWithAuth from "../api";
import { CartItem } from "../modals/Modals";

interface CartState {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  fetchCart: async () => {
    const api = AxiosWithAuth();
    const token = localStorage.getItem("authToken");

    try {
      if (token) {
        const response = await api.get("/cart");
        set({ cart: response.data.items });
      } else {
        const storedCart = localStorage.getItem("cart");
        set({ cart: storedCart ? JSON.parse(storedCart) : [] });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },

  addToCart: async (item) => {
    const api = AxiosWithAuth();
    const token = localStorage.getItem("authToken");

    if (token) {
      await api.post("/cart/add", item);
      await get().fetchCart();
    } else {
      set((state) => {
        const updatedCart = [...state.cart, { ...item, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    }
  },

  removeFromCart: async (id) => {
    const api = AxiosWithAuth();
    const token = localStorage.getItem("authToken");

    if (token) {
      await api.delete(`/cart/remove/${id}`);
      await get().fetchCart();
    } else {
      set((state) => {
        const updatedCart = state.cart.filter((item) => item._id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    }
  },

  updateQuantity: async (id, quantity) => {
    const api = AxiosWithAuth();
    const token = localStorage.getItem("authToken");

    if (token) {
      await api.put("/cart/update", { productId: id, quantity });
      await get().fetchCart();
    } else {
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item._id === id ? { ...item, quantity } : item,
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    }
  },
}));

export default useCartStore;
