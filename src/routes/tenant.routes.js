import { Router } from "express";
import { getproperties } from "../controllers/tenant.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/all/properties", getproperties);

export default router;
