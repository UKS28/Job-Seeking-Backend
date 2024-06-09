import { config } from 'dotenv';
import express from 'express'
import connectDB from './DataBase/dbConnect.js';
import {errorMiddleware} from './Middlewares/globalErrorHandler.js';
import userRouter from './Routers/userRouter.js';
import cookieParser from 'cookie-parser';
import jobRouter from './Routers/jobRouter.js';
import applicationRouter from './Routers/applicationRouter.js';

const app=express();

config({path:"./configuration/config.env"});
connectDB();

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/users',userRouter);
app.use('/api/v1/jobs',jobRouter);
app.use('/api/v1/applications',applicationRouter);

app.use(errorMiddleware);

export default app;