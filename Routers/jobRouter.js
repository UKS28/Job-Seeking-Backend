import express from "express";
import { isAuthenticate } from "../Middlewares/auth.js";
import { postJob, test } from "../Controllers/jobController.js";

const jobRouter=express.Router();
jobRouter.get('/',test);

jobRouter.post('/',isAuthenticate,postJob)
export default jobRouter;