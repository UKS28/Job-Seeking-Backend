import asyncErrorHandler from "../Middlewares/asyncErrorHandler.js";

export const test= (req,res,next)=>{
    res.json({
        message:"hello",
    })
}



