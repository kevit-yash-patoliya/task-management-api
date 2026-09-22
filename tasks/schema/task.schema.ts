import { Schema, Types, model } from "mongoose";
// Schema
const schema = new Schema(
  {
    id: { type: Types.ObjectId },
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

export const TaskModel = model("Task", schema);

