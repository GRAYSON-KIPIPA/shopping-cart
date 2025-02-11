const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.get("/user/:id", getUserInfo);
router.put("/user/:id", updateUser);

module.exports = router;
