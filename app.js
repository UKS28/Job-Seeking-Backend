import { config } from 'dotenv';
import express from 'express'

const app=express();

config({path:"./configuration/config.env"});

export default app;