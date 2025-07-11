const { sendPasswordResetEmail } = require("../../mailtrap/emailServices");
const { generateResetToken } = require("../../utils/generateResetToken");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            return res.status(400).json({
                message: "No user found! Make sure you enter correct email."
            })
        };

        const resetToken = generateResetToken();
        const resetTokenExpiredTime = new Date(Date.now() + 1*60*60*1000); // 1 hour

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpiresAt: resetTokenExpiredTime
            }
        });

        await sendPasswordResetEmail(user.email, `${process.env.DEVELOPMENT_CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            message: "Reset password link has been sent!"
        })
    } catch (error) {
        console.log("Login error: ", error);
        res.status(400).json({
            message: error.message
        });
    }
}
