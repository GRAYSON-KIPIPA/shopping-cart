const express = require("express");
const {
  getProducts,
  getSingleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.post("/", authMiddleware, addProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.get("/:id", authMiddleware, getSingleProduct);
router.put("/:id", authMiddleware, updateProduct);

module.exports = router;
