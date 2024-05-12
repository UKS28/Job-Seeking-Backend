import asyncErrorHandler from "../Middlewares/asyncErrorHandler.js"
import { ErrorHandler } from "../Middlewares/globalErrorHandler.js";
import { Job } from "../Models/jobModel.js";

export const test=(req,res,next)=>{
    res.json({
        message:"test success"
    })
}

export const getAllJob=asyncErrorHandler(async (req,res,next)=>{
    const jobs=await Job.find({expired:false});
    res.status(200).json({
        message:"success",
        jobs
    });
})

export const postJob=asyncErrorHandler(async(req,res,next)=>{
 
    const {role}=req.user;
    if(role!=="Employee"){
        return next(new ErrorHandler("resouce not available to user",400))
    }

    const { 
        company,
        country,
        location,
        position,
        job_description,
        skill,
        fixedSalary,
        expired,
        jobType}=req.body;

    if(!company ||!country || !location || !position || !job_description || !skill || !fixedSalary || !jobType){
        return next(new ErrorHandler("please provide complete detail",400))
    }

    const newJob=await Job.create({
        company,
        country,
        location,
        position,
        job_description,
        skill,
        fixedSalary,
        jobType,
        expired,
        postedBy:req.user._id
    })
    res.status(201).json({
        success:true,
        message:"job created successfully",
        newJob
    })

})

export const editJob=asyncErrorHandler(async (req,res,next)=>{
    const {role}=req.user;
    if(role!=="Employee"){
        return next(new ErrorHandler("resouce not available to user",400))
    }

    const {id}=req.params;
    let job=await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Opps job not found",404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success:true,
        message:"job updated successfully",
        job
    });
})