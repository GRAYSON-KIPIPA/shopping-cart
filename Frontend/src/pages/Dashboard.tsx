import { useEffect, useState } from "react";
import { ResponseProduct } from "../modals/Modals";
import ProductsTable from "../components/ProductsTable";
import { Paper } from "@mui/material";
import AxiosWithAuth from "../api";
import useCartStore from "../store/cartStore";

const Dashboard = () => {
  const [products, setProducts] = useState<ResponseProduct[]>([]);
  const { addToCart, cart, fetchCart } = useCartStore();

  const api = AxiosWithAuth();
  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
    fetchCart();
  }, []);

  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id),
    );
    getProducts();
  };

  const prices = cart.map((product) => product.price * product.quantity);
  const itemQuantities = cart.map((item) => item.quantity);

  const totalQuantities = itemQuantities.reduce((acc, value) => acc + value, 0);

  const totalPrice = prices.reduce((acc, value) => acc + value, 0);

  return (
    <div className="flex justify-evenly md:flex-cols bg-[url('/assets/bg.jpg')] bg-cover bg-center min-h-screen filter bg-opacity-20 bg-white dark:bg-gray-900">
      <div className="">
        <Paper
          sx={{ width: 400, height: 400, bgcolor: "lightgrey", marginTop: 2 }}
          className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
        >
          <h1 className="text-center font-bold text-2xl bg-red-800 text-white rounded-md p-4">
            Cart
          </h1>{" "}
          <hr />
          <div className="flex flex-col gap-10 m-4 text-3xl mt-12">
            <h1 className="flex justify-between mr-10 ml-10">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </h1>
            <h1 className="flex justify-between mr-10 ml-10">
              <span>Total Quantities:</span>
              <span>{totalQuantities}</span>
            </h1>
            <h1 className="flex justify-between mr-10 ml-10">
              <span>Total Price: </span>
              <span>${totalPrice.toLocaleString()}</span>
            </h1>
            <button className="bg-[#443212] rounded-lg cursor-pointer w-full mt-20 p-2 text-teal-500">
              Purchace Now
            </button>
          </div>
        </Paper>
      </div>
      <div>
        <ProductsTable
          products={products}
          onDeleteProduct={handleDeleteProduct}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
};

export default Dashboard;
