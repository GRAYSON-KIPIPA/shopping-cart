const Cart = require("../models/Cart");

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

const addItemToCart = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized, user ID missing" });
  }

  const { productId, name, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
      await cart.save();
      return res.json(cart);
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, name, price, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
};

//update Quantity
const updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(400).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "cart not Found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId.toString()
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartQuantity,
  removeItemFromCart,
};
