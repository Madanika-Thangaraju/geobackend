import { Router } from "express";
import {
    getproperties,
    toggleLike,
    getLiked,
    toggleSave,
    getSaved,
    trackView,
    getRecentlyViewed
} from "../controllers/tenant.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/all/properties", authMiddleware, getproperties);
router.post("/like", authMiddleware, toggleLike);
router.get("/liked", authMiddleware, getLiked);
router.post("/save", authMiddleware, toggleSave);
router.get("/saved", authMiddleware, getSaved);
router.post("/view", authMiddleware, trackView);
router.get("/viewed", authMiddleware, getRecentlyViewed);

export default router;
