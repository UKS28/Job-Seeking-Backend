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
    gender:{
        type:String,
        enum:["Male","Female","Prefer Not to Say"]
    },
    address:{
        type:String,
        require:[true,"please provide your address"]
    },
    contact:{
        type:Number,
        require:[true,"please provide your contact number"]
    },
    DOB: {
        type: Date,
        default: Date.now,
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
          enum: ["Employer"],
          required: true,
        }
    },
    

});

export const Application=mongoose.Model("Application",applicationSchema);