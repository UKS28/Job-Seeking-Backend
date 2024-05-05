import mongoose from "mongoose";
import validator from "validator";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter your name"]
    },
    email:{
        type:String,
        require:[true,"Please enter your email"],
        validate:[validator.isEmail,"please provide a valid email"]
    },
    password:{
        type:String,
        require:[true,"Please provide password"],
        minLenght:[8,"Password length should be greater than 8"],
        maxLength:[32,"Password length should be small than 32"]
    },
    role:{
        type:String,
        require:[true,"Please provide a role"],
        enum:["Job Seeker","Employee"],
    },
    
},
{
    timestamps:true,
});

export const User =mongoose.model("User",userSchema);
