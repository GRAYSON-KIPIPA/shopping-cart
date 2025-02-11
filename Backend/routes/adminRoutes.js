const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getUsers, deleteUser } = require("../controllers/adminController");

//Protect routes with both auth and admin middleware
router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
