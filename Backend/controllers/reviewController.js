const Review = require("../models/Review");
const Product = require("../models/Product");

//Add Review
const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }

    //check if the user has already reviewd this product
    const existingReview = await Review.findOne({ productId, userId });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed the product" });
    }

    const review = new Review({
      productId,
      userId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added successful" });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

//Get all reviews for a product
const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

module.exports = { addReview, getReviews };
