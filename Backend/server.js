require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");
const {
  addProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
} = require("./controllers/productController");
const { registerUser, loginUser } = require("./controllers/authController");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001; // Use environment variable or 5000

app.use(cors());
app.use(express.json()); // Important: Parses JSON request bodies

// MongoDB Connection (Replace with your MongoDB URI)
const MONGO_URI = process.env.MONGO_URI || 5000; // Important!
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", (MONGO_URI) => console.log("Connected to Database"));

app.get("/", (req, res) => {
  res.send("Hello from the backend!"); // Test route
});
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes);
app.use("/reviews", reviewRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
