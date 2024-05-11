import express from "express";
import { test } from "../Controllers/jobController.js";

const jobRouter=express.Router();
jobRouter.get('/',test);

export default jobRouter;