
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.verifyAdminRole = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if(!user || !user.roles.some(userRole => userRole.role.name === 'admin')) {
            return res.status(403).json({
                message: "Admin authorization failed! Admin access only!"
            })
        };

        next();
    } catch (error) {
        console.error("admin verification error: ", error);
        res.status(500).json({
            message: error.message
        });
    }
}
