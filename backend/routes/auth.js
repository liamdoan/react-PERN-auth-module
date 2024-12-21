const express = require('express');
const router = express.Router();
const {signUp} = require("../controller/authControllerSignUp");
const {logIn} = require("../controller/authControllerLogin");
const {logOut} = require("../controller/authControllerLogout");
const { verifyEmail } = require('../controller/authControllerVerifyEmail');
const { forgotPassword } = require('../controller/authControllerForgotPassword');
const { resetPassword } = require('../controller/authControllerResetPassword');

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;