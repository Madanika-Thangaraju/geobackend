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
        u.name,
        u.email,
        u.phone,
        u.location,
        u.latitude,
        u.longitude,
        u.created_at,
        (SELECT COUNT(*) FROM properties WHERE owner_id = u.id) as listings,
        (SELECT COUNT(*) FROM recently_viewed_properties rvp 
         JOIN properties p ON rvp.property_id = p.id 
         WHERE p.owner_id = u.id) as views
      FROM users u
      WHERE u.id = ?`,
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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { name, phone, location, latitude, longitude } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await db.query(
      `UPDATE users 
       SET name = ?, phone = ?, location = ?, latitude = ?, longitude = ? 
       WHERE id = ?`,
      [name, phone, location, latitude, longitude, userId]
    );

    res.json({ success: true, message: "Profile updated successfully" });
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
