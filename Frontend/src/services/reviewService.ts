import axios from "axios";

const API_URL = "http://localhost:5000/reviews";

//add Review
export const addReview = async (
  productId: string,
  rating: number,
  comment: string,
  token: string,
) => {
  const response = await axios.post(
    `${API_URL}/${productId}`,
    { rating, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const getReviews = async (productId: string, token: string) => {
  const response = await axios.get(`${API_URL}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
