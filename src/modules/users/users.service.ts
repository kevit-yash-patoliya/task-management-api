import { UserModel } from "./schema/user.schema.js";

export async function findById(id:string){
    const user = await UserModel.findById(id);
    
    return user;
}