import { Router } from "express";
import { addProperty } from "../controllers/property.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/add" , authMiddleware , addProperty);

export default router;
