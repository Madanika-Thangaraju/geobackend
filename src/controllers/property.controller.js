import Property from "../models/property.model.js";

export const addProperty = async (req, res) => {
   
  try {
    const { title, listingTypes, propertyTypes, address, images } = req.body;
    const userId = req.user.id;

     console.log("full request" , req.body , userId);

     return ;

    if (!title || !listingTypes || !propertyTypes || !address) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const property = await Property.create({
      userId,
      title,
      listingTypes,
      propertyTypes,
      address,
      images: images || [],
    });

    return res.status(201).json({
      success: true,
      propertyId: property.id,
    });
  } catch (err) {
    console.error("ADD PROPERTY ERROR:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
