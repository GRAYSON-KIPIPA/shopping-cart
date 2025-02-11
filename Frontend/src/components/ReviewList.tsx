import React, { useEffect, useState } from "react";
import { getReviews } from "../services/reviewService";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: {
    name: string;
  };
  createdAt: string;
}

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(productId, token);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this product!</p>
      ) : (
        reviews.map((review) => (
          <div
            style={{ width: 500 }}
            key={review._id}
            className="border p-3 mb-2 rounded-md"
          >
            <p className="text-sm font-semibold">{review?.userId?.name}</p>
            <p className="text-yellow-500">⭐ {review?.rating}/5</p>
            <p className="text-gray-700">{review?.comment}</p>
            <p className="text-gray-500 text-xs">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
