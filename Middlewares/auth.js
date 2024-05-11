import { User } from "../Models/userModel.js";
import asyncErrorHandler from "./asyncErrorHandler.js";
import { ErrorHandler } from "./globalErrorHandler.js"
import jwt from "jsonwebtoken"

export const isAuthenticate=asyncErrorHandler(async (req,res,next)=>{

    const { token }=req.cookies;
 
    if(!token)
    {
        return next(new ErrorHandler("user not authorize",401));

    }
    
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);

    next();
})