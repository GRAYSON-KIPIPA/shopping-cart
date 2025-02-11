const express = require("express");
const { getReviews, addReview } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:productId", authMiddleware, getReviews);
router.post("/:productId", authMiddleware, addReview);

module.exports = router;
