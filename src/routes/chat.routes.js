import { Router } from "express";
import { sendMessage, getMessages, getConversations } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/messages/:otherUserId", authMiddleware, getMessages);
router.get("/conversations", authMiddleware, getConversations);

export default router;
