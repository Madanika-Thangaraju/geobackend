import db from "../config/db.js";
import { JWT_SECRET } from "../config/jwt.js"; // remove JWT_EXPIRES_IN if not used

export const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id)
      return res.status(401).json({ message: "Invalid token payload" });

    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT 
        u.email,
        u.phone,
        u.push_enabled AS pushEnabled,
        o.name,
        o.location,
        o.rating,
        DATE_FORMAT(o.member_since, '%M %Y') AS memberSince,
        (SELECT COUNT(*) FROM properties WHERE owner_id = o.id) AS listings,
        (SELECT IFNULL(SUM(views),0) FROM properties WHERE owner_id = o.id) AS views
      FROM users u
      JOIN owners o ON o.user_id = u.id
      WHERE u.id = ?`,
      [userId]
    );

    if (!rows[0]) return res.status(404).json({ message: "Profile not found" });

    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
