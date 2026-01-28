import db from "../config/db.js";

const Chat = {};

Chat.getOrCreateConversation = async (user1Id, user2Id, propertyId) => {
  const [u1, u2] = [user1Id, user2Id].sort((a, b) => a - b);
  const propId = propertyId || null;

  const findSql = propId
    ? `SELECT id FROM conversations WHERE user1_id = ? AND user2_id = ? AND property_id = ? LIMIT 1`
    : `SELECT id FROM conversations WHERE user1_id = ? AND user2_id = ? AND property_id IS NULL LIMIT 1`;

  const params = propId ? [u1, u2, propId] : [u1, u2];
  const [rows] = await db.query(findSql, params);

  if (rows.length > 0) return rows[0].id;

  const createSql = `INSERT INTO conversations (user1_id, user2_id, property_id) VALUES (?, ?, ?)`;
  const [result] = await db.query(createSql, [u1, u2, propId]);
  return result.insertId;
};

Chat.saveMessage = async (conversationId, senderId, content, type = 'text') => {
  const sql = `
    INSERT INTO messages (conversation_id, sender_id, content, type)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [conversationId, senderId, content, type]);
  return result.insertId;
};

Chat.getMessages = async (conversationId) => {
  const sql = `
    SELECT * FROM messages 
    WHERE conversation_id = ? 
    ORDER BY created_at ASC
  `;
  const [rows] = await db.query(sql, [conversationId]);
  return rows;
};

Chat.getConversationsForUser = async (userId) => {
  const sql = `
    SELECT 
      c.*, 
      p.title AS property_title,
      u.name AS other_user_name,
      u.id AS other_user_id,
      (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message,
      (SELECT created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message_at
    FROM conversations c
    LEFT JOIN properties p ON p.id = c.property_id
    LEFT JOIN users u ON u.id = CASE WHEN c.user1_id = ? THEN c.user2_id ELSE c.user1_id END
    WHERE c.user1_id = ? OR c.user2_id = ?
    ORDER BY last_message_at DESC
  `;
  const [rows] = await db.query(sql, [userId, userId, userId]);
  return rows;
};

export default Chat;
