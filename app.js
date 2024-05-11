import { config } from 'dotenv';
import express from 'express'
import connectDB from './DataBase/dbConnect.js';
import {errorMiddleware} from './Middlewares/globalErrorHandler.js';
import userRouter from './Routers/userRouter.js';


const app=express();


config({path:"./configuration/config.env"});

connectDB();
app.use(express.json())

app.use('/api/v1/users',userRouter);

app.use(errorMiddleware);
export default app;