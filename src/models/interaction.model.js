import db from "../config/db.js";

const Interaction = {};

// --- Tour Requests ---

Interaction.createTourRequest = async (data) => {
    const sql = `
    INSERT INTO tour_requests (tenant_id, owner_id, property_id, tour_date, tour_time, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    const [result] = await db.query(sql, [
        data.tenant_id,
        data.owner_id,
        data.property_id,
        data.tour_date,
        data.tour_time,
        data.message
    ]);
    return result.insertId;
};

Interaction.getTourRequestsForUser = async (userId, role) => {
    const column = role === 'owner' ? 'owner_id' : 'tenant_id';
    const sql = `
    SELECT tr.*, p.title as property_title, u.name as other_name, u.phone as other_phone
    FROM tour_requests tr
    JOIN properties p ON tr.property_id = p.id
    JOIN users u ON u.id = (CASE WHEN tr.owner_id = ? THEN tr.tenant_id ELSE tr.owner_id END)
    WHERE tr.${column} = ?
    ORDER BY tr.created_at DESC
  `;
    const [rows] = await db.query(sql, [userId, userId]);
    return rows;
};

Interaction.updateTourStatus = async (id, status) => {
    const sql = "UPDATE tour_requests SET status = ? WHERE id = ?";
    await db.query(sql, [status, id]);
};

Interaction.getTourRequestById = async (id) => {
    const sql = "SELECT * FROM tour_requests WHERE id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
};

// --- Call Requests ---

Interaction.createCallRequest = async (data) => {
    const sql = "INSERT INTO call_requests (tenant_id, owner_id) VALUES (?, ?)";
    const [result] = await db.query(sql, [data.tenant_id, data.owner_id]);
    return result.insertId;
};

Interaction.getCallRequestsForUser = async (userId, role) => {
    const column = role === 'owner' ? 'owner_id' : 'tenant_id';
    const sql = `
    SELECT cr.*, u.name as other_name, u.phone as other_phone
    FROM call_requests cr
    JOIN users u ON u.id = (CASE WHEN cr.owner_id = ? THEN cr.tenant_id ELSE cr.owner_id END)
    WHERE cr.${column} = ?
    ORDER BY cr.created_at DESC
  `;
    const [rows] = await db.query(sql, [userId, userId]);
    return rows;
};

Interaction.updateCallStatus = async (id, status) => {
    const sql = "UPDATE call_requests SET status = ? WHERE id = ?";
    await db.query(sql, [status, id]);
};

Interaction.getCallRequestById = async (id) => {
    const sql = "SELECT * FROM call_requests WHERE id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
};

export default Interaction;
