import React, { useEffect, useState } from "react";
import { TextField, Button, FormLabel, TextareaAutosize } from "@mui/material";
import { Product } from "../modals/Modals";
import AxiosWithAuth from "../api";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const api = AxiosWithAuth();
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setForm({
        name: response?.data?.name,
        description: response?.data?.description,
        price: response?.data?.price,
      });
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await api.put(`/products/${id}`, form);
      setIsSuccessful(true);

      setTimeout(() => {
        setIsSuccessful(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mt-5 text-2xl text-red-900 font-bold">
        <h1 className=" text-center">Edit Product</h1>
      </div>
      <div
        style={{ width: 600 }}
        className="flex py-15 flex-col  border border-red-900 rounded-lg p-10 gap-4 mt-5"
      >
        <FormLabel>
          Name:
          <TextField
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            size="small"
            fullWidth
          />
        </FormLabel>
        <FormLabel>Description</FormLabel>
        <TextareaAutosize
          className="border border-gray-300"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          minRows={3}
        />
        <FormLabel>
          Price
          <TextField
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            size="small"
            fullWidth
          />
        </FormLabel>
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            className="w-48 "
            variant="outlined"
            size="medium"
            style={{ color: "red" }}
          >
            Update Product
          </Button>
        </div>
        {isSuccessful && (
          <span className="text-lime-500 text-center">
            Product updated successfully
          </span>
        )}
        {isError && (
          <span className="text-red-500 text-center">
            Can't add product to cart
          </span>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
