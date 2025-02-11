const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.userId, // Set id from userId
      isAdmin: decoded.isAdmin || false, // Set isAdmin if it exists
    };

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token", error });
  }
};

module.exports = authMiddleware;
