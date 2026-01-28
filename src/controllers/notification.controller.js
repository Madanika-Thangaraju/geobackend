import Notification from "../models/notification.model.js";

export async function getNotifications(req, res) {
    try {
        const userId = req.user.id;
        const list = await Notification.getByUser(userId);
        res.json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function markRead(req, res) {
    try {
        const { id } = req.params;
        await Notification.markAsRead(id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
