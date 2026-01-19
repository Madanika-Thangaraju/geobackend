import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getProfile,
  getOwnerListings,
  // updateProfile,
  // updatePush
} from "../controllers/owner.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);              // GET profile
router.get("/listings/:userId", authMiddleware, getOwnerListings); // GET owner listings
router.put("/profile", authMiddleware, updateProfile);           // UPDATE profile
// router.patch("/notifications", authMiddleware, updatePush); // TOGGLE push switch

export default router;
