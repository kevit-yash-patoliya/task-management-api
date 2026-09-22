import { ITask, TaskModel } from "./schema/task.schema.js";

export interface IGetTasks {
  limit?: number;
  page?: number;
  status?: string;
  priority?: string;
  createdBy?: string;
  assignedTo?: string;
}

export async function findTaskService(id: string) {
  const task = await TaskModel.findById(id);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
}

export async function createTaskService(data: ITask) {
  const task = new TaskModel(data);
  await task.save();
  return task;
}

export async function assignTaskService(data: ITask) {
  const task = await TaskModel.findById(data.id);
  if (!task) {
    throw new Error("Task not found");
  }
  task.assignedTo = data.assignedTo;
  await task.save();
  return task;
}

export async function updateTaskStatusService(data: ITask) {
  const task = await TaskModel.findById(data.id);
  if (!task) {
    throw new Error("Task not found");
  }
  task.status = data.status;
  await task.save();
  return task;
}
export async function getTasksService({
  limit,
  page,
  status,
  priority,
  createdBy,
  assignedTo,
}: IGetTasks) {
  const query: any = {};
  if (status) {
    query.status = status;
  }
  if (priority) {
    query.priority = priority;
  }
  if (createdBy) {
    query.createdBy = createdBy;
  }
  if (assignedTo) {
    query.assignedTo = assignedTo;
  }

  const defaultLimit = Number(limit) || 10;
  const defaultPage = Number(page) || 1;
  const tasks = await TaskModel.find(query)
    .sort({ createdAt: -1 })
    .skip(Number(defaultLimit) * (Number(defaultPage) - 1))
    .limit(Number(defaultLimit));
  const totalTasks = await TaskModel.countDocuments(query);
  const totalPages = Math.ceil(totalTasks / defaultLimit);
  const hasNextPage = defaultPage < totalPages;
  const hasPrevPage = defaultPage > 1;
  return { tasks, totalPages, hasNextPage, hasPrevPage };
}
