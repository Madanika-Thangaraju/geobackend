import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  updatePush
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", auth, getProfile);              // GET profile
router.put("/", auth, updateProfile);           // UPDATE profile
router.patch("/notifications", auth, updatePush); // TOGGLE push switch

export default router;
