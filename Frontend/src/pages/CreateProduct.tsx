import React, { useState } from "react";
import { TextField, Button, FormLabel, TextareaAutosize } from "@mui/material";
import { Product } from "../modals/Modals";
import useAxiosWithAuth from "../api";

const CreateProduct = () => {
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const api = useAxiosWithAuth();
  const handleSubmit = async () => {
    try {
      await api.post("/products", form);
      setIsSuccessful(true);
      setForm({ name: "", price: 0, description: "", imageUrl: "" });

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
    <div className="flex justify-center  ">
      <div className="flex py-10 flex-col w-96 border border-teal-400 rounded-lg p-10 gap-4 mt-20">
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
            Add Product
          </Button>
        </div>
        {isSuccessful && (
          <span className="text-lime-500 text-center">
            Product added successfully
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

export default CreateProduct;
