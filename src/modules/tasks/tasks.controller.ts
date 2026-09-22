import { Request,Response } from "express";
import { TaskModel } from "./schema/task.schema.js";
import { UserModel } from "../users/schema/user.schema.js";



// create task 
export async function createTask(req:Request,res:Response){
    try {
        const data = req.body;
        const task = new TaskModel(data);
        await task.save()
        return res.status(201).json({success:true,message:"task created successfully",task})
    } catch (error) {
        return res.status(500).json({success:false,message:"task created failed",error})
    }
}
export async function assignTask(req:Request,res:Response){
    try {
        const data = req.body;
        const user = await UserModel.findById(data.assignedTo)
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        const task=await TaskModel.updateOne({id:data.id},{$set:{assignedTo:user.id}})
        return res.status(200).json({success:true,message:"task assigned successfully",task})
    } catch (error) {
        return res.status(500).json({success:false,message:"task assigned failed",error})
    }
}

export async function updateTaskStatus(req:Request,res:Response){
    try {
        const data = req.body
        const task = await TaskModel.updateOne({_id:data.id},{$set:{status:data.status}})
        if(!task){
            return res.status(404).json({success:false,message:"task not found"})
        }
        return res.status(200).json({success:true,message:"task updated successfully",task})
    } catch (error) {
        return res.status(500).json({success:false,message:"task updated failed",error})
    }
}

export async function getTasks(req:Request,res:Response){
    try {
        const tasks = await TaskModel.find();
        return res.status(200).json({success:true,message:"tasks fetched successfully",tasks})
    } catch (error) {
        return res.status(500).json({success:false,message:"tasks fetched failed",error})
    }   
}