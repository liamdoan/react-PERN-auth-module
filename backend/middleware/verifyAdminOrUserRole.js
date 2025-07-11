const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.verifyAdminOrUserRole = async (req, res, next) => {
    const { userId } = req.params; // userId of user to be modified
    const loggedInUser = req.userId // from verifyToken middleware
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: loggedInUser
            },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        }); 

        if (!user) {
            return res.status(403).json({
                message: "No user found!"
            })
        };

        if (user.roles.some(userRole => userRole.role.name === 'admin')) {
            return next();
        }

        if (userId !== loggedInUser) {
            return res.status(403).json({
                message: "You aren't either correct user or admin!"
            })
        };

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}
