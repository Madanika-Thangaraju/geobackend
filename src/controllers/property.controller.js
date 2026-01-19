import Property from "../models/property.model.js";

export const addProperty = async (req, res) => {
  console.log('executed');
  try {
    const {
      title,
      listingTypes,
      propertyTypes,
      description,
      address,
      location,
      bhk,
      bedrooms,
      bathrooms,
      sqft,
      rentPrice,
      deposit,
      furnishing,
      price,
      images
    } = req.body;

    const owner_id = req.user.id;

    if (!title || !listingTypes?.length || !propertyTypes?.length || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const propertyId = await Property.createProperty({
      owner_id,
      title,
      description,
      listing_type: listingTypes[0],
      property_type: propertyTypes[0],
      address,
      location: typeof location === 'string' ? location : (address ? address.split(',')[0] : ""),
      latitude: location?.lat || null,
      longitude: location?.lng || null,
      bhk,
      bedrooms,
      bathrooms,
      sqft,
      furnishing,
      price,
      rent_price: rentPrice,
      deposit
    });

    if (images && images.length > 0) {
      await Property.addImages(propertyId, images);
    }

    return res.status(201).json({
      success: true,
      propertyId
    });

  } catch (err) {
    console.error("ADD PROPERTY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
