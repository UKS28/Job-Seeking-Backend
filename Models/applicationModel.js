import mongoose from 'mongoose'
import validator from "validator";

const applicationSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true, "please enter your name"]
    },
    email:{
        type:String,
        require:[true,"please provide mail id"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    contact:{
      type:Number,
      require:[true,"please provide your contact number"]
    },
    gender:{
        type:String,
        enum:["Male","Female","Prefer Not to Say"]
    },
    currentLocation:{
        type:String,
        require:[true,"please provide your address"]
    },
   
    yearOfGraduation: {
        type: String,
        require:[true,"please provide the graduation year"]
    },
    experienceYear:{
      type:Number,
      require:[true,"please provide years of experience"]
    },
    skillSet:{
      type:String,
      require:[true,"provide atleast three skillsets"]
    },
    whyYou:{
      type:String,
      require:[true,"say any thing you want to say to recruiter"]
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        require:true,
    },
    applicantID: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["Job Seeker"],
          required: true,
        },
      },
    employerID: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["Employee"],
          required: true,
        }
    },
    

});

export const Application=mongoose.model("Application",applicationSchema);