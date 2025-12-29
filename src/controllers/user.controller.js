import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

export async function registerUser(req, res) {
    console.log("👉 registerTenant controller hit");
    console.log("👉 req.body:", req.body);
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const userId = await User.create({
      name,
      email,
      phone,
      password
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user_id: userId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export async function getusers(req, res) {
  console.log("👉 getusers controller executed");

  try {
    const users = await User.getAll();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* LOGIN */
export async function loginUser(req, res) {
  try {

     const { identifier, password } = req.body;


    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    const user = await User.findByPhoneOrEmail(identifier);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

