import express from 'express'
import { isAuthenticate } from '../Middlewares/auth.js';
import { postApplication, test } from '../Controllers/applicationController.js';

const applicationRouter=express.Router();

applicationRouter.get('/',test);

export default applicationRouter