import mongoose from "mongoose"

const jobSchema= new mongoose.Schema({
   companyName:{
    type:String,
    require:[true,"Company name required"]
   },
   companyMotto:{
    type:String,
    require:[true,"Motto required"]
   },
   aboutCompany:{
    type:String,
    require:[true,"About is required"]
   },
   employeeCount:{
   type:Number,
   require:[true,"Employee Count is require"]
   },
   location:{
    type:String,
    require:[true,"Job location Required"]
   },
   role:{
    type:String,
    require:[true,"job role required"]
   },
   fixedSalary:{
    type:Number,
    require:[true,"fixed salary required"]
   },
   experience:{
    type:Number,
    require:[true,"experience reuired"]
   },
   job_description:{
    type:String,
    require:[true,"JD required"],
    minLength:[8,"JD should be greater than 8"]
   },
   skill:{
    type:String,
    require:[true,"skills are required"]
   },
   jobType:{
    type:String,
    enum:["Full Time","Internship"],
  },
  jobMode:{
    type:String,
    enum:["Remote","Hybrid","Onsite"],
  },

   expired: {
    type: Boolean,
    default: false,
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
