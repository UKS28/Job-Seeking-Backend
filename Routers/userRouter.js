import express from "express"
import { fun, getUser, login, logout, register } from "../Controllers/userController.js";
import { isAuthenticate } from "../Middlewares/auth.js";
const userRouter=express.Router();

userRouter.get('/',fun)
userRouter.get('/logout',isAuthenticate,logout);
userRouter.get('/getuser',isAuthenticate,getUser);
userRouter.post('/register',register);
userRouter.post('/login',login);

export default userRouter;
