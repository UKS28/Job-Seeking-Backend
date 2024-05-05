import { config } from 'dotenv';
import express from 'express'
import connectDB from './DataBase/dbConnect.js';

const app=express();

config({path:"./configuration/config.env"});
connectDB();

export default app;