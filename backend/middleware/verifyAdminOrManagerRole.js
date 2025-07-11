const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.verifyAdminOrManagerRole = async (req, res, next) => {
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
            });
        }

        if (user.roles.some(userRole => 
            userRole.role.name === 'admin' ||
            userRole.role.name === 'manager'
        )) {
            return next();
        }

        return res.status(403).json({
            message: "Authorization failed! Admin and manager access only!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
}
