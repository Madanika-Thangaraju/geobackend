import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ AUTH SUCCESS: User ID", decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ AUTH FAILED: Invalid token", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
