import express from "express";
import { isAuthenticate } from "../Middlewares/auth.js";
import { deleteJob, editJob, getAllJob, getMyJobs, getSingleJob, postJob, test } from "../Controllers/jobController.js";

const jobRouter=express.Router();
// jobRouter.get('/',test);
jobRouter.get('/getall',getAllJob);
jobRouter.get('/:id',getSingleJob);

jobRouter.post('/post',isAuthenticate,postJob);
jobRouter.put('/update/:id',isAuthenticate,editJob);
jobRouter.delete('/delete/:id',isAuthenticate,deleteJob);
export default jobRouter;