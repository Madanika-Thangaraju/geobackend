import db from "../config/db.js";

const Tenant = {};

Tenant.getAll = async () => {
  const sql = "SELECT * FROM properties";
  const [rows] = await db.query(sql);
  return rows;
};

export default Tenant;
