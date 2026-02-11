import Tenant from "../models/tenant.model.js";
import Property from "../models/property.model.js";
import Notification from "../models/notification.model.js";
import { mapProperty } from "../utils/property.mapper.js";


export async function getproperties(req, res) {
  try {
    const {
      lat, lng, radius, minPrice, maxPrice, propertyType, bedrooms, listingType,
      category, furnishing, floorNo, parking, mainRoadFacing, washrooms
    } = req.query;

    const filters = {
      minPrice, maxPrice, propertyType, bedrooms, listingType,
      category, furnishing, floorNo, parking, mainRoadFacing, washrooms
    };

    // Parse values to numbers if they exist
    const latitude = lat ? parseFloat(lat) : null;
    const longitude = lng ? parseFloat(lng) : null;
    const rad = radius ? parseFloat(radius) : null;

    const rows = await Tenant.getAll(latitude, longitude, rad, filters);

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

export async function toggleLike(req, res) {
  console.log("👉 toggleLike called:", req.body);
  try {
    const { propertyId, status } = req.body;
    const userId = req.user.id;

    if (status) {
      await Tenant.likeProperty(userId, propertyId);
      // Create Notification
      const ownerId = await Property.getOwnerByPropertyId(propertyId);
      if (ownerId && ownerId !== userId) {
        await Notification.create(ownerId, userId, propertyId, 'like', "Someone liked your property");
      }
    } else {
      await Tenant.unlikeProperty(userId, propertyId);
    }

    return res.status(200).json({ success: true, message: status ? "Liked" : "Unliked" });
  } catch (err) {
    console.error("❌ toggleLike ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function getLiked(req, res) {
  console.log("👉 getLiked called for user:", req.user.id);
  try {
    const userId = req.user.id;
    const properties = await Tenant.getLikedProperties(userId);
    return res.status(200).json({ success: true, data: properties });
  } catch (err) {
    console.error("❌ getLiked ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function toggleSave(req, res) {
  try {
    const { propertyId, status, notes } = req.body;
    const userId = req.user.id;

    if (status) {
      await Tenant.saveProperty(userId, propertyId, notes);
      // Create Notification
      const ownerId = await Property.getOwnerByPropertyId(propertyId);
      if (ownerId && ownerId !== userId) {
        await Notification.create(ownerId, userId, propertyId, 'save', "Someone saved your property");
      }
    } else {
      await Tenant.unsaveProperty(userId, propertyId);
    }

    return res.status(200).json({ success: true, message: status ? "Saved" : "Unsaved" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function getSaved(req, res) {
  try {
    const userId = req.user.id;
    const properties = await Tenant.getSavedProperties(userId);
    return res.status(200).json({ success: true, data: properties });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function trackView(req, res) {
  try {
    const { propertyId } = req.body;
    const userId = req.user.id;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    await Tenant.addRecentlyViewed(userId, propertyId, ip);

    // Create Notification
    const ownerId = await Property.getOwnerByPropertyId(propertyId);
    if (ownerId && ownerId !== userId) {
      await Notification.create(ownerId, userId, propertyId, 'view', "Someone viewed your property");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function getRecentlyViewed(req, res) {
  try {
    const userId = req.user.id;
    const properties = await Tenant.getRecentlyViewed(userId);
    return res.status(200).json({ success: true, data: properties });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
