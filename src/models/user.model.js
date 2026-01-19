import db from "../config/db.js";
import bcrypt from "bcryptjs";

const User = {};

User.create = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const sql = `
    INSERT INTO users (name, email, phone, password , latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    data.name,
    data.email,
    data.phone,
    hashedPassword,
    data.latitude,
    data.longitude
  ]);
  return result.insertId;
};

User.getAll = async () => {
  const sql = `
      SELECT id, name, email, phone, latitude, longitude, created_at
      FROM users
      ORDER BY id DESC
    `;

  const [rows] = await db.query(sql);
  return rows;
};

User.findByPhoneOrEmail = async (identifier) => {
  const sql = `
      SELECT *
      FROM users
      WHERE phone = ? OR email = ?
      LIMIT 1
    `;

  const [rows] = await db.query(sql, [identifier, identifier]);
  return rows.length ? rows[0] : null;
};

export default User;