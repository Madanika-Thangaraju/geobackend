import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

import propertyRoutes from "./routes/property.routes.js";

import tenantProperties from "./routes/tenant.routes.js";

import ownerRoutes from "./routes/owner.routes.js"

const app = express();

app.use(cors({
  origin: "*", // dev only
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/users", userRoutes);

app.use("/properties" , propertyRoutes);

app.use("/tenants" , tenantProperties);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/testing", (req, res) => {
  res.send("hello");
});

app.use("/owners", ownerRoutes);

export default app;
