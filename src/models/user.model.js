import db from "../config/db.js";
import bcrypt from "bcryptjs";

const User = {};

User.create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const sql = `
        INSERT INTO users (name, email, phone, password)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        sql,
        [data.name, data.email, data.phone, hashedPassword],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

User.getAll = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, name, email, phone, created_at
      FROM users
      ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

User.findByPhoneOrEmail = (identifier) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * 
      FROM users 
      WHERE phone = ? OR email = ?
      LIMIT 1
    `;

    db.query(sql, [identifier, identifier], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};


export default User;