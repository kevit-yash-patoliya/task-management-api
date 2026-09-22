import { ITask, TaskModel } from "./schema/task.schema.js";



export async function findTaskService(id:string){
    const task = await TaskModel.findById(id);
    if(!task){
        throw new Error("Task not found")
    }
    return task;
}

export async function createTaskService(data:ITask){
        const task = new TaskModel(data);
        await task.save()
        return task;
}

export async function assignTaskService(data:ITask){
    const task = await TaskModel.findById(data.id);
    if(!task){
        throw new Error("Task not found")
    }
    task.assignedTo = data.assignedTo;
    await task.save()
    return task;
}

export async function updateTaskStatusService(data:ITask){
    const task = await TaskModel.findById(data.id);
    if(!task){
        throw new Error("Task not found")
    }
    task.status = data.status;
    await task.save()
    return task;
}
export async function getTasksService(){
    const tasks = await TaskModel.find({});
    return tasks;
}