const express = require('express');
const router = express.Router();
const {signUp} = require("../controllers/auth-controllers/authControllerSignUp");
const {logIn} = require("../controllers/auth-controllers/authControllerLogin");
const {logOut} = require("../controllers/auth-controllers/authControllerLogout");
const { verifyEmail } = require('../controllers/auth-controllers/authControllerVerifyEmail');
const { forgotPassword } = require('../controllers/auth-controllers/authControllerForgotPassword');
const { resetPassword } = require('../controllers/auth-controllers/authControllerResetPassword');
const { verifyToken } = require('../middleware/verifyToken');
const { checkAuth } = require('../controllers/auth-controllers/authControllerCheckAuth');

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", logIn);
router.post("/logout", logOut);

router.get("/check-auth", verifyToken, checkAuth);

module.exports = router;