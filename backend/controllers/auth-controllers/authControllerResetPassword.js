const { sendPasswordResetEmailSuccess } = require("../../mailtrap/emailServices");
const { generateHashPassword } = require("../../utils/generateHashPassword");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.resetPassword = async (req, res) => {
    const {token} = req.params;
    const {newPassword} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                resetPasswordToken: token
            }           
        });

        if (!user) {
            return res.status(400).json({
                message: "Token invalid or expired!"
            })
        };

        const newHashPassword = await generateHashPassword(newPassword);
        
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: newHashPassword,
                resetPasswordToken: null,
                resetPasswordExpiresAt: null,
            }
        });

        await sendPasswordResetEmailSuccess(user.email);

        res.status(200).json({
            message: "Password reset ok!"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
