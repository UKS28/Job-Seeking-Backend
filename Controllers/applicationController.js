import asyncErrorHandler from "../Middlewares/asyncErrorHandler.js";
import { ErrorHandler } from "../Middlewares/globalErrorHandler.js";
import { Application } from "../Models/applicationModel.js";
import { Job } from "../Models/jobModel.js";
import { sendApplicationStatusMail }from '../Utils/applicationStatusSend.js'


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
        contact,
        gender,
        currentLocation,
        yearOfGraduation,
        experienceYear,
        skillSet,
        whyYou
      } = req.body;

    const applicantID={
        user:req.user._id,
        role:"Job Seeker"
    }
    const employerID={
        user:job.postedBy,
        role:"Employee"
    }




    if (
        !name ||
        !email ||
        !contact ||
        !gender ||
        !currentLocation ||
        !yearOfGraduation ||
        !experienceYear ||
        !skillSet ||
        !whyYou
      ) {
            return next(new ErrorHandler("please fill all the details",400));
        }  
    const applications=await Application.find({jobId:jobId, email:email});
    if(applications.length>0){
        // console.log(jobId, email);
        // console.log(applications);
        return next(new ErrorHandler("Already Applied",400));
    }
    
    const application = await Application.create({
        name,
        email,
        contact,
        gender,
        currentLocation,
        yearOfGraduation,
        experienceYear,
        skillSet,
        whyYou,
        jobId,
        applicantID,
        employerID,
        jobDetails:job
      });
    res.status(201).json({
        application,
        message:"Application sent succesfully",
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


export const alreadyApplied= asyncErrorHandler(async (req,res,next)=>{
    const {role}=req.user;
    const { jobId }=req.params;

    if(role!=="Job Seeker"){
        return next(new ErrorHandler("resource not available",400));
    }

    const applications=await Application.find({jobId:jobId, "applicantID.user":req.user._id});
    let final=false;
    if(applications.length>0)    
        final=true;

    res.status(200).json({
        success:true,
        final,
        message:"get result succesfully"
    })

})


export const editStatus = asyncErrorHandler(async (req, res, next) => {
    const { role, _id } = req.user;
  
    // Ensure only employees can edit the status
    if (role !== "Employee") {
      return next(new ErrorHandler("Resource not available", 400));
    }
  
    const { applicationId } = req.params;
    const { status } = req.body;
  
    // Validate the required fields
    if (!applicationId || !status) {
      return next(new ErrorHandler("Application ID and new status are required", 400));
    }
  
    // Find and update the application
    const application = await Application.findById(applicationId);
  
    if (!application) {
      return next(new ErrorHandler("Application not found", 404));
    }
  
    // Ensure the employer making the request is the one who posted the job
    if (application.employerID.user.toString() !== _id.toString()) {
      return next(new ErrorHandler("You are not authorized to update this application", 403));
    }
  
    application.status = status;
    await application.save();
  
    // Send email if status is "Short Listed"
    if (status === "Short Listed") {
      const { email: ownerContact } = application;
      const { role, companyName } = application.jobDetails;
      
      try {
        await sendApplicationStatusMail(ownerContact, role, companyName);
        console.log("Mail sent successfully");
      } catch (error) {
        return next(new ErrorHandler("server error while sending mail",500));
        console.log("Error sending mail:", error);
      }
    }
  
    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application
    });
  });
  