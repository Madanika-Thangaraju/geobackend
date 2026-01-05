import db from "../config/db.js";

const Property = {};

/**
 * Insert property
 */
Property.createProperty = (data) => {
  return new Promise((resolve, reject) => {
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

    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

/**
 * Insert property images
 */
Property.addImages = (propertyId, images) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO property_images (property_id, image_url, created_at)
      VALUES ?
    `;

    const values = images.map(img => [
      propertyId,
      img,
      new Date()
    ]);

    db.query(sql, [values], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

export default Property;
