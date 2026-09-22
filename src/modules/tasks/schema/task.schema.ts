import { Priority } from "@/utils/enums/tasks.priority.js";
import { TaskStatus } from "@/utils/enums/tasks.status.js";
import { Schema, Types, model } from "mongoose";
// Schema
const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
    },
    priority: { type: String, required: true, enum: ["LOW", "MEDIUM", "HIGH"] },
    createdBy: { type: Types.ObjectId, required: true, ref: "User" },
    assignedTo: { type: Types.ObjectId, required: true, ref: "User" },
    dueDate: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export interface ITask {
  id: Types.ObjectId;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  createdBy: Types.ObjectId;
  assignedTo: Types.ObjectId;
  dueDate: Date;
}

export const TaskModel = model("Task", schema);
