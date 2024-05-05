import express from "express"
import { fun } from "../Controllers/userController.js";
const userRouter=express.Router();

userRouter.get('/',fun)

export default userRouter;
