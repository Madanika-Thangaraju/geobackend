import Chat from "../models/chat.model.js";
import Property from "../models/property.model.js";
import Notification from "../models/notification.model.js";

export async function sendMessage(req, res) {
    try {
        const { receiver_id, content, type, property_id } = req.body;
        const sender_id = req.user.id;

        const conversation_id = await Chat.getOrCreateConversation(sender_id, receiver_id, property_id);
        await Chat.saveMessage(conversation_id, sender_id, content, type);

        // Create Notification
        if (receiver_id && receiver_id != sender_id) {
            await Notification.create(receiver_id, sender_id, property_id, 'message', "You have a new message");
        }

        return res.status(200).json({ success: true, message: "Message sent", conversation_id });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getMessages(req, res) {
    try {
        const { otherUserId } = req.params;
        const { propertyId } = req.query;
        const userId = req.user.id;

        // Find the specific conversation between these two users
        const conversations = await Chat.getConversationsForUser(userId);
        const convo = conversations.find(c => {
            const matchUser = c.other_user_id?.toString() === otherUserId?.toString();
            if (!matchUser) return false;

            // If propertyId specifically requested, must match
            if (propertyId) return c.property_id?.toString() === propertyId?.toString();

            // If no specifically propertyId, just take the first matching user one (latest due to DESC order)
            return true;
        });

        if (!convo) {
            return res.status(200).json([]);
        }

        const messages = await Chat.getMessages(convo.id);
        return res.status(200).json(messages);
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getConversations(req, res) {
    try {
        const userId = req.user.id;
        const conversations = await Chat.getConversationsForUser(userId);
        return res.status(200).json(conversations);
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
