import nodemailer from 'nodemailer';
import asyncErrorHandler from '../Middlewares/asyncErrorHandler.js';

export  const sendApplicationStatusMail =asyncErrorHandler( async (ownerContact, role, companyName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use SSL
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: 'Team Job Seeker',
      address: 'ujjwalks.it.20@nitj.ac.in',
    },
    to: `${ownerContact}`,
    subject: `Congratulations ! You are Shortlisted ✨✨✨`,
    html: `
      <div style="padding:10px;border-style:ridge">
        <p>Congratulations,</p><br>
        <p>You have been shortlisted for the ${role} role in ${companyName}</p>
        <p>Further the Company Interviewer will contact you, All the Best</p>
        <p>Regards,</p>
        <p>Team Job Seeker</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    return 
  }
});
