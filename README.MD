## Project Plan
### Error handling
- error handle middle ware
- error handler
- async error handler

### User model
{ name, email, password, role }
- user register✔
- user login✔
- logout✔

### Job model ✔

{
    "company": "Microsoft",
    "country": "India",
    "location": "Banglore",
    "position": "Product engineer",
    "job_description": "to do analysis of data work on Power BI",
    "skill": "Python,Pandas,Power BI,numpy,",
    "fixedSalary": 750000,
    "expired": false
    "jobType": Remote
    "jobPostedOn": ,
    "postedBy":
} 

- get all the jobs ✔
- post a new job ✔
- delete a job ✔
- update a particular job ✔
- get a particular job ✔
- get my jobs ✔

### Application Model
{
  resume,
  username, email id, gender(enum) ,address , mobile no., date of birth,
  userid, user type.(ref)
  employee, empoyee type (ref)
} ✔

- testing ✔
- post an application ✔  + resume part ( cloudnary )
- get all application for a particular job - to be a employee  ✔
 (as an employee i can post multiple jobs , if i click on each job it will show me some   applications)
- get all application of particular user - to be done by user  ✔
- if applicant already registered ✔

