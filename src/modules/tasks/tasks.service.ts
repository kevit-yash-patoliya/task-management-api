import { TaskModel } from "./schema/task.schema.js";

export async function findTask(id:string){
    const task = await TaskModel.findById(id);
    if(!task){
        throw new Error("Task not found")
    }
    return task;
}