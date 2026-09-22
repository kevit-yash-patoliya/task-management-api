import express, {type  Request,type  Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environments
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatabase';

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running smoothly!' });
});


// routes 



// Connect to MongoDB and Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
