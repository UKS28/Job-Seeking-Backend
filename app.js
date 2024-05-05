import { config } from 'dotenv';
import express from 'express'
import connectDB from './DataBase/dbConnect.js';
import errorMiddleware from './Middlewares/globalErrorHandler.js';

const app=express();

config({path:"./configuration/config.env"});
connectDB();
app.use(errorMiddleware);

export default app;