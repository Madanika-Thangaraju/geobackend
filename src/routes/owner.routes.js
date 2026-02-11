import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getProfile,
  getOwnerListings,
  updateProfile,
  getStagnantProperties,
  getVisitedProperties,
  updatePush
} from "../controllers/owner.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);              // GET profile
router.get("/listings/:userId", authMiddleware, getOwnerListings); // GET owner listings
router.get("/stagnant", authMiddleware, getStagnantProperties);    // GET stagnant properties
router.get("/visited", authMiddleware, getVisitedProperties);      // GET visited properties
router.put("/profile", authMiddleware, updateProfile);           // UPDATE profile
router.patch("/notifications", authMiddleware, updatePush); // TOGGLE push switch

export default router;
