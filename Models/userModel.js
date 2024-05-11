import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
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
        // maxLength:[32,"Password length should be less than 32"]
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

userSchema.methods.generateJwtToken= function(){
  
    const token=jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
   
    return token;
};

  
export const User =mongoose.model("User",userSchema);
