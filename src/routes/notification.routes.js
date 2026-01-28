import express from "express";
import { getNotifications, markRead } from "../controllers/notification.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getNotifications);
router.put("/:id/read", authenticateToken, markRead);

export default router;
