import  { Schema, Types, model } from 'mongoose';
// Schema
const schema = new Schema({
    id:{type:Types.ObjectId},
  name: { type: String, required: true },
  email: { type: String, required: true },
},{timestamps:{createdAt:true,updatedAt:false}});

export const UserModel = model('User', schema);