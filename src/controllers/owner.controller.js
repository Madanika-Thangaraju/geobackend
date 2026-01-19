import db from "../config/db.js";
import Property from "../models/property.model.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [rows] = await db.query(
      `SELECT 
        name,
        email,
        phone,
        location,
        created_at
      FROM users
      WHERE id = ?`,
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOwnerListings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const properties = await Property.getByOwnerId(userId);

    res.json({ data: properties });
  } catch (err) {
    console.error("GET OWNER LISTINGS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

