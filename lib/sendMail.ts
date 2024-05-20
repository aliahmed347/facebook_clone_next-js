"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SERVER_GMAIL, // Replace with your Gmail address
    pass: process.env.SERVER_GMAIL_APP, // Replace with your App Password
  },
});

export const sendMail = async (data: any) => {
  const { to, subject, html } = data;
  const mailOptions = {
    from: `Facebook < ${process.env.SERVER_GMAIL} >`, // Replace with your name and email
    to, // Replace with recipient's email
    subject: subject,
    // text: "This is the plain text body of your email.",
    html: html, // Optional HTML content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
