const express = require('express');
const router = express.Router();
const {signUp, logIn, logOut} = require("../controller/authController")

router.get("/signup", signUp);
router.get("/login", logIn);
router.get("/logout", logOut);

module.exports = router;