const { generateHashPassword } = require("../../utils/generateHashPassword");
const { generateVerificationToken } = require("../../utils/generateVerificationToken");
const { generateTokenAndSetCookies } = require("../../utils/generateTokenAndSetCookies");
const { sendVerificationEmail } = require("../../mailtrap/emailServices");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.signUp = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password ) {
            throw new Error ("all field required")
        }

        const userExisted = await prisma.user.findUnique({
            where: {email}
        });

        if (userExisted) {
            return res.status(400).json({
                message: "user has existed!"
            })
        };

        const user = await prisma.user.create({
            data: {
                email,
                password: await generateHashPassword(password), //hashPassword
                name,
                authProvider: 'manual',
                verificationToken: generateVerificationToken(), //verification code
                verificationTokenExpiresAt: new Date(Date.now() + 24*60*60*1000)
            }
        });

        //generate jwt
        generateTokenAndSetCookies(res, user.id);

        await sendVerificationEmail(user.email, user.verificationToken)

        res.status(201).json({
            message: "user created!",
            user
        })
    } catch(error) {
        res.status(400).json({
            message: error.message,
        })
    }
};
