const express = require('express');
const router = express.Router();
const {signUp} = require("../controller/authControllerSignUp");
const {logIn} = require("../controller/authControllerLogin");
const {logOut} = require("../controller/authControllerLogout");
const { verifyEmail } = require('../controller/authControllerVerifyEmail');
const { forgotPassword } = require('../controller/authControllerForgotPassword');

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;