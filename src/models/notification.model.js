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

Notification.getByUser = async (userId) => {
    const sql = `
    SELECT n.*, u.name as sender_name, u.image as sender_image, p.title as property_title
    FROM notifications n
    LEFT JOIN users u ON u.id = n.sender_id
    LEFT JOIN properties p ON p.id = n.property_id
    WHERE n.user_id = ?
    ORDER BY n.created_at DESC
  `;
    const [rows] = await db.query(sql, [userId]);
    return rows;
};

Notification.markAsRead = async (notificationId) => {
    const sql = "UPDATE notifications SET is_read = TRUE WHERE id = ?";
    await db.query(sql, [notificationId]);
};

export default Notification;
