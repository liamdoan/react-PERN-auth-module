const { sendWelcomeEmail } = require("../../mailtrap/emailServices");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.verifyEmail = async (req, res) => {
    const {verificationCode} = req.body;
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                verificationToken: verificationCode
            }
        })

        if(!user) {
            return res.status(400).json({
                message: "invalid or expired verification code!"
            })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null
            }
        })

        await sendWelcomeEmail(updatedUser.email, updatedUser.name);

        res.status(200).json({
            message: "verification code ok!",
            user: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            message: "Something wrong, cna not verify email with code!"
        })
    }
}
