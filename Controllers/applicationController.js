import asyncErrorHandler from "../Middlewares/asyncErrorHandler.js";
import { ErrorHandler } from "../Middlewares/globalErrorHandler.js";
import { Application } from "../Models/applicationModel.js";
import { Job } from "../Models/jobModel.js";

export const test= (req,res,next)=>{
    res.json({
        message:"hello",
    })
}

export const postApplication= asyncErrorHandler(async (req,res,next)=>{
    // 1. if role!== job seeker not allowed
    // 2. resume ka lafda
    // 3. extract the information and save the information
    // 4. checks - if job not exist
    //             if email id already exist for that job 
    //             if any one of required detail not filled
    const { role }=req.user;
    if(role==="Employee") {
        return next(new ErrorHandler("Resource not available for employee",400));
    }
     
    const { jobId }=req.params;
    const job= await Job.findById(jobId);
    if(!job){
        return next(new ErrorHandler("Job does not exist",400));
    }

    const { 
        name,
        email,
        gender,
        address,
        contact,
        DOB} =req.body;

    const applicantID={
        user:req.user._id,
        role:"Job Seeker"
    }
    const employerID={
        user:job.postedBy,
        role:"Employee"
    }


    if( !name||
        !email||
        !gender||
        !address||
        !contact||
        !DOB) {
            return next(new ErrorHandler("please fill all the details",400));
        }  
    const applications=await Application.find({jobId:jobId, email:email});
    if(applications.length>0){
        return next(new ErrorHandler("applicant already exist",400));
    }
    
    const application=await Application.create({
        name,
        email,
        gender,
        address,
        contact,
        DOB,
        jobId,
        applicantID,
        employerID
    });
    res.status(201).json({
        application,
        message:"application posted",
        success:true
    })
   
}
);


export const getApplicationEmployee= asyncErrorHandler(async (req,res,next)=>{
    const { role }= req.user;
    if(role!=="Employee"){
        return next(new ErrorHandler("resource not available",400));
    }

    const {jobId }= req.params;

    const job=await Job.findById(jobId);

    if(!job){
        return next(new ErrorHandler("job does not exists",400));
    }

    const applications= await Application.find({"employerID.user":req.user._id, jobId:jobId});
    res.status(200).json({
        success:true,
        applications,
        message:"successfully get all the application for the job "
    })
})


export const getApplicationJobSeeker=asyncErrorHandler(async (req,res,next)=>{
    const { role }= req.user;
    if(role!=="Job Seeker"){
        return next(new ErrorHandler("resource not available",400));
    }

    const applications= await Application.find({"applicantID.user":req.user._id});
    res.status(200).json({
        success:true,
        applications,
        message:"successfully get all the application for the applicant"
    })
})

