const userModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const { generateVerificationToken } = require("../utils/generateVerificationToken");
const { generateTokenAndSetCookies } = require("../utils/generateTokenAndSetCookies");

module.exports.signUp = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password ) {
            throw new Error ("all field required")
        }

        const userExisted = await userModel.findOne({email});
        if (userExisted) {
            return res.status(400).json({
                message: "user has existed!"
            })
        };

        const hashPassword = await bcryptjs.hash(password, 10);
        const verificationToken = generateVerificationToken();

        const user = new userModel({
            email,
            password: hashPassword,
            name,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000
        });
        
        await user.save();

        generateTokenAndSetCookies(res, user._id);

        res.status(201).json({
            message: "user created!",
            user: {
                ...user._doc
            }
        })
    } catch(error) {
        res.status(400).json({
            message: error.message,
        })
    }
};
