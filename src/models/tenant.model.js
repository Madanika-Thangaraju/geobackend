import db from "../config/db.js";

const Tenant = {};

Tenant.getAll = async (lat, lng, radius) => {
  let sql = "SELECT * FROM properties";
  let params = [];

  if (lat && lng && radius) {
    // Haversine formula to find properties within radius and sort by distance
    sql = `
      SELECT *, 
      (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance 
      FROM properties 
      HAVING distance < ? 
      ORDER BY distance ASC
    `;
    params = [lat, lng, lat, radius];
  } else if (lat && lng) {
    // Just sort by distance if no radius is provided
     sql = `
      SELECT *, 
      (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance 
      FROM properties 
      ORDER BY distance ASC
    `;
    params = [lat, lng, lat];
  } else {
    sql = "SELECT * FROM properties ORDER BY created_at DESC";
  }

  const [rows] = await db.query(sql, params);
  return rows;
};

export default Tenant;
