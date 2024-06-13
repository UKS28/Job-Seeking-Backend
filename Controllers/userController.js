import asyncErrorHandler from "../Middlewares/asyncErrorHandler.js"
import { ErrorHandler } from "../Middlewares/globalErrorHandler.js";
import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt"
import { sendLogout, sendToken } from "../Utils/jwtTokenSend.js";
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
   sendToken(res,newUser,200,"registeration successful")

}
)


export const login=asyncErrorHandler(async (req,res,next)=>{
    const { email,password,role }=req.body;
    
    // 1.Validation
    if(!email || !password || !role)
    {
        return next(new ErrorHandler("all field are required",400));
    }

    const user=await User.findOne({email}).select("+password");

    if(!user)
    {
        return next(new ErrorHandler("email id does not exist",400));
    }
    // console.log(user)
    const compare=await bcrypt.compare(password,user.password);
    if(!compare)
    {
        return next(new ErrorHandler("password does not match",400));
    }

    if(role!==user.role)
    {
        return next(new ErrorHandler("user does not exist with selected role",400));
    }
    
    // 2.SEND RESPONSE
    sendToken(res,user,200,"login successful");
})


export const logout=asyncErrorHandler((req,res,next)=>{
  sendLogout(res,201,"Logout Successful");
})

export const getUser=asyncErrorHandler((req,res,next)=>{
    const  user =req.user;
    res.status(200).json({
        success: true,
        user,
    });
})


