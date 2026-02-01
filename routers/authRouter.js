const express = require("express");
const authRouter = express.Router();

const authController = require("../controller/authController");

authRouter.post("/signup", authController.postSignup);
authRouter.post("/login", authController.postLogin);
authRouter.get("/logout", authController.logout);
authRouter.post("/findemail", authController.forget);
authRouter.post("/updatepass/:id", authController.update);
authRouter.post("/otp", authController.otpverify);

module.exports = authRouter;