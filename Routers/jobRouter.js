import express from "express";
import { isAuthenticate } from "../Middlewares/auth.js";
import { getAllJob, postJob, test } from "../Controllers/jobController.js";

const jobRouter=express.Router();
// jobRouter.get('/',test);
jobRouter.get('/',getAllJob);
jobRouter.post('/',isAuthenticate,postJob)
export default jobRouter;