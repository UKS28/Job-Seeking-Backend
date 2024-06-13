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

export const getSingleJob=asyncErrorHandler(async (req,res,next)=>{
    const { id }=req.params;
    
    const job=await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("job not found",404));
    }
    res.status(200).json({
        success:true,
        message:"job found",
        job
    })
})



export const postJob=asyncErrorHandler(async(req,res,next)=>{
 
    const {role}=req.user;
    if(role!=="Employee"){
        return next(new ErrorHandler("resouce not available to user",400))
    }

    const { 
        companyName,
        companyMotto,
        aboutCompany,
        employeeCount,
        location,
        job_description,
        skill,
        fixedSalary,
        experience,
        jobType,
        jobMode
      } = req.body;
      
      if (!companyName || !companyMotto || !aboutCompany || !employeeCount || !location || !role || !job_description || !skill || !fixedSalary || !experience || !jobType || !jobMode) {
        return next(new ErrorHandler("Please provide complete details", 400));
      }
      
      const newJob = await Job.create({
        companyName,
        companyMotto,
        aboutCompany,
        employeeCount,
        location,
        role,
        job_description,
        skill,
        fixedSalary,
        experience,
        jobType,
        jobMode,
        postedBy: req.user._id
      });
      
      res.status(201).json({
        success: true,
        message:"job created successfully",
        job: newJob
      });
    

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

export const deleteJob=asyncErrorHandler(async (req,res,next)=>{
    const {role}=req.user;
    if(role!=="Employee"){
        return next(new ErrorHandler("resouce not available to user",400))
    }
    
    const {id}=req.params;
    const job=await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("job not found",404));
    }

    if(!job.postedBy.equals(req.user._id)){
        return next(new ErrorHandler("job is not yours",400));
    }

    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"Job deleted"
    })
    
})


export const getMyJobs = asyncErrorHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const myJobs = await Job.find({ postedBy: req.user._id });


    res.status(200).json({
      success: true,
      myJobs,
    });
  });


