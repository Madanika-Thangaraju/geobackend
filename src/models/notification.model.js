import db from "../config/db.js";

const Notification = {};

Notification.create = async (userId, senderId, propertyId, type, message) => {
  const sql = `
    INSERT INTO notifications (user_id, sender_id, property_id, type, message)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [userId, senderId, propertyId, type, message]);
  return result.insertId;
};

Notification.getByUser = async (userId, role = null) => {
  let sql = `
    SELECT n.*, u.name as sender_name, u.image as sender_image, p.title as property_title
    FROM notifications n
    LEFT JOIN users u ON u.id = n.sender_id
    LEFT JOIN properties p ON p.id = n.property_id
    WHERE n.user_id = ?
  `;

  // Filter by role if provided
  if (role === 'tenant') {
    // Tenants see: responses to their tour/call requests, and messages
    sql += ` AND n.type IN ('tour_accepted', 'tour_rejected', 'call_accepted', 'call_rejected', 'message')`;
  } else if (role === 'owner') {
    // Owners see: likes, saves, views on their properties, and incoming tour/call requests
    sql += ` AND n.type IN ('like', 'save', 'view', 'message', 'tour_request', 'call_request')`;
  }

  sql += ` ORDER BY n.created_at DESC`;

  const [rows] = await db.query(sql, [userId]);
  return rows;
};

Notification.markAsRead = async (notificationId) => {
  const sql = "UPDATE notifications SET is_read = TRUE WHERE id = ?";
  await db.query(sql, [notificationId]);
};

export default Notification;
