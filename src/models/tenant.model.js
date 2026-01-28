import db from "../config/db.js";

const Tenant = {};

Tenant.getAll = async (lat, lng, radius, filters = {}) => {
  let sql = `
    SELECT 
      p.*,
      u.id AS owner_id,
      u.name AS owner_name,
      u.email AS owner_email,
      u.phone AS owner_phone,
      u.image AS owner_image,
      ui.all_images
  `;

  let params = [];
  let whereClauses = [];
  let havingClauses = [];

  if (lat && lng) {
    sql += `, (
      6371 * acos(
        cos(radians(?)) 
        * cos(radians(p.latitude)) 
        * cos(radians(p.longitude) - radians(?)) 
        + sin(radians(?)) 
        * sin(radians(p.latitude))
      )
    ) AS distance `;
    params.push(lat, lng, lat);

    if (radius) {
      havingClauses.push("distance < ?");
      params.push(radius);
    }
  }

  sql += `
    FROM properties p
    JOIN users u ON u.id = p.owner_id
    LEFT JOIN (
      SELECT property_id, GROUP_CONCAT(image_url SEPARATOR '|||') as all_images FROM property_images GROUP BY property_id
    ) ui ON ui.property_id = p.id
  `;

  // Apply filters
  if (filters.minPrice) {
    whereClauses.push("(IF(p.listing_type = 'Rent', p.rent_price, CAST(p.price AS DECIMAL)) >= ?)");
    params.push(filters.minPrice);
  }
  if (filters.maxPrice) {
    whereClauses.push("(IF(p.listing_type = 'Rent', p.rent_price, CAST(p.price AS DECIMAL)) <= ?)");
    params.push(filters.maxPrice);
  }
  if (filters.propertyType && filters.propertyType !== 'All') {
    whereClauses.push("p.property_type = ?");
    params.push(filters.propertyType);
  }
  if (filters.bedrooms && filters.bedrooms !== 'Any') {
    const bhk = parseInt(filters.bedrooms);
    if (!isNaN(bhk)) {
      whereClauses.push("(p.bedrooms = ? OR p.bhk = ?)");
      params.push(bhk, bhk);
    }
  }
  if (filters.listingType && filters.listingType !== 'Both') {
    whereClauses.push("p.listing_type = ?");
    params.push(filters.listingType);
  }

  if (whereClauses.length > 0) {
    sql += " WHERE " + whereClauses.join(" AND ");
  }

  if (havingClauses.length > 0) {
    sql += " HAVING " + havingClauses.join(" AND ");
  }

  if (lat && lng) {
    sql += " ORDER BY distance ASC";
  } else {
    sql += " ORDER BY p.created_at DESC";
  }

  const [rows] = await db.query(sql, params);
  return rows;
};

// ============ LIKES ============
Tenant.likeProperty = async (userId, propertyId) => {
  const sql = `INSERT IGNORE INTO property_likes (user_id, property_id) VALUES (?, ?)`;
  const [result] = await db.query(sql, [userId, propertyId]);
  return result;
};

Tenant.unlikeProperty = async (userId, propertyId) => {
  const sql = `DELETE FROM property_likes WHERE user_id = ? AND property_id = ?`;
  const [result] = await db.query(sql, [userId, propertyId]);
  return result;
};

Tenant.getLikedProperties = async (userId) => {
  const sql = `
    SELECT p.*, ui.image_url FROM properties p
    JOIN property_likes pl ON pl.property_id = p.id
    LEFT JOIN (
      SELECT property_id, MAX(image_url) as image_url FROM property_images GROUP BY property_id
    ) ui ON ui.property_id = p.id
    WHERE pl.user_id = ?
    ORDER BY pl.created_at DESC
  `;
  const [rows] = await db.query(sql, [userId]);
  return rows;
};

// ============ SAVED ============
Tenant.saveProperty = async (userId, propertyId, notes = "") => {
  const sql = `INSERT IGNORE INTO saved_properties (user_id, property_id, notes) VALUES (?, ?, ?)`;
  const [result] = await db.query(sql, [userId, propertyId, notes]);
  return result;
};

Tenant.unsaveProperty = async (userId, propertyId) => {
  const sql = `DELETE FROM saved_properties WHERE user_id = ? AND property_id = ?`;
  const [result] = await db.query(sql, [userId, propertyId]);
  return result;
};

Tenant.getSavedProperties = async (userId) => {
  const sql = `
    SELECT p.*, ui.image_url FROM properties p
    JOIN saved_properties sp ON sp.property_id = p.id
    LEFT JOIN (
      SELECT property_id, MAX(image_url) as image_url FROM property_images GROUP BY property_id
    ) ui ON ui.property_id = p.id
    WHERE sp.user_id = ?
    ORDER BY sp.saved_at DESC
  `;
  const [rows] = await db.query(sql, [userId]);
  return rows;
};

// ============ RECENTLY VIEWED ============
Tenant.addRecentlyViewed = async (userId, propertyId, ip = null, session = null) => {
  const sql = `
    INSERT INTO recently_viewed_properties (user_id, property_id, ip_address, session_id)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE last_viewed_at = CURRENT_TIMESTAMP
  `;
  const [result] = await db.query(sql, [userId, propertyId, ip, session]);
  return result;
};

Tenant.getRecentlyViewed = async (userId) => {
  const sql = `
    SELECT p.*, ui.image_url, rvp.last_viewed_at FROM properties p
    JOIN recently_viewed_properties rvp ON rvp.property_id = p.id
    LEFT JOIN (
      SELECT property_id, MAX(image_url) as image_url FROM property_images GROUP BY property_id
    ) ui ON ui.property_id = p.id
    WHERE rvp.user_id = ?
    ORDER BY rvp.last_viewed_at DESC
    LIMIT 10
  `;
  const [rows] = await db.query(sql, [userId]);
  return rows;
};

export default Tenant;
