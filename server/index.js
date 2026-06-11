
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/connectDB.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import notesRouter from './routes/generate.route.js';
import pdfRouter from './routes/pdf.routes.js';
import creditRouter from './routes/credits.route.js';
import { StripeWebhook } from './controllers/credits.controller.js';
dotenv.config();


 const PORT = process.env.PORT;
 const app = express();

app.post(
    "/api/credits/webhook",
    express.raw({ type: 'application/json' }),
    StripeWebhook
);

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
 app.use("/api/pdf" , pdfRouter);
 app.use("/api/credit" , creditRouter);

 app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
     connectDB();
 });