const express = require('express');
const router = express.Router();
const {signUp} = require("../controller/authControllerSignUp");
const {logIn} = require("../controller/authControllerLogin");
const {logOut} = require("../controller/authControllerLogout");
const { verifyEmail } = require('../controller/authControllerVerifyEmail');
const { forgotPassword } = require('../controller/authControllerForgotPassword');
const { resetPassword } = require('../controller/authControllerResetPassword');
const { verifyToken } = require('../middleware/verifyToken');
const { checkAuth } = require('../controller/authControllerCheckAuth');

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", logIn);
router.post("/logout", logOut);

router.get("/check-auth", verifyToken, checkAuth);

module.exports = router;