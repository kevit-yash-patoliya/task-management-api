import { Request, Response } from "express";
import { findById } from "../users/users.service.js";
import {
  createTaskService,
  assignTaskService,
  updateTaskStatusService,
  getTasksService,
  type IGetTasks,
} from "./tasks.service.js";

export async function createTask(req: Request, res: Response) {
  try {
    const task = await createTaskService(req.body);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "task creation failed" });
    }
    return res
      .status(201)
      .json({ success: true, message: "task created successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "task created failed", error });
  }
}
export async function assignTask(req: Request, res: Response) {
  try {
    const data = req.body;
    const user = await findById(data.assignedTo);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const task = await assignTaskService(data);
    return res
      .status(200)
      .json({ success: true, message: "task assigned successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "task assigned failed", error });
  }
}

export async function updateTaskStatus(req: Request, res: Response) {
  try {
    const task = await updateTaskStatusService(req.body);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "task not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "task updated successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "task updated failed", error });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const paginatedResponse = await getTasksService(req.query as IGetTasks);

    return res.status(200).json({
      success: true,
      message: "tasks fetched successfully",
      paginatedResponse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "tasks fetched failed", error });
  }
}
