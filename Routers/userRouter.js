import express from "express"
import { fun, login, logout, register } from "../Controllers/userController.js";
import { isAuthenticate } from "../Middlewares/auth.js";
const userRouter=express.Router();

userRouter.get('/',fun)
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/logout',isAuthenticate,logout);

export default userRouter;
