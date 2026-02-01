const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  secure:true,
  host: "smtp.gmail.com",
  auth: {
    user: "ritishbansal2006@gmail.com",        // 👈 YOUR GMAIL
    pass: "ffzt jnly pflq lmpc"  // 👈 GMAIL APP PASSWORD
  }
});

const sendEmail = async (to, subject, mess) => {
  try {
    await transporter.sendMail({
      from: "<ritishbansal2006@gmail.com>",
      to:to,
      subject:subject,
      html:mess
    });
    console.log("📧 Email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

module.exports = sendEmail;
