import express from "express";
import taskRoutes from "./tasks/tasks.route.js";
const router = express.Router()
router.use('/tasks',taskRoutes)

export default router
