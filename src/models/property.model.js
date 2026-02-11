import db from "../config/db.js";

const Property = {};

/**
 * Insert property
 */
Property.createProperty = async (data) => {
  const sql = `
      INSERT INTO properties (
        owner_id,
        title,
        description,
        listing_type,
        property_type,
        address,
        location,
        latitude,
        longitude,
        bhk,
        bedrooms,
        bathrooms,
        sqft,
        furnishing,
        price,
        rent_price,
        deposit,
        floor_no,
        parking_capacity,
        is_main_road_facing,
        washrooms,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

  const values = [
    data.owner_id,
    data.title,
    data.description,
    data.listing_type,
    data.property_type,
    data.address,
    data.location,
    data.latitude,
    data.longitude,
    data.bhk,
    data.bedrooms,
    data.bathrooms,
    data.sqft,
    data.furnishing,
    data.price,
    data.rent_price,
    data.deposit,
    data.floor_no,
    data.parking_capacity,
    data.is_main_road_facing,
    data.washrooms
  ];

  const [result] = await db.query(sql, values);
  return result.insertId;
};

/**
 * Insert property images
 */
Property.addImages = async (propertyId, images) => {
  const sql = `
      INSERT INTO property_images (property_id, image_url, created_at)
      VALUES ?
    `;

  const values = images.map(img => [
    propertyId,
    img,
    new Date()
  ]);

  const [result] = await db.query(sql, [values]);
  return true;
};

/**
 * Get properties by owner ID
 */
Property.getByOwnerId = async (ownerId) => {
  const sqlProps = `
      SELECT * FROM properties 
      WHERE owner_id = ? 
      ORDER BY created_at DESC
    `;

  const [properties] = await db.query(sqlProps, [ownerId]);

  if (properties.length === 0) {
    return [];
  }

  const propertyIds = properties.map(p => p.id);

  if (propertyIds.length > 0) {
    const sqlImages = `
      SELECT * FROM property_images 
      WHERE property_id IN (?)
    `;
    const [images] = await db.query(sqlImages, [propertyIds]);

    // Attach images to properties
    properties.forEach(property => {
      property.images = images.filter(img => img.property_id === property.id);
    });
  }

  return properties;
};

Property.getOwnerByPropertyId = async (propertyId) => {
  const sql = "SELECT owner_id FROM properties WHERE id = ?";
  const [rows] = await db.query(sql, [propertyId]);
  return rows.length > 0 ? rows[0].owner_id : null;
};

Property.getStagnantByOwnerId = async (ownerId) => {
  const sql = `
    SELECT p.* FROM properties p 
    WHERE p.owner_id = ? 
    AND p.status = 'active' 
    AND p.id NOT IN (
      SELECT property_id FROM recently_viewed_properties 
      WHERE last_viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    )
  `;
  const [rows] = await db.query(sql, [ownerId]);

  if (rows.length > 0) {
    const propertyIds = rows.map(p => p.id);
    const sqlImages = `SELECT * FROM property_images WHERE property_id IN (?)`;
    const [images] = await db.query(sqlImages, [propertyIds]);

    rows.forEach(property => {
      property.images = images.filter(img => img.property_id === property.id);
    });
  }

  return rows;
};

Property.getVisitedByOwnerId = async (ownerId) => {
  const sql = `
    SELECT DISTINCT p.* FROM properties p
    JOIN recently_viewed_properties rvp ON p.id = rvp.property_id
    WHERE p.owner_id = ?
    ORDER BY rvp.last_viewed_at DESC
  `;
  const [rows] = await db.query(sql, [ownerId]);

  if (rows.length > 0) {
    const propertyIds = rows.map(p => p.id);
    const sqlImages = `SELECT * FROM property_images WHERE property_id IN (?)`;
    const [images] = await db.query(sqlImages, [propertyIds]);

    rows.forEach(property => {
      property.images = images.filter(img => img.property_id === property.id);
    });
  }

  return rows;
};

export default Property;
