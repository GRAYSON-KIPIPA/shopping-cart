const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { deleteUser } = require("./adminController");

const registerUser = async (req, res) => {
  try {
    const { email, password, username, isAdmin } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).status({ message: "User already exists" });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //Generate jwt token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin }, // Include isAdmin
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findOne(req.params._id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json(user);
};

const getUserInfo = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error on updating user" });
  }

  const deleteUser = async (req, res) => {
    // const user = await User.findOneAndDelete(req.body.id)
  };
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUserInfo,
  updateUser,
  deleteUser,
};
