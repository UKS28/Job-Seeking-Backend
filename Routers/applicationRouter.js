import express from 'express'
import { isAuthenticate } from '../Middlewares/auth.js';
import { alreadyApplied, getApplicationEmployee, getApplicationJobSeeker, postApplication, test ,editStatus} from '../Controllers/applicationController.js';

const applicationRouter=express.Router();

applicationRouter.get('/',test);
applicationRouter.get('/employer/getall/:jobId',isAuthenticate,getApplicationEmployee);
applicationRouter.get('/applicant/getall',isAuthenticate,getApplicationJobSeeker);
applicationRouter.get('/applicant/application/:jobId',isAuthenticate,alreadyApplied);
applicationRouter.post('/post/:jobId',isAuthenticate,postApplication);
applicationRouter.put('/employer/application/:applicationId',isAuthenticate,editStatus)

export default applicationRouter