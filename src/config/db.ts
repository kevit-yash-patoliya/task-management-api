import mongoose from "mongoose";

async function connectDB(MONGO_URI:string | null ,DB_NAME:string | null){
    // Connect to MongoDB and Start Server
    await mongoose.connect(MONGO_URI || "",{
        dbName:DB_NAME as string,
    })
}

export default connectDB;
