import db from "../config/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const signup = async (req, res) => {
  const { name, email, phone, location, password } = req.body;

  try {
    // 1️⃣ Insert into users
    const [userResult] = await db.query(
      `INSERT INTO users (email, phone, push_enabled)
       VALUES (?, ?, true)`,
      [email, phone]
    );

    const userId = userResult.insertId;

    // 2️⃣ Insert into owners (CRITICAL)
    await db.query(
      `INSERT INTO owners (user_id, name, location, member_since)
       VALUES (?, ?, ?, NOW())`,
      [userId, name, location]
    );

    // 3️⃣ Create JWT
    const token = jwt.sign(
      { id: userId, role: "OWNER" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
