import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

const app = express();

// ✅ CORS (handles preflight automatically)
app.use(cors({
  origin: "*", // dev only
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/testing", (req, res) => {
  res.send("hello");
});

export default app;
