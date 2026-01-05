import Tenant from "../models/tenant.model.js";
import { mapProperty } from "../utils/property.mapper.js";


export async function getproperties(req, res) {
  try {
    const rows = await Tenant.getAll();

    const properties = rows.map(mapProperty);

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
