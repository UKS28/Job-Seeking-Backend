import asyncErrorHandler from "../Middlewares/asyncErrorHandler.js"
import { ErrorHandler } from "../Middlewares/globalErrorHandler.js";
import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt"
import { sendToken } from "../Utils/jwtTokenSend.js";
// test

export const fun=(req,res,next)=>{
        res.json({
            message:"hey from user router!",
        })
}

export const register=asyncErrorHandler(async (req,res,next)=>{
    // 1.Validation
   const { name, email, password , role }=req.body;

   if(!name || !email || !password || !role)
   {
     return next(new ErrorHandler("some details missing ",400));
   }
   const user=await User.findOne({email});
   if(user)
   {
    console.log(user);
    return next(new ErrorHandler("email id already exist",409));
   }
//    2.process
   const hashPassword=await bcrypt.hash(password,10);

   const newUser=await User.create({
    name,
    email,
    password:hashPassword,
    role,
   });

//    3.Send response
   sendToken(res,newUser,200,"user registered successfully")

}
)



