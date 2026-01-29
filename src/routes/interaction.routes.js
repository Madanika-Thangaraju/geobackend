import { Router } from "express";
import {
    createTourRequest,
    getTourRequests,
    updateTourStatus,
    createCallRequest,
    getCallRequests,
    updateCallStatus
} from "../controllers/interaction.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Tour Requests
router.post("/tour", authMiddleware, createTourRequest);
router.get("/tours", authMiddleware, getTourRequests);
router.patch("/tour/:id/status", authMiddleware, updateTourStatus);

// Call Requests
router.post("/call", authMiddleware, createCallRequest);
router.get("/calls", authMiddleware, getCallRequests);
router.patch("/call/:id/status", authMiddleware, updateCallStatus);

export default router;
