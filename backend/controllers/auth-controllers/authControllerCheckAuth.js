const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.checkAuth = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found!"
            })
        };

        res.status(200).json({
            message: "User found!",
            user
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        });
    }
}
