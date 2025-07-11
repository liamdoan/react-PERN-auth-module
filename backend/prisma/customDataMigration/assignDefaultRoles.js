const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function assignDefaultRole() {
    try {
        // get 'user' role
        const defaultRole = await prisma.role.findUnique({
            where: {
                name: "user"
            }
        });

        if (!defaultRole) {
            throw new Error("Role 'user' not found!. Consider seeding roles first.")
        };

        // find account without 'user' role and assign
        // currently, all existing accounts dont have any roles yet
        const accountWithoutUserRole = await prisma.user.findMany({
            where: {
                roles: {
                    none: {}
                }
            }
        });

        for (const user of accountWithoutUserRole) {
            await prisma.userRole.create({
                data: {
                    userId: user.id,
                    roleId: defaultRole.id
                }
            })
        };

        console.log(`Done assigning default "user" role for ${accountWithoutUserRole.length} accounts"`);
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

assignDefaultRole();