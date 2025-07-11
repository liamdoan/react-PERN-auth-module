const bcryptjs = require('bcryptjs');
const { generateTokenAndSetCookies } = require("../../utils/generateTokenAndSetCookies");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.logIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user) {
            return res.status(400).json({
                message: "No email found!"
            })
        };

        // prevent OAuth users from using email/password login
        if (user.authProvider !== 'manual') {
            return res.status(400).json({ message: `Please log in using ${user.authProvider}` });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Password doesn't match!"
            })
        };

        generateTokenAndSetCookies(res, user.id);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                lastLogin: new Date()
            }
        })

        res.status(200).json({
            message: "Login ok!",
            user
        });
    } catch (error) {
        console.log("Login error: ", error);
        res.status(400).json({
            message: error.message
        });
    }
}
