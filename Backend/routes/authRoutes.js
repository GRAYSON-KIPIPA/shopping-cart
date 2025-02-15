const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUserInfo,
  updateUser,
  deleteUser,
  getUserProfileImage,
  upload,
} = require("../controllers/authController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.get("/user/:id", getUserInfo);
router.put("/user/:id", updateUser);
router.post("/register", upload.single("profileImage"), registerUser); // Use multer middleware here
router.get("/profile-image/:userId", getUserProfileImage);

//Serve uploaded images statically
router.use("/uploads", express.static("uploads"));

module.exports = router;
