import express from "express";
import { body } from "express-validator";
import {
  assignTask,
  createTask,
  getTasks,
  updateTaskStatus,
} from "./tasks.controller.js";
import { TaskStatus } from "@/utils/enums/tasks.status.js";
import { Priority } from "@/utils/enums/tasks.priority.js";

const router = express.Router();


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */

router.get("/", getTasks);


/**
 * @swagger
 * /api/tasks/create:
 *   post:
 *     summary: Retrieve a list of tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Task 1
 *               description:
 *                 type: string
 *                 example: Task 1 description
 *               priority:
 *                 type: string
 *                 enum: ["LOW", "MEDIUM", "HIGH"]
 *                 example: MEDIUM
 *               status:
 *                 type: string
 *                 enum: ["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                 example: TODO
 *               dueDate:
 *                 type: string
 *                 example: 2022-01-01
 *               assignedTo:
 *                 type: string
 *                 example: 1
 *               createdBy:
 *                 type: string
 *                 example: 1  
 */
router.post(
  "/create-task",
  body("title").isString().isLength({ min: 3 }),
  body("description").isString().isLength({ min: 5 }),
  body("priority").isIn([Priority.LOW, Priority.MEDIUM, Priority.HIGH]),
  body("status")
    .default(TaskStatus.TODO)
    .isIn([
      TaskStatus.TODO,
      TaskStatus.IN_PROGRESS,
      TaskStatus.COMPLETED,
      TaskStatus.CANCELLED,
    ]),
  body("dueDate").isString(),
  body("assignedTo").isString(),
  body("createdBy").isString(),
  createTask,
);


/**
 * @swagger
 * /api/tasks/assign-task:
 *   post:
 *     summary: Assign a task to a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignedTo:
 *                 type: string
 *                 example: 1
 *               id:
 *                 type: string
 *                 example: 1
 */
router.post(
  "/assign-task",
  body("assignedTo").isString(),
  body("id").isString(),
  assignTask,
);

/**
 * @swagger
 * /api/tasks/update-task-status:
 *   patch:
 *     summary: Update the status of a task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: ["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                 example: TODO
 */
router.patch(
  "/update-task-status",
  body("id").isString(),
  body("status").isIn([
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
    TaskStatus.CANCELLED,
  ]),
  updateTaskStatus,
);

export default router;
