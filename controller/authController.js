const User = require("../models/auth");
const {ObjectId} = require("mongodb");
const sendEmail = require("../utils/mailer");

exports.postSignup =async (req, res, next) => {
    let { fname, lname, email, password } = req.body;
    const user = new User(fname, lname, email, password);

    const Email = await sendEmail(user.email,"Registeration",
            `<body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="100%" cellpadding="0" cellspacing="0"
          style="
            max-width:520px;
            background:#ffffff;
            border-radius:14px;
            padding:32px;
            box-shadow:0 15px 40px rgba(0,0,0,0.08);
          ">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="margin:0; font-size:28px; color:#6366f1;">
                Todo<span style="color:#facc15;">Pro</span>
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="color:#1f2937; font-size:15px; line-height:1.7;">
              <p>Hi <strong>${user.fname}</strong> 👋,</p>

              <p>
                Welcome to <strong>TodoPro</strong>! 🎉  
                Your account has been successfully created.
              </p>

              <p>
                With TodoPro, you can:
              </p>

              <ul style="padding-left:18px; margin:15px 0;">
                <li>✅ Organize your daily tasks</li>
                <li>📅 Track due dates easily</li>
                <li>🔥 Set task priorities</li>
                <li>🚀 Boost your productivity</li>
              </ul>

              <p>
                You’re all set! Log in and start managing your tasks smarter.
              </p>

              <!-- CTA -->
              <div style="text-align:center; margin:30px 0;">
                <a href="http://localhost:3000/login"
                   style="
                     background:#6366f1;
                     color:#ffffff;
                     text-decoration:none;
                     padding:12px 26px;
                     border-radius:10px;
                     font-weight:bold;
                     display:inline-block;
                   ">
                  Login to TodoPro
                </a>
              </div>

              <p>
                If you didn’t create this account, please ignore this email.
              </p>

              <p style="margin-top:25px;">
                Cheers,<br />
                <strong>TodoPro Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:25px; font-size:12px; color:#6b7280; text-align:center;">
              © ${new Date().getFullYear()} TodoPro. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body> `
    );

    console.log("Login Email send successfully", Email);

    const result = await user.userSave();
    res.json(result);
}

exports.postLogin = async (req, res, next) => {
    const data = req.body;
    const user = await User.findByEmail(data.email);
    console.log("fouded this", user)
    if(!user){
         res.json({
            message:"User not Found",
         })
    } else if(user.password == data.password) {
        const Email = await sendEmail(user.email,"Login Alert 🔐",
            `<body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0"
          style="
            max-width:520px;
            background:#ffffff;
            border-radius:14px;
            padding:32px;
            box-shadow:0 15px 40px rgba(0,0,0,0.08);
          ">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="margin:0; font-size:28px; color:#6366f1;">
                Todo<span style="color:#facc15;">Pro</span>
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="color:#1f2937; font-size:15px; line-height:1.7;">
              <p>Hi <strong>${user.fname}</strong>,</p>

              <p>
                We detected a <strong>new login</strong> to your TodoPro account.
              </p>

              <p>
                If this was you, no action is required.
              </p>

              <p style="color:#dc2626;">
                If you don’t recognize this activity, please reset your password immediately.
              </p>

              <!-- CTA -->
              <div style="text-align:center; margin:30px 0;">
                <a href="http://localhost:3000/forgot-password"
                   style="
                     background:#ef4444;
                     color:#ffffff;
                     text-decoration:none;
                     padding:12px 26px;
                     border-radius:10px;
                     font-weight:bold;
                     display:inline-block;
                   ">
                  Secure My Account
                </a>
              </div>

              <p style="margin-top:25px;">
                Stay safe,<br />
                <strong>TodoPro Security Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:25px; font-size:12px; color:#6b7280; text-align:center;">
              © ${new Date().getFullYear()} TodoPro. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>`
    );

    console.log("Login Email send successfully", Email);

         req.session.isLoggedIn = true;
        res.json(user);
       
    }
    else {
        res.json({
            message: "Password Incorrect"
        })
    }

}

exports.logout = (req, res, next) => {
    req.session.isLoggedIn = false;
}

let otp;

exports.forget = async (req, res, next) => {
    const { email } = req.body;
    console.log("Email to find in backend is:", email);
    const user = await User.findByEmail(email);
    if(!user) {
        res.json({
            status: false
        })
    } else {
         otp = Math.floor(100000 + Math.random() * 600000);
        console.log("Otp is", otp);
        const Email = await sendEmail(user.email, "Verification OTP", `<body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; background:#ffffff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.08); padding:30px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="margin:0; color:#6366f1;">Todo<span style="color:#facc15;">Pro</span></h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="color:#1f2937; font-size:15px; line-height:1.6;">
              <p>Hi <strong>${user.fname}</strong>,</p>

              <p>
                Use the verification code below to complete your email verification.
                This code is valid for <strong>5 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="
                margin:30px 0;
                padding:18px;
                background:#f4f6fb;
                border-radius:10px;
                text-align:center;
                font-size:28px;
                font-weight:bold;
                letter-spacing:6px;
                color:#6366f1;
              ">
                ${otp}
              </div>

              <p>
                If you did not request this verification, you can safely ignore this email.
              </p>

              <p style="margin-top:30px;">
                Thanks,<br />
                <strong>TodoPro Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:20px; font-size:12px; color:#6b7280; text-align:center;">
              © ${new Date().getFullYear()} TodoPro. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>`);
            // const result = await User.getuseridbyemail(email);
            // console.log("user id for otp is ", result);
            res.json({id:user._id, status: true});
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    console.log("USER IS TO UPDATE PASS IS:", id);
    const { password } = req.body;
    console.log("Update pass is:", password);
    const result = await User.updatePasswordByUserId(password, id);
    console.log("Updated pass successfully", result)
    res.json(result);

}

exports.otpverify = async (req, res, next) => {
    const data = req.body;
    if(data.otp == otp ){
        res.json({status:true})
    } else {
        res.json({status: false})
    }
}