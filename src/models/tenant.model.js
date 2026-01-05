import db from "../config/db.js";

const Tenant = {};

Tenant.getAll = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM properties";

    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export default Tenant;
