import db from "../config/db.js";

const Property = {};

Property.create = ({
  userId,
  title,    
  listingTypes,
  propertyTypes,
  address,
  images,
}) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO properties
      (user_id, title, listing_types, property_types, address, images)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        userId,
        title,
        JSON.stringify(listingTypes),
        JSON.stringify(propertyTypes),
        address,
        JSON.stringify(images),
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve({
          id: result.insertId,
        });
      }
    );
  });
};

export default Property;
