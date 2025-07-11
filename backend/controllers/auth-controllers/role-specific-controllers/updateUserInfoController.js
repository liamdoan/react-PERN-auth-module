const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.updateUserInfo = async (req, res) => {
    const {userId} = req.params
    const {name, email} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(403).json({
                message: "User not found!"
            })
        };

        let updateData = {}; // will contain only values that are updated, simplify validating steps 

        if (name) {
            updateData.name = name;
        };

        // if updated email is the same as current email, skip this block
        if (email && email !== user.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: "Wrong email format!"
                })
            };

            const existedUser = await prisma.user.findUnique({
                where: {email}
            });

            if (existedUser && (existedUser.id.toString() !== user.id.toString())) {
                return res.status(400).json({
                    message: "Email has already existed!"
                })
            };

            updateData.email = email;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: updateData
        })

        res.status(200).json({
            message: "Info updated ok!",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}
