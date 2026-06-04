
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/connectDB.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import notesRouter from './routes/generate.route.js';
dotenv.config();


 const PORT = process.env.PORT;
 const app = express();
 app.use(cors(
    {origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE" , "OPTIONS"],
 }));
 app.use(express.json());
 app.use(cookieParser());
 app.get('/', (req, res) => {
     res.json({ message: "Exam Notes backend is running 🚀 " });
 });

 app.use("/api/auth" , authRouter);
 app.use("/api/user" , userRouter);
 app.use("/api/notes" , notesRouter);

 app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
     connectDB();
 });