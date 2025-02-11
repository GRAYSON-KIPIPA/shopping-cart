const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
