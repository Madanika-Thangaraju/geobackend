// import db from "../config/db.js";
// import bcrypt from "bcryptjs";

// const Tenant = {};

// Tenant.create = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const hashedPassword = await bcrypt.hash(data.password, 10);

//       const sql = `
//         INSERT INTO tenants (name, email, phone, password)
//         VALUES (?, ?, ?, ?)
//       `;

//       db.query(
//         sql,
//         [data.name, data.email, data.phone, hashedPassword],
//         (err, result) => {
//           if (err) return reject(err);
//           resolve(result.insertId);
//         }
//       );
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// Tenant.getAll = () => {
//   return new Promise((resolve, reject) => {
//     const sql = `
//       SELECT id, name, email, phone, created_at
//       FROM tenants
//       ORDER BY id DESC
//     `;

//     db.query(sql, (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };

// export default Tenant;