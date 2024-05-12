import express from "express";
import { isAuthenticate } from "../Middlewares/auth.js";
import { editJob, getAllJob, postJob, test } from "../Controllers/jobController.js";

const jobRouter=express.Router();
// jobRouter.get('/',test);
jobRouter.get('/getall',getAllJob);
jobRouter.post('/post',isAuthenticate,postJob);
jobRouter.put('/update/:id',isAuthenticate,editJob);
export default jobRouter;