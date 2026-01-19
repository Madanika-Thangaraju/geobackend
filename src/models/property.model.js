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
        listing_type,
        property_type,
        address,
        location,
        bhk,
        bedrooms,
        bathrooms,
        sqft,
        furnishing,
        price,
        rent_price,
        deposit,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

  const values = [
    data.owner_id,
    data.title,
    data.listing_type,
    data.property_type,
    data.address,
    data.location,
    data.bhk,
    data.bedrooms,
    data.bathrooms,
    data.sqft,
    data.furnishing,
    data.price,
    data.rent_price,
    data.deposit
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

export default Property;
