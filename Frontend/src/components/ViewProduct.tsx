import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponseProduct } from "../modals/Modals";
import AxiosWithAuth from "../api";
import ReviewList from "./ReviewList";
import AddReview from "../pages/AddReview";

const ViewProduct = () => {
  const api = AxiosWithAuth();
  const [product, setProduct] = useState<ResponseProduct>();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const [refreshReviews, setRefreshReviews] = useState(false);

  const getProduct = async () => {
    const response = await api.get(`/products/${id}`);
    setProduct(response.data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex justify-center  flex-col mt-10">
      <div className="flex gap-4 justify-evenly">
        <div>
          <h1 className="text-blue-900 text-3xl font-bold italic">
            PRODUCT DETAILS
          </h1>
          <div
            style={{ width: 600, minHeight: 300 }}
            className="border rounded-md mt-10"
          >
            <div className="flex flex-col gap-20 ml-10">
              <div className="flex gap-24 mt-4">
                <h1 className="text-2xl text-stone-500">Name: </h1>
                <h1 className="text-orange-900 text-2xl">{product?.name} </h1>
              </div>
              <div className="flex gap-10">
                <h1 className="text-2xl text-stone-500">Description: </h1>
                <h1 className="text-orange-900 text-2xl">
                  {product?.description}{" "}
                </h1>
              </div>
              <div className="flex gap-28">
                <h1 className="text-2xl text-stone-500">Price: </h1>
                <h1 className="text-orange-900 text-2xl">${product?.price} </h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReviewList productId={id ?? ""} key={refreshReviews.toString()} />
          {token && (
            <AddReview
              productId={id ?? ""}
              token={token}
              onReviewAdded={() => setRefreshReviews(!refreshReviews)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
