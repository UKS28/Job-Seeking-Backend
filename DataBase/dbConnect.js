
import mongoose from "mongoose";

const  connectDB= ()=>{
mongoose.connect(process.env.MOGODB_URI,{
    dbName: "JOB_SEEKING_WEBAPP",
})
.then(()=>{
   console.log("Connected to database");
})
.catch(err=>{
    console.log("Some error occur while connecting to database ",err)
})
}
export default connectDB


