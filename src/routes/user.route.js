import { Router } from "express";
import {
  registerUser,
  loginUser,
  getusers,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/ping", (req, res) => {
  res.send("users route working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all",
  //  authMiddleware ,
     getusers);

export default router;
