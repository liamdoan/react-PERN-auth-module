const { sendPasswordResetEmail } = require("../mailtrap/emailServices");
const userModel = require("../models/userModel");
const { generateResetToken } = require("../utils/generateResetToken");

module.exports.resetPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(400).json({
                message: "No user found! Rest password failed!"
            })
        };

        const resetToken = generateResetToken();
        const resetTokenExpiredTime = Date.now() + 1*60*60*1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiredTime;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.DEVELOPMENT_URL}/reset-password/${resetToken})`);

        res.status(200).json({
            message: "Reset password email sent ok!"
        })
    } catch (error) {
        console.log("Login error: ", error);
        res.status(400).json({
            message: error.message
        });
    }
}
