import { CartItem } from "../modals/Modals";
import useCartStore from "../store/cartStore";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="p-4 flex justify-center flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4 w-[70%] ">
          {cart.map((item: CartItem) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600">${item.price * item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-200 px-3 rounded-md py-1"
                  onClick={() =>
                    updateQuantity(item?.productId ?? "", item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-200 px-3 rounded-md py-1"
                  onClick={() =>
                    updateQuantity(item.productId ?? "", item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.productId ?? "")}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
