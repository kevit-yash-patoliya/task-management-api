import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import appRoutes from "./modules/route.js";
import { specs, swaggerUi } from "./swagger.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";
import { requestLogger } from "./middleware/request.logger.js";

// Load environments
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydatabase";
const DB_NAME = process.env.DB_NAME || "mydatabase";
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Health Check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running smoothly!" });
});

// routes
app.use("/api", appRoutes);

// Connect to MongoDB and Start Server
connectDB(MONGO_URI, DB_NAME)
  .then(() => {
    logger.info("Successfully connected to MongoDB.");
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Database connection failed:", error);
    process.exit(1);
  });
