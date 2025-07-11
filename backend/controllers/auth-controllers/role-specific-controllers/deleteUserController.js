const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.deleteUser = async (req, res) => {
    const {userId} = req.params;

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

        await prisma.user.delete({
            where: {
                id: userId
            }
        });

        return res.status(200).json({
            message: "User deleted ok!"
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        })
    }
}
