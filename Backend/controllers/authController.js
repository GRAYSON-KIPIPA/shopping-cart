const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { deleteUser } = require("./adminController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage });

const registerUser = async (req, res) => {
  try {
    const { email, password, username, isAdmin } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null; //Save image path
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
      profileImage,
    });
    await newUser.save(); //save user first to get the user ID

    // let profileImagePath = "";
    // if (req.file) {
    //   const fileExtension = path.extname(req.file.originalname);
    //   profileImagePath = `/uploads/${newUser._id}${fileExtension}`; //UserId instead of Date.now()

    //   //Rename the uploaded file to match the user ID
    //   fs.renameSync(
    //     req.file.path,
    //     path.join(__dirname, `../${profileImagePath}`)
    //   );

    //   //Update user profileImage field
    //   newUser.profileImage = profileImagePath;
    //   await newUser.save(); //Save again to update profile image field
    // }

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, profileImage: newUser.profileImage },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user || !user.profileImage) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    //Instead of sending file, ruturn the image URL
    res.json({ imageUrl: `http://localhost:5000${user.profileImage}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving profile image" });
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

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
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
  upload,
  getUserProfileImage,
};
