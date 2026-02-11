import Interaction from "../models/interaction.model.js";
import Notification from "../models/notification.model.js";

export const createTourRequest = async (req, res) => {
    try {
        const tenant_id = req.user.id;
        const { owner_id, property_id, tour_date, tour_time, message } = req.body;

        if (!owner_id || !property_id || !tour_date || !tour_time) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const insertId = await Interaction.createTourRequest({
            tenant_id,
            owner_id,
            property_id,
            tour_date,
            tour_time,
            message
        });

        res.status(201).json({ success: true, insertId, message: "Tour request sent successfully" });
    } catch (error) {
        console.error("CREATE TOUR ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getTourRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const { role } = req.query; // 'owner' or 'tenant'

        const requests = await Interaction.getTourRequestsForUser(userId, role);
        res.json({ success: true, data: requests });
    } catch (error) {
        console.error("GET TOURS ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateTourStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const ownerId = req.user.id;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const tourRequest = await Interaction.getTourRequestById(id);
        if (!tourRequest) {
            return res.status(404).json({ message: "Tour request not found" });
        }

        await Interaction.updateTourStatus(id, status);

        // Send Notification to Tenant
        const message = `Owner has ${status} your tour request for property ID: ${tourRequest.property_id}`;
        await Notification.create(tourRequest.tenant_id, ownerId, tourRequest.property_id, 'tour_' + status, message);

        res.json({ success: true, message: `Tour request ${status}` });
    } catch (error) {
        console.error("UPDATE TOUR STATUS ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createCallRequest = async (req, res) => {
    try {
        const tenant_id = req.user.id;
        const { owner_id } = req.body;

        if (!owner_id) {
            return res.status(400).json({ message: "Owner ID is required" });
        }

        const insertId = await Interaction.createCallRequest({ tenant_id, owner_id });
        res.status(201).json({ success: true, insertId, message: "Call request sent successfully" });
    } catch (error) {
        console.error("CREATE CALL ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCallRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const { role } = req.query;

        const requests = await Interaction.getCallRequestsForUser(userId, role);
        res.json({ success: true, data: requests });
    } catch (error) {
        console.error("GET CALLS ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateCallStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const ownerId = req.user.id;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const callRequest = await Interaction.getCallRequestById(id);
        if (!callRequest) {
            return res.status(404).json({ message: "Call request not found" });
        }

        await Interaction.updateCallStatus(id, status);

        // Send Notification to Tenant
        const message = `Owner has ${status} your call request.`;
        await Notification.create(callRequest.tenant_id, ownerId, null, 'call_' + status, message);

        res.json({ success: true, message: `Call request ${status}` });
    } catch (error) {
        console.error("UPDATE CALL STATUS ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};
