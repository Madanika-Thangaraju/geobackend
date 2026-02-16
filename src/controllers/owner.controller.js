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
        u.image,
        u.created_at,
        (SELECT COUNT(*) FROM properties WHERE owner_id = u.id) as total_listings,
        (SELECT COUNT(*) FROM properties WHERE owner_id = u.id) as listings,
        (SELECT COUNT(*) FROM recently_viewed_properties rvp 
         JOIN properties p ON rvp.property_id = p.id 
         WHERE p.owner_id = u.id) as views,
        (SELECT COUNT(*) FROM saved_properties sp 
         JOIN properties p ON sp.property_id = p.id 
         WHERE p.owner_id = u.id) as saved_count,
        (SELECT COUNT(*) FROM properties WHERE owner_id = u.id ) as sold_count,
        (SELECT COUNT(*) FROM properties WHERE owner_id = u.id ) as pending_count,
        (SELECT COUNT(*) FROM properties p 
         WHERE p.owner_id = u.id 
         AND p.id NOT IN (
           SELECT property_id FROM recently_viewed_properties 
           WHERE last_viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
         )) as stagnant_count
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
    const { name, phone, location, latitude, longitude, image } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await db.query(
      `UPDATE users 
       SET name = ?, phone = ?, location = ?, latitude = ?, longitude = ?, image = ? 
       WHERE id = ?`,
      [name, phone, location, latitude, longitude, image, userId]
    );

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePush = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { push_enabled } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await db.query(
      "UPDATE users SET push_enabled = ? WHERE id = ?",
      [push_enabled ? 1 : 0, userId]
    );

    res.json({ success: true, push_enabled: !!push_enabled });
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

export const getStagnantProperties = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const properties = await Property.getStagnantByOwnerId(userId);
    res.json({ data: properties });
  } catch (err) {
    console.error("GET STAGNANT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVisitedProperties = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const properties = await Property.getVisitedByOwnerId(userId);
    res.json({ data: properties });
  } catch (err) {
    console.error("GET VISITED ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
