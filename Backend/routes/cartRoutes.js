const express = require("express");
const {
  updateCartQuantity,
  getUserCart,
  removeItemFromCart,
  addItemToCart,
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUserCart);
router.post("/add", authMiddleware, addItemToCart);
router.put("/update", authMiddleware, updateCartQuantity);
router.delete("/remove/:productId", authMiddleware, removeItemFromCart);

module.exports = router;
