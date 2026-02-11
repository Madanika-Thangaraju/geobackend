import db from "../config/db.js";

const Tenant = {};

Tenant.getAll = async (lat, lng, radius, filters = {}) => {
  let scoreParts = ["100"]; // Base score
  let params = [];

  // 1. Price Score Calculation
  if (filters.minPrice || filters.maxPrice) {
    const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
    const max = filters.maxPrice ? parseFloat(filters.maxPrice) : 999999999;

    // Calculate deviation score: -20 if outside range, -40 if majorly outside
    scoreParts.push(`
      CASE 
        WHEN (IF(p.listing_type = 'Rent', p.rent_price, p.price) BETWEEN ? AND ?) THEN 0
        WHEN (IF(p.listing_type = 'Rent', p.rent_price, p.price) BETWEEN ? * 0.8 AND ? * 1.2) THEN -15
        ELSE -30
      END
    `);
    params.push(min, max, min, max);
  }

  // 2. Property Type Score (Scoring instead of Filtering)
  if (filters.propertyType && filters.propertyType !== 'All') {
    const types = filters.propertyType.split(',').filter(t => t !== '');
    if (types.length > 0) {
      scoreParts.push(`CASE WHEN p.property_type IN (${types.map(() => '?').join(',')}) THEN 0 ELSE -25 END`);
      params.push(...types);
    }
  }

  // 3. Bedrooms Score
  if (filters.bedrooms && filters.bedrooms !== 'Any') {
    const bhk = parseInt(filters.bedrooms);
    if (!isNaN(bhk)) {
      scoreParts.push(`
        CASE 
          WHEN (p.bedrooms = ? OR p.bhk = ?) THEN 0
          WHEN (ABS(p.bedrooms - ?) = 1 OR ABS(p.bhk - ?) = 1) THEN -15
          ELSE -30
        END
      `);
      params.push(bhk, bhk, bhk, bhk);
    }
  }

  // 4. Furnishing Score (Scoring instead of Filtering)
  if (filters.furnishing) {
    const furnishingValue = filters.furnishing.toLowerCase().replace('fully ', '').replace('semi-', 'semi-');
    scoreParts.push(`CASE WHEN p.furnishing = ? THEN 0 ELSE -10 END`);
    params.push(furnishingValue);
  }

  // 5. Floor No Score (Scoring instead of Filtering)
  if (filters.floorNo) {
    scoreParts.push(`CASE WHEN p.floor_no = ? THEN 0 ELSE -5 END`);
    params.push(filters.floorNo);
  }

  // 6. Parking Score (Scoring instead of Filtering)
  if (filters.parking) {
    scoreParts.push(`CASE WHEN p.parking_capacity >= ? THEN 0 ELSE -10 END`);
    params.push(filters.parking);
  }

  // 7. Main Road Facing Score (Scoring instead of Filtering)
  if (filters.mainRoadFacing === 'true' || filters.mainRoadFacing === true) {
    scoreParts.push(`CASE WHEN p.is_main_road_facing = 1 THEN 0 ELSE -10 END`);
  }

  // 8. Washrooms Score (Scoring instead of Filtering)
  if (filters.washrooms) {
    scoreParts.push(`CASE WHEN p.washrooms >= ? THEN 0 ELSE -10 END`);
    params.push(filters.washrooms);
  }

  let sql = `
    SELECT 
      p.*,
      u.id AS owner_id,
      u.name AS owner_name,
      u.email AS owner_email,
      u.phone AS owner_phone,
      u.image AS owner_image,
      ui.all_images,
      (${scoreParts.join(" + ")}) AS match_score
  `;

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
    } else {
      havingClauses.push("distance < 50");
      params.push(50);
    }
  }

  sql += `
    FROM properties p
    JOIN users u ON u.id = p.owner_id
    LEFT JOIN (
      SELECT property_id, GROUP_CONCAT(image_url SEPARATOR '|||') as all_images FROM property_images GROUP BY property_id
    ) ui ON ui.property_id = p.id
  `;

  // Hard filters stay in WHERE (Listing Type & Category)
  if (filters.listingType && filters.listingType !== 'Both') {
    whereClauses.push("p.listing_type = ?");
    params.push(filters.listingType);
  }

  if (filters.category) {
    if (filters.category === 'Residential') {
      whereClauses.push("p.property_type IN ('house', 'apartment', 'villa', 'plot')");
    } else if (filters.category === 'Commercial') {
      whereClauses.push("p.property_type IN ('office', 'cafe', 'shop')");
    }
  }

  // NOTE: Other filters removed from WHERE to allow soft matching/scoring

  if (whereClauses.length > 0) {
    sql += " WHERE " + whereClauses.join(" AND ");
  }

  if (havingClauses.length > 0) {
    sql += " HAVING " + havingClauses.join(" AND ");
  }

  // Primary sort by match_score, secondary by distance or date
  if (lat && lng) {
    sql += " ORDER BY match_score DESC, distance ASC";
  } else {
    sql += " ORDER BY match_score DESC, p.created_at DESC";
  }

  let [rows] = await db.query(sql, params);

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
