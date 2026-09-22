import { Router } from "express";
import { body, query } from "express-validator";
import { Priority } from "@/utils/enums/tasks.priority.js";
import { TaskStatus } from "@/utils/enums/tasks.status.js";
import {
  assignTask,
  createTask,
  getTasks,
  updateTaskStatus,
} from "./tasks.controller.js";

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     description: Returns a list of tasks based on the query parameters.
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: ["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *       - name: priority
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: ["LOW", "MEDIUM", "HIGH"]
 *       - name: createdBy
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: assignedTo
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: tasks fetched successfully
 *                 paginatedResponse:
 *                   type: object
 *                   properties:
 *                     tasks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: Task 1
 *                           description:
 *                             type: string
 *                             example: Task 1 description
 *                           priority:
 *                             type: string
 *                             enum: ["LOW", "MEDIUM", "HIGH"]
 *                             example: MEDIUM
 *                           status:
 *                             type: string
 *                             enum: ["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
 *                             example: TODO
 *                           dueDate:
 *                             type: string
 *                             example: 2022-01-01
 *                           assignedTo:
 *                             type: string
 *                             example: 1
 *                           createdBy:
 *                             type: string
 *                             example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 */

router.get(
  "/",
  query("limit").isNumeric().optional(),
  query("page").isNumeric().optional(),
  query("status")
    .isIn([
      TaskStatus.TODO,
      TaskStatus.IN_PROGRESS,
      TaskStatus.COMPLETED,
      TaskStatus.CANCELLED,
    ])
    .optional(),
  query("priority")
    .isIn([Priority.LOW, Priority.MEDIUM, Priority.HIGH])
    .optional(),
  query("createdBy").isString().optional(),
  query("assignedTo").isString().optional(),
  getTasks,
);

/**
 * @swagger
 * /api/tasks/create-task:
 *   post:
 *     summary: Create a new task
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
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: task created successfully
 *                 task:
 *                   type: object
 *       500:
 *         description: Internal server error
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
 *     responses:
 *       200:
 *         description: Task assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: task assigned successfully
 *                 task:
 *                   type: object
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
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
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: task updated successfully
 *                 task:
 *                   type: object
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
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
