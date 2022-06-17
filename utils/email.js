const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activeate in gmail "less secure app" option
  });
  // 2) Define the email options
  const mailOptions = {
    form: 'Facundo Rodrigruez <test@email.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  //   3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
