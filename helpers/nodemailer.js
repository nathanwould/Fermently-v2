const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });
  let info = await transporter.sendMail(email);
}

module.exports = sendEmail;