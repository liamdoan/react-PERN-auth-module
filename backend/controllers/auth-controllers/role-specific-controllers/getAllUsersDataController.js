const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.getAllUsersData = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            message:  "Admin authorization ok! Welcome Admin!",
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}
