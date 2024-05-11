import express from "express"
import { fun, register } from "../Controllers/userController.js";
const userRouter=express.Router();

userRouter.get('/',fun)
userRouter.post('/register',register);

export default userRouter;
