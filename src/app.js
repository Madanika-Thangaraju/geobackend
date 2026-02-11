import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

import propertyRoutes from "./routes/property.routes.js";

import tenantProperties from "./routes/tenant.routes.js";

import ownerRoutes from "./routes/owner.routes.js"
import chatRoutes from "./routes/chat.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import interactionRoutes from "./routes/interaction.routes.js";

const app = express();

app.use(cors({
  origin: "*", // dev only
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/users", userRoutes);

app.use("/properties", propertyRoutes);

app.use("/tenants", tenantProperties);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/testing", (req, res) => {
  res.send("hello");
});

app.use("/owners", ownerRoutes);
app.use("/notifications", notificationRoutes);
console.log("🚀 Registering Chat Routes...");
app.use("/chat", chatRoutes);
app.use("/interactions", interactionRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
