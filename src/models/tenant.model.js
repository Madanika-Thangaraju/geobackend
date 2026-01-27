import db from "../config/db.js";

const Tenant = {};

Tenant.getAll = async (lat, lng, radius) => {
  let sql = "";
  let params = [];

  if (lat && lng && radius) {
    sql = `
      SELECT 
        p.*,
        u.id AS owner_id,
        u.name AS owner_name,
        u.email AS owner_email,
        u.phone AS owner_phone,
        (
          6371 * acos(
            cos(radians(?)) 
            * cos(radians(p.latitude)) 
            * cos(radians(p.longitude) - radians(?)) 
            + sin(radians(?)) 
            * sin(radians(p.latitude))
          )
        ) AS distance
      FROM properties p
      JOIN users u ON u.id = p.owner_id
      HAVING distance < ?
      ORDER BY distance ASC
    `;
    params = [lat, lng, lat, radius];

  } else if (lat && lng) {
    sql = `
      SELECT 
        p.*,
        u.id AS owner_id,
        u.name AS owner_name,
        u.email AS owner_email,
        u.phone AS owner_phone,
        (
          6371 * acos(
            cos(radians(?)) 
            * cos(radians(p.latitude)) 
            * cos(radians(p.longitude) - radians(?)) 
            + sin(radians(?)) 
            * sin(radians(p.latitude))
          )
        ) AS distance
      FROM properties p
      JOIN users u ON u.id = p.owner_id
      ORDER BY distance ASC
    `;
    params = [lat, lng, lat];

  } else {
    sql = `
      SELECT 
        p.*,
        u.id AS owner_id,
        u.name AS owner_name,
        u.email AS owner_email,
        u.phone AS owner_phone
      FROM properties p
      JOIN users u ON u.id = p.owner_id
      ORDER BY p.created_at DESC
    `;
  }

  const [rows] = await db.query(sql, params);
  return rows;
};

export default Tenant;
