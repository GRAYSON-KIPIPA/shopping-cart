import React, { useState } from "react";
import { addReview } from "../services/reviewService";

interface AddReviewProps {
  productId: string;
  token: string;
  onReviewAdded: () => void;
}

const AddReview: React.FC<AddReviewProps> = ({
  productId,
  token,
  onReviewAdded,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  const [isReviewed, setIsReviewed] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addReview(productId, rating, comment, token);
      setComment("");
      setRating(5);
      onReviewAdded();
    } catch (error) {
      console.error(error);
      setIsReviewed(true);
      setError("Error submitting review. Try again");
    }

    setLoading(false);
  };

  return (
    <div className="mt-6">
      {isReviewed ? (
        <div>
          <h1 className="text-center text-xl text-pink-800">
            The Product Can only Reviewed once
          </h1>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-5">Leave a Review</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 rounded-md"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Stars
                </option>
              ))}
            </select>

            <label className="text-sm font-semibold">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 rounded-md"
              rows={3}
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddReview;
