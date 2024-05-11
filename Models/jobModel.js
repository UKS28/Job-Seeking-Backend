import mongoose from "mongoose"

const jobSchema= new mongoose.Schema({
   company:{
    type:String,
    require:[true,"Company name required"]
   },
   country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
   location:{
    type:String,
   },
   position:{
    type:String,
    require:[true,"job position required"]
   },
   job_description:{
    type:String,
    require:[true,"JD required"],
    minLength:[8,"JD should be greater than 8"]
   },
   skill:{
    type:String,
   },
   fixedSalary:{
    type:Number,
    require:[true,"fixed salary required"]
   },
   expired: {
    type: Boolean,
    default: false,
  },
  jobType:{
    type:String,
    enum:["Remote","Hybrid","Onsite"],
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  }
})

export const Job=mongoose.model("Job",jobSchema);

// { company name, job position, description, salary, required skills , location, remote or onsite,expires }