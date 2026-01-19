import Tenant from "../models/tenant.model.js";
import { mapProperty } from "../utils/property.mapper.js";


export async function getproperties(req, res) {
  try {
    const { lat, lng, radius } = req.query;
    
    // Parse values to numbers if they exist
    const latitude = lat ? parseFloat(lat) : null;
    const longitude = lng ? parseFloat(lng) : null;
    const rad = radius ? parseFloat(radius) : null;

    const rows = await Tenant.getAll(latitude, longitude, rad);

    const properties = rows.map(mapProperty);

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });

  } catch (err) {
    console.error("GET PROPERTIES ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
