const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.updateUserRole = async (req, res) => {
    const {userId} = req.params;
    const {roles} = req.body;

    try {
        // In database, roles should be an array ["user", "manager, "admin"]
        if (!Array.isArray(roles)) {
            return res.status(400).json({
                message: "Wrong type of role data!"
            })
        };

        const validRoles = ["user", "manager", "admin"];
        if (!roles.every(role => validRoles.includes(role))) {
            return res.status(400).json({
                message: "Invalid roles!"
            })
        };

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(403).json({
                message: "No user found!"
            })
        };

        // get all records from Role table that has names matching roles array from body
        // the purpose is to get the current role ids based on role names
        // so we can assign roles correctly using their real roleId
        const matchedRolesFromDb = await prisma.role.findMany({
            where: {
                name: {
                    in: roles
                }
            }
        });

        // make sure all sent roles from users are valid
        if (matchedRolesFromDb.length !== roles.length) {
            return res.status(400).json({ message: "One or more roles do not exist in the database" });
        }

        // delete all current assigned roles for that user
        // and add new selected ones (transaction ensures atomicity)
        // find all UserRole obj having userId and delete them
        await prisma.$transaction([
            prisma.userRole.deleteMany({
                where: {userId}
            }),
            prisma.userRole.createMany({
                data: matchedRolesFromDb.map(role => ({
                    userId,
                    roleId: role.id
                }))
            })
        ]);

        const updatedUser = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        res.status(200).json({
            message: "User role updated ok!",
            updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        })
    }
}
