const Product = require("../models/Product");

const value = { name: "Grayson", price: 40 };
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: " Failed to fetch Products" });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
    });

    if (!product) {
      res.status(400).json({ message: "Failed to create a product" });
    }

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne(req.params._id);

    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting product", error });
  }
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne(req.params._id);

  if (!product) {
    return res.status(404).json({ message: "User Not Found" });
  }

  return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  console.log("BODY", req.body);

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;

  await product.save();

  return res.status(200).json(product);
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
};
