import { Request, Response } from "express";
import { ApiError } from "../../utils/api.error.js";
import { findById } from "../users/users.service.js";
import {
  createTaskService,
  assignTaskService,
  updateTaskStatusService,
  getTasksService,
  type IGetTasks,
} from "./tasks.service.js";

export async function createTask(req: Request, res: Response) {
  const task = await createTaskService(req.body);
  if (!task) {
    throw ApiError.badRequest("task creation failed");
  }
  return res
    .status(201)
    .json({ success: true, message: "task created successfully", task });
}
export async function assignTask(req: Request, res: Response) {
  const data = req.body;
  const user = await findById(data.assignedTo);
  if (!user) {
    throw ApiError.notFound("user not found");
  }
  const task = await assignTaskService(data);
  return res
    .status(200)
    .json({ success: true, message: "task assigned successfully", task });
}

export async function updateTaskStatus(req: Request, res: Response) {
  const task = await updateTaskStatusService(req.body);
  if (!task) {
    throw ApiError.notFound("task not found");
  }
  return res
    .status(200)
    .json({ success: true, message: "task updated successfully", task });
}

export async function getTasks(req: Request, res: Response) {
  const paginatedResponse = await getTasksService(req.query as IGetTasks);

  return res.status(200).json({
    success: true,
    message: "tasks fetched successfully",
    paginatedResponse,
  });
}
