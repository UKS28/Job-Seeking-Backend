import express from "express"
import { fun, login, register } from "../Controllers/userController.js";
const userRouter=express.Router();

userRouter.get('/',fun)
userRouter.post('/register',register);
userRouter.post('/login',login);

export default userRouter;
