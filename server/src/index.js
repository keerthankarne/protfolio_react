import "dotenv/config";
import express from "express";
import cors from "cors";

import projectsRoutes from "./routes/projects.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// --- Core middleware ---
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// --- Health check (B1) ---
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// --- Feature routes ---
app.use("/api/projects", projectsRoutes);
app.use("/api/contact", contactRoutes);

// --- 404 + centralized error handling (B6) — must be registered last ---
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Allowing CORS requests from ${CLIENT_ORIGIN}`);
});
